const params = new URLSearchParams(window.location.search);
const countryName = params.get("name");

fetch(`https://restcountries.com/v3.1/name/${countryName}`)
.then(response => response.json())
.then(data => {
    const country = data[0];

    displayCountries(country);
})

const container = document.getElementById("countryDetails");

function displayCountries(country){
    container.innerHTML = `
        <h1>${country.name.common}</h1>
        <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" width="200">
        <p><strong>Capital:</strong> ${country.capital?.[0] ?? "N/A"}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Size:</strong> ${country.area?.toLocaleString() ?? "N/A"} square kilometers</p>
        <p><strong>Time Zone:</strong> ${country.timezones?.[0] ?? "N/A"}</p>
        <p><strong>Currencies:</strong> ${Object.values(country.currencies || {}).map(c => c.name).join(", ")}</p>
        <p><strong>Start of Week:</strong> ${country.startOfWeek}</p>
        <p><strong>Landlocked:</strong> ${country.landlocked ? "Yes" : "No"}</p>
        <p><strong>Coat Of Arms:</strong> ${country.coatOfArms ? "Yes" : "No"}</p>
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