const teamPokemons = document.querySelectorAll(".teamPokemon");
let selectedItem = null;

teamPokemons.forEach(teamPokemon => {
    teamPokemon.addEventListener("click", () => {
        teamPokemons.forEach(i => i.classList.remove("selected"));

        teamPokemon.classList.add("selected");
        selectedItem = teamPokemon;
    });
});