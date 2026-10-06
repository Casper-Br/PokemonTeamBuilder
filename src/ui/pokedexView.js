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

function renderTypeOptions(types) {
    types.forEach(type => {
        const option = document.createElement("option");

        option.value = type;
        option.textContent = type;

        typeFilter.appendChild(option);
    });
}

export { renderPokemonList, renderTypeOptions };