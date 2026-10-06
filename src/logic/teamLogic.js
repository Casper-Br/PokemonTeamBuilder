function prepareTeamPokemon(pokemonData) {
    const types = pokemonData.types
        .map(typeEntry => typeEntry.type.name);

    return {
        name: pokemonData.name,
        sprite: pokemonData.sprites.front_default,
        types: types
    };
}

export { prepareTeamPokemon };