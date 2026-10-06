function searchPokemon(pokemonList, query) {
    query = query.toLowerCase();

    const results = pokemonList.filter(name =>
        name.toLowerCase().startsWith(query)
    );

    return results;
}

function filterPokemonByType(allPokemon, typeData) {
    const typePokemon = typeData.pokemon;

    const filteredPokemon = typePokemon.filter(entry =>
        allPokemon.includes(entry.pokemon.name)
    );

    const pokemonNames = filteredPokemon.map(
        entry => entry.pokemon.name
    );

    return pokemonNames;
}

export { searchPokemon, filterPokemonByType };

