import { typeChart } from "../data/typeChart.js";

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

function calculateTypeAdvice(team) {
    const teamTypes = [];

    team.forEach(pokemon => {
        if (!pokemon) {
            return;
        }

        teamTypes.push(...pokemon.types);
    });

    if (teamTypes.length === 0) {
        return {
            offensiveWeak: [],
            defensiveWeak: [],
            hasTeam: false
        };
    }

    const allTypes = Object.keys(typeChart);
    const offensiveCoverage = new Set();
    const defensiveCoverage = new Set();

    teamTypes.forEach(type => {
        const chart = typeChart[type];

        if (!chart) {
            return;
        }

        chart.strongAgainst.forEach(type => {
            offensiveCoverage.add(type);
        });

        chart.resists.forEach(type => {
            defensiveCoverage.add(type);
        });
    });

    const offensiveWeak = allTypes.filter(
        type => !offensiveCoverage.has(type)
    );

    const defensiveWeak = allTypes.filter(
        type => !defensiveCoverage.has(type)
    );

    return {
        offensiveWeak,
        defensiveWeak,
        hasTeam: true
    };
}

export {
    prepareTeamPokemon,
    getEmptySlotText,
    calculateTypeAdvice
};