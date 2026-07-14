const container = document.getElementById("container");
let countriesData =[] //empty array

// fetching API
fetch("./data/countries.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log(data[0]); // Show the first country

        data.sort((a, b) => a.name.localeCompare(b.name));
        
        countriesData = data;
        displayCountries(data);
    });

const savedPosition = sessionStorage.getItem("scrollPosition");

if (savedPosition !== null) {
    setTimeout(() => {
        window.scrollTo(0, Number(savedPosition));
    }, 100);
}
// .catch(err => console.log(err));

// fetch("./data/countries.json")
//     .then(response => response.json())
//     .then(data => {
//         countriesData = data;
//         displayCountries(data);
//     });
// // .then(response => response.json()) //converting response to js file
// // .then(data => {

// //     countriesData = data.data.objects;
// //     displayCountries(countriesData);})

    function displayCountries(data){
        container.innerHTML = "";
    
    data.forEach(country => {
    const card = document.createElement("a");
    // document.classList.add("link")
    // adding css 
    card.classList.add("countryCard");

  // add href
    card.href = `country.html?name=${encodeURIComponent(country.name)}`;
    card.addEventListener("click", () => {
    sessionStorage.setItem("scrollPosition", window.scrollY);
});
    // const currency = Object.values(country.currencies || {})[0];

    const capital = country.capital || "N/A";
    const flagUrl = `https://flagcdn.com/w320/${country.iso2.toLowerCase()}.png`;

    card.innerHTML = `
        <img src="${flagUrl}" alt="Flag of ${country.name}">
        <p><strong>${country.name}</strong></p>
        <p><strong>Capital:</strong> ${capital}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Currency:</strong> ${country.currency_name} (${country.currency_symbol})</p>
        <p><strong>Population:</strong> ${country.population? country.population.toLocaleString(): "Unknown"}</p>

    `;
    container.appendChild(card);
    });}

// .catch(err => console.error("Error:", err));

// fetch("https://restcountries.com/v3.1/name/germany")
// .then(Response => console.log(Response.json()))

document.getElementById("search").addEventListener("input", function (){

    const searchValue = this.value.toLowerCase()

    const filtered = countriesData.filter(country => {

        const name = country.name.toLowerCase();
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
