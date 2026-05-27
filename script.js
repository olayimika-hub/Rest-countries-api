const container = document.getElementById("container");
let countriesData =[] //empty array

// fetching API
fetch("https://restcountries.com/v3.1/all?fields=name,capital,flags,region,population,currencies")
.then(response => response.json()) //converting response to js file
.then(data => {

    countriesData = data;
    displayCountries(data);})

    function displayCountries(data){
        container.innerHTML = "";
    
    data.forEach(country => {
    const card = document.createElement("a");
    // document.classList.add("link")
    // adding css 
    card.classList.add("countryCard");

  // add href
    card.href = `country.html?name=${encodeURIComponent(country.name.common)}`;
    const currency = Object.values(country.currencies || {})[0];

    const capital = country.capital?.[0] ?? "N/A";

    card.innerHTML = `
        <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
        <p><strong>${country.name.common}</strong></p>
        <p><strong>Capital:</strong> ${capital}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Currency:</strong> ${currency?.name ?? ""} (${currency?.symbol ?? ""}) </p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>

    `;
    container.appendChild(card);
    });}

// .catch(err => console.error("Error:", err));

// fetch("https://restcountries.com/v3.1/name/germany")
// .then(Response => console.log(Response.json()))

document.getElementById("search").addEventListener("input", function (){

    const searchValue = this.value.toLowerCase()

    const filtered = countriesData.filter(country => {

        const name = country.name.common.toLowerCase();
        // const capital = country.capital?.[0]?.toLowerCase() || "";
        const region = country.region.toLowerCase();

        return name.includes(searchValue) ||
        // capital.includes(searchValue) ||
        region.includes(searchValue);
    });

    displayCountries(filtered);
})

// document.addEventListener("DOMContentLoaded", () => {

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
// });
