const pokemon_API = 'https://pokeapi.co/api/v2/pokemon?limit=493&offset=0'
const teamPokemons = document.querySelectorAll(".teamPokemon");
let selectedItem = null;
const pokemonDisplay = document.getElementById("pokemonDisplay");

teamPokemons.forEach(teamPokemon => {
    teamPokemon.addEventListener("click", () => {
        teamPokemons.forEach(i => i.classList.remove("selected"));

        teamPokemon.classList.add("selected");
        selectedItem = teamPokemon;
    });
});

fetch(pokemon_API)
    .then(response => response.json())
    .then(data => {
        data.results.forEach(pokemon => {
            const pokemonListElement = document.createElement('div');
            pokemonListElement.innerText = pokemon.name;
            pokemonListElement.classList.add('pokemonListElement');
            pokemonDisplay.appendChild(pokemonListElement);
        });
    })
    .catch(error => console.error("Error fetching Pokemon", error));

    // Style fix, maybe figure out a way to do this in CSS
    function matchPokedexHeight() {
        const teamView = document.querySelector(".teamView");
        const pokedex = document.querySelector(".pokedex");
        pokedex.style.height = teamView.offsetHeight + "px";
    }

    window.addEventListener("load", matchPokedexHeight);
    window.addEventListener("resize", matchPokedexHeight);