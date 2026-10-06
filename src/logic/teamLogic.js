function prepareTeamPokemon(pokemonData) {
    const types = pokemonData.types
        .map(typeEntry => typeEntry.type.name);

    return {
        name: pokemonData.name,
        sprite: pokemonData.sprites.front_default,
        types: types
    };
}

function getEmptySlotText(slot, teamSlots) {
    const slotIndex = [...teamSlots].indexOf(slot) + 1;

    return `Pokemon ${slotIndex}`;
}

export {
    prepareTeamPokemon,
    getEmptySlotText
};