import {
	Avatar,
	Box,
	Card,
	CardContent,
	TextField,
	Typography
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function WeatherForeCast() {
	const API_KEY = "02a6837b4b7244829a4143919231207";
	const [location, setLocation] = useState("");
	const [apiResponse, setApiResponse] = useState("");
	const [debounceTime, setDebounceTime] = useState(0);
	const [respStatus, setRespStatus] = useState("");

	const handleInput = (e) => {
		if (debounceTime !== 0) {
			clearTimeout(debounceTime);
		}
		const newTimer = setTimeout(async () => {
			await axios
				.get(
					`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${e.target.value}`
				)
				.then((res) => {
					setLocation(
						`${res.data.location.name}, ${res.data.location.country}`
					);
					setApiResponse(res.data.current);
					setRespStatus("success");
					// console.log(res.data.current);
				})
				.catch((err) => {
					setRespStatus("danger");
					setApiResponse("");
					if (err.response.status === 400) {
						setLocation("No matching location found.");
					}
				});
		}, 500);
		setDebounceTime(newTimer);
	};

	const AddWeatherInfo = (props) => {
		return (
			<Box className="weather-info">
				<Typography variant="h6" fontSize="lg" fontWeight="lg">
					{props.title}
				</Typography>
				<Typography variant="h6" sx={{ ml: "auto" }}>
					{props.value}
				</Typography>
			</Box>
		);
	};
	return (
		<>
			<Box className="search-field">
				<TextField
					className="searchText"
					id="outlined-search"
					label="Enter location"
					type="search"
					onChange={handleInput}
				/>
			</Box>
			<Box className="search-field" mt={1} mb={2}>
				<Typography variant="h4" color={respStatus}>
					{location}
				</Typography>
			</Box>
			{apiResponse && (
				<Card
					variant="outlined"
					className="searchText"
					sx={{
						display: "flex",
						justifyContent: "space-between",
						mx: "auto"
					}}
				>
					<CardContent sx={{ width: "100%" }}>
						<Avatar
							src={`http:${apiResponse.condition.icon}`}
							alt={apiResponse.condition.text}
						/>
						<AddWeatherInfo
							title="Temperature"
							value={`${apiResponse.temp_c}°C / ${apiResponse.temp_f}°F`}
							key={1}
						/>
						<AddWeatherInfo
							title="Condition"
							value={apiResponse.condition.text}
							key={2}
						/>
						<AddWeatherInfo
							title="Wind Speed"
							value={`${apiResponse.wind_kph} km/h`}
							key={3}
						/>
						<AddWeatherInfo
							title="Humidity"
							value={`${apiResponse.humidity}%`}
							key={4}
						/>
						<AddWeatherInfo
							title="Cloud Coverage"
							value={`${apiResponse.cloud}%`}
							key={5}
						/>
						<AddWeatherInfo
							title="Last Updated"
							value={apiResponse.last_updated}
							key={6}
						/>
					</CardContent>
				</Card>
			)}
		</>
	);
}
  