const POKEMON_LIST_URL = "https://pokeapi.co/api/v2/pokemon?limit=493&offset=0";
const POKEMON_URL = "https://pokeapi.co/api/v2/pokemon/";
const TYPE_URL = "https://pokeapi.co/api/v2/type";

async function getAllPokemon() {
    const response = await fetch(POKEMON_LIST_URL);
    const data = await response.json();

    return data.results.map(pokemon => pokemon.name);
}

async function getPokemonByName(name) {
    const response = await fetch(`${POKEMON_URL}${name}`);
    const data = await response.json();

    return data;
}

async function getPokemonByType(type) {
    const response = await fetch(`${TYPE_URL}/${type}`);
    const data = await response.json();

    return data;
}

async function getPokemonTypes() {
    const response = await fetch(TYPE_URL);
    const data = await response.json();

    return data.results.map(type => type.name);
}

export {
    getAllPokemon,
    getPokemonByName,
    getPokemonByType,
    getPokemonTypes
};