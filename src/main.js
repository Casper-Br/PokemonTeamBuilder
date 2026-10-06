import {
    getAllPokemon,
    getPokemonByType,
} from "./api/pokemonApi.js";
import {
    searchPokemon,
    filterPokemonByType
} from "./logic/pokedexLogic.js";
import {
    searchInput,
    typeFilter
} from "./ui/dom.js";
import {
    renderPokemonList,
    renderTypeOptions
} from "./ui/pokedexView.js";
import { typeChart } from "./data/typeChart.js";

const allPokemon = await getAllPokemon();
const supportedTypes = Object.keys(typeChart);

renderPokemonList(allPokemon);
renderTypeOptions(supportedTypes);

searchInput.addEventListener("input", () => {
    const query = searchInput.value;
    const results = searchPokemon(allPokemon, query);

    renderPokemonList(results);
});

typeFilter.addEventListener("change", async () => {
    const selectedType = typeFilter.value;

    if (selectedType === "anyType") {
        renderPokemonList(allPokemon);
        return;
    }

    const typeData = await getPokemonByType(selectedType);
    const results = filterPokemonByType(allPokemon, typeData);

    renderPokemonList(results);
});