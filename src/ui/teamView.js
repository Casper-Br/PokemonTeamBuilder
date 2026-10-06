import { teamSlots, typeAdvice } from "./dom.js";
import { typeColors } from "../data/typeColors.js";

function selectTeamSlot(slot) {
    teamSlots.forEach(teamSlot => {
        teamSlot.classList.remove("selected");
    });

    slot.classList.add("selected");
}

function renderPokemonInSlot(slot, pokemon) {
    slot.innerHTML = "";

    const img = document.createElement("img");
    img.src = pokemon.sprite;
    img.alt = pokemon.name;
    img.style.width = "80px";
    img.style.height = "80px";

    const nameEl = document.createElement("div");
    nameEl.innerText = pokemon.name;
    nameEl.style.fontWeight = "bold";

    const typesEl = document.createElement("div");

    pokemon.types.forEach(typeName => {
        const typeBox = document.createElement("span");

        typeBox.classList.add("typeBox");
        typeBox.innerText = typeName;
        typeBox.style.backgroundColor = typeColors[typeName] || "gray";

        typesEl.appendChild(typeBox);
    });

    slot.appendChild(img);
    slot.appendChild(nameEl);
    slot.appendChild(typesEl);
}

function removePokemonFromSlot(slot, emptySlotText) {
    slot.innerHTML = emptySlotText;
    slot.dataset.types = "";
}

function renderTypeAdvice(advice) {
    typeAdvice.replaceChildren();

    if (!advice.hasTeam) {
        typeAdvice.innerText = "Your team is weak against everything.";
        return;
    }

    if (
        advice.offensiveWeak.length === 0 &&
        advice.defensiveWeak.length === 0
    ) {
        typeAdvice.innerText = "Your team is strong against everything.";
        return;
    }

    const createTypeSpans = types => {
        return types.map(typeName => {
            const span = document.createElement("span");

            span.classList.add("typeBox");
            span.style.backgroundColor =
                typeColors[typeName] || "gray";
            span.innerText = typeName;

            return span;
        });
    };

    const offensiveLabel = document.createElement("div");
    offensiveLabel.innerText = "Offensively weak against: ";

    createTypeSpans(advice.offensiveWeak)
        .forEach(span => offensiveLabel.appendChild(span));

    typeAdvice.appendChild(offensiveLabel);

    const defensiveLabel = document.createElement("div");
    defensiveLabel.innerText = "Defensively weak against: ";

    createTypeSpans(advice.defensiveWeak)
        .forEach(span => defensiveLabel.appendChild(span));

    typeAdvice.appendChild(defensiveLabel);
}

export {
    selectTeamSlot,
    renderPokemonInSlot,
    removePokemonFromSlot,
    renderTypeAdvice
};