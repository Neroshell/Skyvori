const gameData = require("../game-data.json");

const fetchGames = (req, res) => {
    const searchQuery = req.query.search?.toLowerCase(); // Get the search query from the request

    if (searchQuery) {
        const filteredGames = gameData.filter((game) =>
            game.title.toLowerCase().includes(searchQuery) ||
            game.providerName.toLowerCase().includes(searchQuery)
        );
        return res.json(filteredGames); // Return filtered games
    }

    res.json(gameData); // Return all games if no search query
};

module.exports = {
    fetchGames,
};
