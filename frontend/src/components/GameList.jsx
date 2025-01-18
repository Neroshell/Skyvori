import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Card, CardMedia, CardContent, Typography, Box, TextField, Button } from "@mui/material";
import { useDebounce } from "use-debounce";
import { Link } from 'react-router-dom';


const GameList = () => {
    const [games, setGames] = useState([]);
    const [allGames, setAllGames] = useState([]); // To store all the games
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery] = useDebounce(searchQuery, 500); // This prevents an API request on every keystroke

    // 
    // Fetch all games initially
    useEffect(() => {
        axios
            .get('/api/games')
            .then((response) => {
                setAllGames(response.data);
                setGames(response.data); // Set games to all games initially
            })
            .catch((error) => console.error("Error fetching games:", error));
    }, []);

    // Fetch filtered games when the debouncedSearchQuery changes
     /**
     * // Debounce the search query for 500ms delay the search query change.
     *  This prevents an API request on every keystroke, instead waiting for
     *  the user to stop typing for 500ms. This answers question 5  
     */
    useEffect(() => {
        if (debouncedSearchQuery) {
            // Filter games based on the debouncedSearchQuery
            const filteredGames = allGames.filter((game) =>
                game.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
                game.providerName.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
            );
            setGames(filteredGames);
        } else {
            // If the search query is empty, display all games
            setGames(allGames);
        }
    }, [debouncedSearchQuery, allGames]);

    return (
        <>
        <Container sx={{textAlign: 'center'}}>
            <Typography sx={{
                    mt: 5,
                    fontSize: {
                    xs: "2.5rem", // Small screens
                    sm: "3rem",   // Medium screens
                    md: "3.5rem", // Large screens
                    lg: "4rem",   // Extra large screens
                    },
  }} variant="h4" gutterBottom>
                Explore Our Games Collections
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px',
                    mb: 5,
                }}
                >
                <TextField
                    label="Search Games"
                    variant="outlined"
                    onChange={(e) => setSearchQuery(e.target.value)} // Update search query as user types
                    value={searchQuery}
                   // Optional: makes the TextField grow to take more space if needed
                />
                <Button component={Link} to="/slot-machine" size="small" variant="contained" >
                    Try slot machine
                </Button>
        </Box>
            <Grid container spacing={2}>
                {games.map((game) => (
                    <Grid item xs={12} sm={6} md={4} key={game.id}>
                        <Card
                            sx={{
                                cursor: "pointer",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Box
                                sx={{
                                    position: "relative",
                                    paddingTop: "56.25%", // 16:9 aspect ratio
                                    width: "100%",
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={
                                        game.thumb?.url.startsWith("//")
                                            ? `https:${game.thumb.url}`
                                            : game.thumb?.url
                                    }
                                    alt={game.title}
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </Box>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" noWrap>
                                    {game.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {game.providerName}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    </>
        
    );
};

export default GameList;
