import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Card, CardMedia, CardContent, Typography, Box, TextField, Button } from "@mui/material";
import { useDebounce } from "use-debounce";
import { Link } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const GameList = () => {
    const [games, setGames] = useState([]);
    const [allGames, setAllGames] = useState([]); // To store all the games
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery] = useDebounce(searchQuery, 500); // This prevents an API request on every keystroke

    // Initialize AOS on component mount
    useEffect(() => {
        AOS.init({
            duration: 1500, // Animation duration in milliseconds
            offset: 50,     // Offset (in px) from the original trigger point
            easing: "ease-in-out", // Easing function for the animation
        });
    }, []);

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
        <Container sx={{ textAlign: 'center' }}>
            <Typography
                sx={{
                    mt: 5,
                    fontSize: {
                        xs: "2rem", // Small screens
                        sm: "2.3rem", // Medium screens
                        md: "2.5rem", // Large screens
                        lg: "3rem",  // Extra large screens
                    },
                    color: "#140518"
                }}
                variant="h3"
                gutterBottom
            >
                Explore Our Gaming Collection
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
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                    sx={{
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#140518", // Changes the border color when focused
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: "#E30AE3", // Label color when focused
                        },
                    }}
                />

                <Button 
                    sx={{ backgroundColor: '#E30AE3' }} 
                    component={Link} to="/slot-machine" size="small" variant="contained"
                >
                    Try slot machine
                </Button>
            </Box>

            <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {games.map((game) => (
                    <Grid item xs={10} sm={6} md={4} key={game.id}>
                        <Card
                            data-aos="slide-up" // AOS animation
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
