import React from "react";
import { Box, Typography } from "@mui/material";
import WeatherForecast from "./component/WeatherForecast";
import "./component/WeatherForecast.css"

function App() {
  return (
    <div>
      <Box className="header" mb={2}>
        <Typography variant="h5">Weather App</Typography>
      </Box>
      <WeatherForecast />
    </div>
  );
}

export default App;
