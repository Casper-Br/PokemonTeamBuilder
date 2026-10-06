let selectedTeamSlot = null;

function getSelectedTeamSlot() {
    return selectedTeamSlot;
}

function setSelectedTeamSlot(slot) {
    selectedTeamSlot = slot;
}

let selectedPokemon = null;

function getSelectedPokemon() {
    return selectedPokemon;
}

function setSelectedPokemon(pokemon) {
    selectedPokemon = pokemon;
}

export {
    getSelectedTeamSlot,
    setSelectedTeamSlot,
    getSelectedPokemon,
    setSelectedPokemon
};