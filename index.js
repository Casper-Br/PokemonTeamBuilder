const typeChart = {
    normal:   { resists: ["ghost"], strongAgainst: [] },
    fire:     { resists: ["fire","grass","ice","bug","steel"], strongAgainst: ["grass","ice","bug","steel"] },
    water:    { resists: ["fire","water","ice","steel"], strongAgainst: ["fire","ground","rock"] },
    electric: { resists: ["electric","flying","steel"], strongAgainst: ["water","flying"] },
    grass:    { resists: ["water","electric","grass","ground"], strongAgainst: ["water","ground","rock"] },
    ice:      { resists: ["ice"], strongAgainst: ["grass","ground","flying","dragon"] },
    fighting: { resists: ["bug","rock","dark"], strongAgainst: ["normal","ice","rock","dark","steel"] },
    poison:   { resists: ["grass","fighting","poison","bug"], strongAgainst: ["grass"] },
    ground:   { resists: ["poison","rock","electric"], strongAgainst: ["fire","electric","poison","rock","steel"] },
    flying:   { resists: ["grass","fighting","bug","ground"], strongAgainst: ["grass","fighting","bug"] },
    psychic:  { resists: ["fighting","psychic"], strongAgainst: ["fighting","poison"] },
    bug:      { resists: ["grass","fighting","ground"], strongAgainst: ["grass","psychic","dark"] },
    rock:     { resists: ["normal","fire","poison","flying"], strongAgainst: ["fire","ice","flying","bug"] },
    ghost:    { resists: ["normal","fighting","poison","bug"], strongAgainst: ["psychic","ghost"] },
    dragon:   { resists: ["fire","water","electric","grass"], strongAgainst: ["dragon"] },
    dark:     { resists: ["ghost","dark","psychic"], strongAgainst: ["psychic","ghost"] },
    steel:    { resists: ["normal","grass","ice","flying","psychic","bug","rock","dragon","steel"], strongAgainst: ["ice","rock"] } // Steel exists in Gen IV
  };

const typeColors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE"
};

const pokemon_API = "https://pokeapi.co/api/v2/pokemon?limit=493&offset=0";
const pokeName_API = "https://pokeapi.co/api/v2/pokemon/";
const type_API = "https://pokeapi.co/api/v2/type";

const teamPokemons = document.querySelectorAll(".teamPokemon");
const pokemonDisplay = document.getElementById("pokemonDisplay");
const typeFilter = document.getElementById("typeFilter");

const addBtn = document.getElementById("addPokemon");
const removeBtn = document.getElementById("removePokemon");

let allPokemon = [];
let selectedTeamSlot = null;
let selectedPokemon = null;

async function loadAllPokemon() {
    try {
        const response = await fetch(pokemon_API);
        const data = await response.json();
        allPokemon = data.results.map(p => p.name);
        displayPokemonByType();
    } catch (error) {
        console.error("Error loading Pokémon", error);
    }
}

teamPokemons.forEach(teamPokemon => {
    teamPokemon.addEventListener("click", () => {
        teamPokemons.forEach(p => p.classList.remove("selected"));
        teamPokemon.classList.add("selected");
        selectedTeamSlot = teamPokemon;
    });
});



function initPokemonListElement() {
    const pokemonListElements = document.querySelectorAll(".pokemonListElement");
    pokemonListElements.forEach(pokemonListElement => {
        pokemonListElement.addEventListener("click", () => {
            pokemonListElements.forEach(i => i.classList.remove("selected"));
            pokemonListElement.classList.add("selected");
            selectedPokemon = pokemonListElement;
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
            const pokemonListElement = document.createElement("div");
            pokemonListElement.innerText = name;
            pokemonListElement.classList.add("pokemonListElement");
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
                const pokemonListElement = document.createElement("div");
                pokemonListElement.innerText = name;
                pokemonListElement.classList.add("pokemonListElement");
                pokemonDisplay.appendChild(pokemonListElement);
            }
        });
        initPokemonListElement();
    } catch (error) {
        console.error("Error fetching Pokémon by type", error);
    }
}

addBtn.addEventListener("click", async () => {
    if (!selectedTeamSlot || !selectedPokemon) return;
    const pokeName = selectedPokemon.innerText.toLowerCase();

    try {
        const response = await fetch(`${pokeName_API}${pokeName}`);
        const data = await response.json();
        selectedTeamSlot.innerHTML = "";

        const img = document.createElement("img");
        img.src = data.sprites.front_default;
        img.alt = pokeName;
        img.style.width = "80px";
        img.style.height = "80px";

        const nameEl = document.createElement("div");
        nameEl.innerText = pokeName;
        nameEl.style.fontWeight = "bold";

        const typesEl = document.createElement("div");

        const gen4Types = data.types
            .map(t => t.type.name)
            .filter(t => t in typeChart);

        selectedTeamSlot.dataset.types = gen4Types.join(",");

        gen4Types.forEach(tName => {
            const typeBox = document.createElement("span");
            typeBox.classList.add("typeBox");
            typeBox.innerText = tName;
            typeBox.style.backgroundColor = typeColors[tName] || "gray";
            typesEl.appendChild(typeBox);
        });

        selectedTeamSlot.appendChild(img);
        selectedTeamSlot.appendChild(nameEl);
        selectedTeamSlot.appendChild(typesEl);

        updateTypeAdvice();
    } catch (error) {
        console.error("Error fetching Pokémon details", error);
    }
});

removeBtn.addEventListener("click", () => {
    if (!selectedTeamSlot) return;
    const slotIndex = [...teamPokemons].indexOf(selectedTeamSlot) + 1;
    selectedTeamSlot.innerHTML = `Pokemon ${slotIndex}`;
    selectedTeamSlot.dataset.types = "";
    updateTypeAdvice();
    });

function updateTypeAdvice() {
    const typeAdvice = document.getElementById("typeAdvice");
    let teamTypes = [];
    teamPokemons.forEach(slot => {
        const types = slot.dataset.types;
        if (types) {
            teamTypes.push(...types.split(","));
        }
    });

    if (teamTypes.length === 0) {
        typeAdvice.innerText = "Your team is weak against everything.";
        return;
    } 
    
    const allTypes = Object.keys(typeChart);
    const offensiveCoverage = new Set();
    const defensiveCoverage = new Set();
    teamTypes.forEach(type => {
        const chart = typeChart[type];
        chart.strongAgainst.forEach(t => offensiveCoverage.add(t));
        chart.resists.forEach(t => defensiveCoverage.add(t));
    });
    const offensiveWeak = allTypes.filter(t => !offensiveCoverage.has(t));
    const defensiveWeak = allTypes.filter(t => !defensiveCoverage.has(t)); 
    if (offensiveWeak.length === 0 && defensiveWeak.length === 0) {
        typeAdvice.innerText = "Your team is strong against everything.";
        return;
    }
    typeAdvice.innerText = 
    `Your team is offensively weak against: ${offensiveWeak.join(", ")}
    Your team is defensively weak against: ${defensiveWeak.join(", ")}`;
}

window.onload = loadAllPokemon;
updateTypeAdvice();