import { pokemonDisplay, typeFilter } from "./dom.js";

function renderPokemonList(pokemonNames) {
    pokemonDisplay.replaceChildren();

    pokemonNames.forEach(name => {
        const pokemonListElement = document.createElement("div");

        pokemonListElement.classList.add("pokemonListElement");
        pokemonListElement.innerText = name;

        pokemonDisplay.appendChild(pokemonListElement);
    });
}

function selectPokemon(pokemonElement) {
    const pokemonListElements = document.querySelectorAll(".pokemonListElement");

    pokemonListElements.forEach(element => {
        element.classList.remove("selected");
    });

    pokemonElement.classList.add("selected");
}

function renderTypeOptions(types) {
    types.forEach(type => {
        const option = document.createElement("option");

        option.value = type;
        option.textContent = type;

        typeFilter.appendChild(option);
    });
}

export {
    renderPokemonList,
    renderTypeOptions,
    selectPokemon
};