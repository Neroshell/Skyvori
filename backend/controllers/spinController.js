let userBalance = 20;
let spins = 0;

// Reels and symbols
const reel1 = ["cherry", "lemon", "apple", "banana"];
const reel2 = ["apple", "banana", "lemon", "cherry"];
const reel3 = ["banana", "lemon", "apple", "cherry"];

// Image paths for the symbols
const symbolImages = {
    cherry: 'https://img.freepik.com/free-photo/delicious-berry-table_144627-7030.jpg?t=st=1737139640~exp=1737143240~hmac=521d5aaab1ee48b3d3c8f88a2b7d9301e7d5ca12cd43a9da7be0162a5da19cae&w=740',
    apple: "https://img.freepik.com/free-psd/close-up-delicious-apple_23-2151868344.jpg?t=st=1737139740~exp=1737143340~hmac=8016ca93161c922ed85cca58efac2c4d2d239932db757f8f54f67949ab82461e&w=740",
    banana: "https://img.freepik.com/free-photo/delicious-banana_144627-5374.jpg?t=st=1737139795~exp=1737143395~hmac=fd24a5b73a9bfbe824d7fc6b16d9cc1ca0630a8689b086b302e041c15a6560d7&w=740",
    lemon:  "https://img.freepik.com/premium-photo/top-view-single-fresh-ripe-yellow-lemon-fruit-isolated-white-background-with-clipping-path_839834-3736.jpg?w=360",
};

// Rewards mapping
const rewards = {
    "3cherries": 50,
    "3apples": 20,
    "3bananas": 15,
    "3lemons": 3,
};

// Spin function
const spinReels = () => {
    const reel1Result = reel1[Math.floor(Math.random() * reel1.length)];
    const reel2Result = reel2[Math.floor(Math.random() * reel2.length)];
    const reel3Result = reel3[Math.floor(Math.random() * reel3.length)];

    return [reel1Result, reel2Result, reel3Result];
};


// Reward calculation based on spin result
const calculateReward = (spinResult) => {
    const [first, second, third] = spinResult;
    let reward = 0;
  
    // Check for rewards based on the spin result
    if (first === "cherry" && second === "cherry" && third === "cherry") {
      reward = 50; // 3 cherries
    } else if (first === "cherry" && second === "cherry") {
      reward = 40; // 2 cherries
    } else if (first === "apple" && second === "apple" && third === "apple") {
      reward = 20; // 3 apples
    } else if (first === "apple" && second === "apple") {
      reward = 10; // 2 apples
    } else if (first === "banana" && second === "banana" && third === "banana") {
      reward = 15; // 3 bananas
    } else if (first === "banana" && second === "banana") {
      reward = 5; // 2 bananas
    } else if (first === "lemon" && second === "lemon" && third === "lemon") {
      reward = 3; // 3 lemons
    }
  
    return reward;
  };
  

// Spin handler
const spin = (req, res) => {
    if (userBalance <= 0) {
        return res.status(400).json({
            message: "Insufficient balance!",
            balance: userBalance,
        });
    }

    userBalance -= 1; // Deduct 1 from balance for the spin
    spins += 1; // Increment spin count

    const spinResult = spinReels(); // Perform spin
    const reward = calculateReward(spinResult); // Calculate reward based on spin result

    userBalance += reward; // Add reward to user's balance

    // Map spin result to images
    const resultWithImages = spinResult.map(symbol => ({
        symbol,
        image: symbolImages[symbol], // Get the image for the symbol from symbolImages
    }));

    res.json({
        message: `Spin ${spins}: ${spinResult.join(", ")}`,
        reward,
        balance: userBalance,
        resultWithImages, // Send symbols and their corresponding images
    });
};

module.exports = {
    spin,
};
