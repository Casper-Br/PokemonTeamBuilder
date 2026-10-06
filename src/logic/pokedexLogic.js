function searchPokemon(pokemonList, query) {
    query = query.toLowerCase();

    return pokemonList.filter(name =>
        name.toLowerCase().startsWith(query)
    );
}

function filterPokemonByType(allPokemon, typeData) {
    return typeData.pokemon
        .filter(entry => allPokemon.includes(entry.pokemon.name))
        .map(entry => entry.pokemon.name);
}

export { searchPokemon, filterPokemonByType };