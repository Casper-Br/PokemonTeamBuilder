const typeChart = {
    normal:   { resists: ["ghost"], strongAgainst: [] },
    fire:     { resists: ["fire","grass","ice","bug","steel"], strongAgainst: ["grass","ice","bug","steel"] },
    water:    { resists: ["fire","water","ice","steel"], strongAgainst: ["fire","ground","rock"] },
    electric: { resists: ["electric","flying","steel"], strongAgainst: ["water","flying"] },
    grass:    { resists: ["water","electric","grass","ground"], strongAgainst: ["water","ground","rock"] },
    ice:      { resists: ["ice"], strongAgainst: ["grass","ground","flying","dragon"] },
    fighting: { resists: ["bug","rock","dark"], strongAgainst: ["normal","ice","rock","dark","steel"] },
    poison:   { resists: ["grass","fighting","poison","bug"], strongAgainst: ["grass"] },
    ground:   { resists: ["poison","rock","electric"], strongAgainst: ["fire","electric","poison","rock","steel"] },
    flying:   { resists: ["grass","fighting","bug","ground"], strongAgainst: ["grass","fighting","bug"] },
    psychic:  { resists: ["fighting","psychic"], strongAgainst: ["fighting","poison"] },
    bug:      { resists: ["grass","fighting","ground"], strongAgainst: ["grass","psychic","dark"] },
    rock:     { resists: ["normal","fire","poison","flying"], strongAgainst: ["fire","ice","flying","bug"] },
    ghost:    { resists: ["normal","fighting","poison","bug"], strongAgainst: ["psychic","ghost"] },
    dragon:   { resists: ["fire","water","electric","grass"], strongAgainst: ["dragon"] },
    dark:     { resists: ["ghost","dark","psychic"], strongAgainst: ["psychic","ghost"] },
    steel:    { resists: ["normal","grass","ice","flying","psychic","bug","rock","dragon","steel", "poison"], strongAgainst: ["ice","rock"] }
  };

  export { typeChart };