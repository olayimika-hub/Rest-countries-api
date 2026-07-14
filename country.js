document.getElementById("backBtn").addEventListener("click", () => {
    window.location.href = "index.html";
});

const params = new URLSearchParams(window.location.search);
const countryName = params.get("name");

const container = document.getElementById("countryDetails");

fetch("./data/countries.json")
    .then(response => response.json())
    .then(data => {

        // Find the country that matches the name from the URL
        const country = data.find(c => c.name === countryName);

        // If no country is found
        if (!country) {
            container.innerHTML = "<h2>Country not found.</h2>";
            return;
        }

        displayCountry(country);
    });

function displayCountry(country) {

    // Generate flag image
    const flagUrl = `https://flagcdn.com/w320/${country.iso2.toLowerCase()}.png`;

    const capital = country.capital || "N/A";

    const population = country.population
        ? country.population.toLocaleString()
        : "Unknown";

    const area = country.area_sq_km ? country.area_sq_km.toLocaleString() : "N/A";

    container.innerHTML = `
        <h1>${country.name}</h1>
        <img src="${flagUrl}" alt="Flag of ${country.name}" width="200">
        <p><strong>Capital:</strong> ${capital}</p>
        <p><strong>Population:</strong> ${population}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Area:</strong> ${area} km²</p>
        <p><strong>Currency:</strong> ${country.currency_name} (${country.currency_symbol})</p>
        <p><strong>Phone Code:</strong> +${country.phonecode}</p>
        <p><strong>Native Name:</strong> ${country.native}</p>
        <p><strong>Latitude:</strong> ${country.latitude}</p>
        <p><strong>Longitude:</strong> ${country.longitude}</p>
        <p><strong>Time Zone:</strong> (${country.timezones?.[0]?.gmtOffsetName ?? ""})</p>        
        <p><strong>Nationality:</strong> ${country.nationality ?? "N/A"}</p>
        <p><strong>Landlocked:</strong> ${country.landlocked ? "Yes" : "No"}</p>
    `;
}


const toggleBtn = document.getElementById("themeToggle");

// load saved theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    toggleBtn.textContent = "☀️";}

    toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        toggleBtn.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        toggleBtn.textContent = "🌙";
    }
});