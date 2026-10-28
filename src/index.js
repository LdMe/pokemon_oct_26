
import { getPokemons,getPokemonData,createPokemonCard } from "./functions.js";


async function init() {
    const pokemonListSection = document.getElementById("pokemon-list");
    const pokemons = await getPokemons();

    // pokemons.results.forEach(async (pokemon) => {
    //     const data = await getPokemonData(pokemon.name);
    //     const card = createPokemonCard(data);
    //     pokemonListSection.append(card);
    // })
    const results = pokemons.results.map(pokemon => getPokemonData(pokemon.name));

    const datos = await Promise.all(results);
    datos.forEach(pokemon => {
        const card = createPokemonCard(pokemon);
        pokemonListSection.append(card);
    })

    console.log(datos);
}

init();


