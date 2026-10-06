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

let team = [null, null, null, null, null, null];

function getTeam() {
    return team;
}

function setTeamPokemon(index, pokemon) {
    team[index] = pokemon;
}

function removeTeamPokemon(index) {
    team[index] = null;
}

export {
    getSelectedTeamSlot,
    setSelectedTeamSlot,
    getSelectedPokemon,
    setSelectedPokemon,
    getTeam,
    setTeamPokemon,
    removeTeamPokemon
};