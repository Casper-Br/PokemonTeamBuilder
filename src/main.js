import {
    getAllPokemon,
    getPokemonByType,
    getPokemonTypes
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

const allPokemon = await getAllPokemon();
const pokemonTypes = await getPokemonTypes();

renderPokemonList(allPokemon);
renderTypeOptions(pokemonTypes);

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