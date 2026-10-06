import { teamSlots } from "./dom.js";
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

export {
    selectTeamSlot,
    renderPokemonInSlot,
    removePokemonFromSlot
};