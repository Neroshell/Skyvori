import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Button,
  Typography,
  Box,
  Paper,
  Grid,
  CircularProgress,
  Snackbar,
  MenuItem,
  Select,
} from "@mui/material";
import { styled } from "@mui/system";
import CasinoIcon from "@mui/icons-material/Casino";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

// Styled component for SlotSymbol
const SlotSymbol = styled(Box)(({ theme }) => ({
  width: "100px",
  height: "100px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "2rem",
  fontWeight: "bold",
  border: "2px solid #1976d2", // Use primary.main color
  borderRadius: "8px",
  backgroundColor: "#fff", // Use paper background
  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  transition: "all 0.3s ease-in-out",
}));

const SlotMachine = () => {
  const [balance, setBalance] = useState(20);
  const [convertedBalance, setConvertedBalance] = useState(null);
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [spinResult, setSpinResult] = useState([
    { symbol: "?", image: "" },
    { symbol: "?", image: "" },
    { symbol: "?", image: "" },
  ]);
  const [reward, setReward] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isConverting, setIsConverting] = useState(false);

  useEffect(() => {
    if (reward > 0) {
      setShowNotification(true);
    }
  }, [reward]);

  const handleSpin = async () => {
    setIsSpinning(true);
    setSpinResult([
      { symbol: "?", image: "" },
      { symbol: "?", image: "" },
      { symbol: "?", image: "" },
    ]);
    setReward(0);

    try {
      const response = await axios.post("/api/spin");
      const { resultWithImages, reward, balance } = response.data;

      setTimeout(() => {
        setSpinResult(resultWithImages || [
          { symbol: "?", image: "" },
          { symbol: "?", image: "" },
          { symbol: "?", image: "" },
        ]);
        setReward(reward || 0);
        setBalance(balance || 0);
        setConvertedBalance(null); // Reset converted balance
        setIsSpinning(false);
      }, 1500);
    } catch (error) {
      console.error("Error during spin:", error);
      setSpinResult([
        { symbol: "X", image: "" },
        { symbol: "X", image: "" },
        { symbol: "X", image: "" },
      ]);
      setIsSpinning(false);
    }
  };

  const convertBalance = async () => {
    if (isConverting || !balance) return;

    setIsConverting(true);
    try {
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/132754e3b4c10b6f37e86196/latest/USD`
      );
      const rate = response.data.conversion_rates[targetCurrency];
      setConvertedBalance((balance * rate).toFixed(2));
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    } finally {
      setIsConverting(false);
    }
  };

  return (
   
    <Box sx={{ width: '100%', margin: "0 auto"}}>
      <Paper  elevation={3} sx={{ p: 4, mt: 0, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom align="center">
          <CasinoIcon fontSize="large" color="primary" sx={{ mr: 1 }} />
          Slot Machine
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
            <MonetizationOnIcon color="primary" sx={{ mr: 1 }} />
            Balance:{" "}
            {convertedBalance !== null
              ? `${convertedBalance} ${targetCurrency}`
              : `${balance} coins`}
          </Typography>
        </Box>
        {reward > 0 && (
          <Typography variant="h6" align="center" sx={{ mt: 2, color: "success.main" }}>
            You won: {reward} coins!
          </Typography>
        )}
        {balance <= 0 && (
          <Typography variant="h6" align="center" sx={{ mt: 2, color: "error.main" }}>
            Out of balance! Please reload to continue playing.
          </Typography>
        )}
        <Grid container spacing={2} justifyContent="center" sx={{ mb: 3 }}>
          {spinResult.map((result, index) => (
            <Grid item key={index}>
              <SlotSymbol>
                {isSpinning ? (
                  <CircularProgress size={40} />
                ) : result.image ? (
                  <img
                    src={result.image}
                    alt={result.symbol}
                    style={{
                      width: "80%",
                      height: "80%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  result.symbol
                )}
              </SlotSymbol>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Button
            variant="outlined"
            onClick={convertBalance}
            disabled={isConverting}
          >
            {isConverting ? <CircularProgress size={24} color="inherit" /> : "Convert Balance"}
          </Button>
          <Select
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value)}
            disabled={isConverting}
          >
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="GBP">GBP</MenuItem>
            <MenuItem value="JPY">JPY</MenuItem>
            <MenuItem value="AUD">AUD</MenuItem>
          </Select>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSpin}
            disabled={balance <= 0 || isSpinning}
            sx={{ minWidth: 120 }}
          >
            {isSpinning ? <CircularProgress size={24} color="inherit" /> : "Spin"}
          </Button>
        </Box>
      </Paper>
      <Snackbar
  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
  open={showNotification}
  autoHideDuration={3000}
  onClose={() => setShowNotification(false)}
  message={
    <span style={{ color: "white" }}>
      Congratulations! You won {reward} coins!
    </span>
  }
  ContentProps={{
    sx: { backgroundColor: "green" }, // Ensures the Snackbar has a green background
  }}
/>

    </Box>
 

  );
};

export default SlotMachine;
