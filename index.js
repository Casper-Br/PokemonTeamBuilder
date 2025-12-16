const pokemon_API = "https://pokeapi.co/api/v2/pokemon?limit=493&offset=0"
const teamPokemons = document.querySelectorAll(".teamPokemon");
let selectedItem = null;
const pokemonDisplay = document.getElementById("pokemonDisplay");
const typeFilter = document.getElementById("typeFilter");
const type_API = "https://pokeapi.co/api/v2/type";
let allPokemon = [];

async function loadAllPokemon() {
    try {
        const response = await fetch(pokemon_API);
        const data = await response.json();
        allPokemon = data.results.map(p => p.name);

        displayPokemonByType();
    } catch (error) {
        console.error("Error loading all Pokemon", error);
    }
}

teamPokemons.forEach(teamPokemon => {
    teamPokemon.addEventListener("click", () => {
        teamPokemons.forEach(i => i.classList.remove("selected"));
        
        teamPokemon.classList.add("selected");
        selectedItem = teamPokemon;
    });
});

function initPokemonListElement() {
    const pokemonListElements = document.querySelectorAll(".pokemonListElement");

    pokemonListElements.forEach(pokemonListElement => {
        pokemonListElement.addEventListener("click", () => {
            pokemonListElements.forEach(i => i.classList.remove("selected"));
            pokemonListElement.classList.add("selected");
            selectedItem = pokemonListElement;
        });
    });
}

async function loadPokemonTypes() {
    try {
        const response = await fetch(type_API);
        const data = await response.json();
        for (const type of data.results) {
            const option = document.createElement("option");
            option.value = type.name;
            option.textContent = type.name;
            typeFilter.appendChild(option);
            if (type.name === "dark") break;
        }
    } catch (error) {
        console.error("Error fetching types", error);
    }
}
loadPokemonTypes();

typeFilter.addEventListener("change", displayPokemonByType);

async function displayPokemonByType() {
    const selectedType = typeFilter.value;
    pokemonDisplay.replaceChildren();

    if (selectedType === "anyType") {
        allPokemon.forEach(name => {
            const pokemonListElement = document.createElement('div');
            pokemonListElement.innerText = name;
            pokemonListElement.classList.add('pokemonListElement');
            pokemonDisplay.appendChild(pokemonListElement);
        });
        initPokemonListElement();
        return;
    }

    try {
        const typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${selectedType}`);
        const typeData = await typeResponse.json();

        typeData.pokemon.forEach(pokeEntry => {
            const name = pokeEntry.pokemon.name;
            if (allPokemon.includes(name)) {
                const pokemonListElement = document.createElement('div');
                    pokemonListElement.innerText = name;
                    pokemonListElement.classList.add('pokemonListElement');
                    pokemonDisplay.appendChild(pokemonListElement);
            }
        });

        initPokemonListElement();
    } catch (error) {
        console.error("Error fetching Pokemon by type", error);
    }
}

window.onload = loadAllPokemon;