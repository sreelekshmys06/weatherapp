async function getWeather() {
    const city = document.getElementById("city").value;

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    try {
        // Step 1: Get latitude & longitude of city
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
        );
        const geoData = await geoResponse.json();

        if (!geoData.results) {
            document.getElementById("result").innerHTML = "City not found!";
            return;
        }

        const latitude = geoData.results[0].latitude;
        const longitude = geoData.results[0].longitude;

        // Step 2: Get weather data
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
        const weatherData = await weatherResponse.json();

        document.getElementById("result").innerHTML = `
            <p><strong>City:</strong> ${city}</p>
            <p><strong>Temperature:</strong> ${weatherData.current_weather.temperature} °C</p>
            <p><strong>Weather Code:</strong> ${weatherData.current_weather.weathercode}</p>
        `;
    } catch (error) {
        document.getElementById("result").innerHTML = "Error fetching weather data.";
    }
}
