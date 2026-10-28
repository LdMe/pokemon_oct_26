
import { getPokemons, getPokemonData, createPokemonCard } from "./functions.js";

const limit = 10;
let page = 1;
let totalPages = 1;
function getOffsetFromPage(page, limit) {
    return (page - 1) * limit;
}

function getPageQuantity(totalCount, limit) {
    console.log(totalCount, limit)
    const totalPages = Math.ceil(totalCount / limit);
    return totalPages;
}

function setText(elementID, text) {
    const element = document.getElementById(elementID);
    element.textContent = text;
}

function createPageListeners() {
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");

    prevButton.addEventListener("click", () => {
        if (page > 1) {
            page--;
            setText("current-page", page);
            nextButton.disabled = false;
            if (page === 1) {
                prevButton.disabled = true;
            }
            loadPage(page, limit);
        }
    })
    nextButton.addEventListener("click", () => {
        if (page < totalPages) {
            page++;
            setText("current-page", page)
            prevButton.disabled = false;
            if (page === totalPages) {
                nextButton.disabled = true;
            }
            loadPage(page, limit);
        }
    })
}

async function loadPage(page, limit) {
    // conseguir sección donde se muestran
    const pokemonListSection = document.getElementById("pokemon-list");
    pokemonListSection.replaceChildren(); // vacía la sección

    const offset = getOffsetFromPage(page, limit)
    const pokemons = await getPokemons(limit, offset);

    // pokemons.results.forEach(async (pokemon) => {
    //     const data = await getPokemonData(pokemon.name);
    //     const card = createPokemonCard(data);
    //     pokemonListSection.append(card);
    // })
    totalPages = getPageQuantity(pokemons.count, limit);
    setText("total-pages", totalPages);

    const results = pokemons.results.map(pokemon => getPokemonData(pokemon.name));

    const datos = await Promise.all(results);
    datos.forEach(pokemon => {
        const card = createPokemonCard(pokemon);
        pokemonListSection.append(card);
    })

    console.log(datos);
}


createPageListeners();
loadPage(page, limit);


