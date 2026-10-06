import {
    getAllPokemon,
    getPokemonByType,
    getPokemonByName
} from "./api/pokemonApi.js";
import {
    searchPokemon,
    filterPokemonByType
} from "./logic/pokedexLogic.js";
import {
    prepareTeamPokemon,
    getEmptySlotText,
    calculateTypeAdvice
} from "./logic/teamLogic.js";
import {
    searchInput,
    typeFilter,
    teamSlots,
    addButton,
    removeButton
} from "./ui/dom.js";
import {
    renderPokemonList,
    renderTypeOptions,
    selectPokemon
} from "./ui/pokedexView.js";
import {
    selectTeamSlot,
    renderPokemonInSlot,
    removePokemonFromSlot,
    renderTypeAdvice
} from "./ui/teamView.js";
import { typeChart } from "./data/typeChart.js";
import {
    getSelectedTeamSlot,
    getSelectedPokemon,
    setSelectedTeamSlot,
    setSelectedPokemon,
    getTeam,
    setTeamPokemon,
    removeTeamPokemon
} from "./state/appState.js";

const allPokemon = await getAllPokemon();
const supportedTypes = Object.keys(typeChart);

renderPokemonList(allPokemon);
initializePokemonSelection();
renderTypeOptions(supportedTypes);
renderTypeAdvice(calculateTypeAdvice(getTeam()));

searchInput.addEventListener("input", () => {
    const query = searchInput.value;
    const results = searchPokemon(allPokemon, query);

    renderPokemonList(results);
    initializePokemonSelection();
});

typeFilter.addEventListener("change", async () => {
    const selectedType = typeFilter.value;

    if (selectedType === "anyType") {
        renderPokemonList(allPokemon);
        initializePokemonSelection();
        return;
    }

    const typeData = await getPokemonByType(selectedType);
    const results = filterPokemonByType(allPokemon, typeData);

    renderPokemonList(results);
    initializePokemonSelection();
});

teamSlots.forEach(teamSlot => {
    teamSlot.addEventListener("click", () => {
        selectTeamSlot(teamSlot);
        setSelectedTeamSlot(teamSlot);
    });
});

function initializePokemonSelection() {
    const pokemonElements = document.querySelectorAll(".pokemonListElement");

    pokemonElements.forEach(pokemonElement => {
        pokemonElement.addEventListener("click", () => {
            selectPokemon(pokemonElement);
            setSelectedPokemon(pokemonElement.innerText);
        });
    });
}

addButton.addEventListener("click", async () => {
    const selectedSlot = getSelectedTeamSlot();
    const selectedPokemon = getSelectedPokemon();

    if (!selectedSlot || !selectedPokemon) {
        return;
    }

    try {
        const pokemonData = await getPokemonByName(selectedPokemon);
        const teamPokemon = prepareTeamPokemon(pokemonData);

        const slotIndex = [...teamSlots].indexOf(selectedSlot);

        setTeamPokemon(slotIndex, teamPokemon);

        renderPokemonInSlot(selectedSlot, teamPokemon);

        const advice = calculateTypeAdvice(getTeam());
        renderTypeAdvice(advice);
    } catch (error) {
        console.error("Error adding Pokémon:", error);
    }
});

removeButton.addEventListener("click", () => {
    const selectedSlot = getSelectedTeamSlot();

    if (!selectedSlot) {
        return;
    }

    const slotIndex = [...teamSlots].indexOf(selectedSlot);

    removeTeamPokemon(slotIndex);

    const emptySlotText = getEmptySlotText(
        selectedSlot,
        teamSlots
    );

    removePokemonFromSlot(
        selectedSlot,
        emptySlotText
    );

    const advice = calculateTypeAdvice(getTeam());
    renderTypeAdvice(advice);
});