import { addToFavorites, isInFavorites, toggleFavorite } from "./localStorage.js";

const API_URL = "https://pokeapi.co/api/v2/pokemon/";

async function getPokemons(limit = 10, offset = 0) {
    try {
        const url = new URL(API_URL);
        url.searchParams.append("limit", limit);
        url.searchParams.append("offset", offset);
        const urlString = url.toString();

        const response = await fetch(urlString)
        if (!response.ok) {
            throw new Error("Unable to connect to API");
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

async function getPokemonData(pokemonName) {
    try {
        const url = new URL(API_URL + pokemonName);
        const urlString = url.toString();

        const response = await fetch(urlString)
        if (!response.ok) {
            throw new Error("Unable to connect to API");
        }
        const result = await response.json();

        const pokemon = getCleanPokemon(result);
        console.log(pokemon);
        return pokemon;
    } catch (error) {
        console.error(error);
    }
}
function getCleanPokemon(pokemonData) {
    return {
        id: pokemonData.id,
        name: pokemonData.name,
        image: pokemonData.sprites.front_default,
        types: pokemonData.types.map(type => type.type.name)
    }
}

function createPokemonCard(pokemon) {
    const article = document.createElement("article");
    article.classList.add("pokemon-card");
    article.dataset.id = pokemon.id;

    const title = document.createElement("h3");
    title.textContent = pokemon.name;

    const image = document.createElement("img");
    image.src = pokemon.image;
    image.setAttribute("alt", pokemon.name);

    const types = document.createElement("p");
    types.textContent = pokemon.types.join(", ");

    const favoriteButton = document.createElement("button");
    const isFavorite = isInFavorites(pokemon);
    if (isFavorite) {
        favoriteButton.classList.add("favorite");
        favoriteButton.textContent = "Unlike";
    } else {
        favoriteButton.textContent = "Like";
    }

    favoriteButton.addEventListener("click", () => {
        const isFavorite = toggleFavorite(pokemon);
        if (isFavorite) {
            favoriteButton.classList.add("favorite");
            favoriteButton.textContent = "Unlike";
        } else {
            favoriteButton.classList.remove("favorite");
            favoriteButton.textContent = "Like";
        }
    })

    article.append(image, title, types, favoriteButton);
    return article;

}

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


