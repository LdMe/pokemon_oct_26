import { createPokemonCard } from "./functions.js";
import { getFavoritesFromLocalStorage } from "./localStorage.js";


function loadFavorites(search="",type="all") {
    const pokemons = getFavoritesFromLocalStorage();
    const filteredPokemons = pokemons.filter(pokemon =>{
        if(search){
            // !(A | B) == !A & !B
            if(!pokemon.id.toString().includes(search) & !pokemon.name.includes(search)){
                return false;
            }
        }
        if(type !== "all"){
            if(!pokemon.types.includes(type)){
                return false;
            }
        }

        return true;
    })
    const section = document.getElementById("favorites-list");
    section.replaceChildren();
    filteredPokemons.forEach(pokemon => {
        const card = createPokemonCard(pokemon, (p, isFavorite) => {
            if (!isFavorite) {
                //card.remove();
                const card = document.querySelector(`.pokemon-card[data-id='${pokemon.id}']`);
                if (card) {
                    card.remove();
                }
            }
        });
        section.append(card);
    })
}

function getTypes() {
    const pokemons = getFavoritesFromLocalStorage();
    const typesSet = new Set();
    pokemons.forEach(pokemon => {
        pokemon.types.forEach(type => {
            typesSet.add(type);
        })
    })
    const types = Array.from(typesSet);
    return types;

}

function setTypesOptions() {
    const types = getTypes();
    const selector = document.getElementById("type-select");
    const options = types.map(tp => {
        const option = document.createElement("option");
        option.value = tp;
        option.textContent = tp;
        return option;
    })
    selector.append(...options);
}

function setSearchForm(){
    const form = document.getElementById("filter-form");
    form.addEventListener("submit",(event)=>{
        event.preventDefault();
        const formData = new FormData(event.target);
        const search = formData.get("search").toLowerCase().trim();
        const type = formData.get("type");
        loadFavorites(search,type);

    })
}

function controlSearchQuery(){
    const searchInput = document.getElementById("search-input");
    const typeSelector = document.getElementById("type-select");
    let timeout = null;
    searchInput.addEventListener("input",(e)=>{
        clearTimeout(timeout);
        timeout = setTimeout(()=>{
            const search  = e.target.value;
            const type = typeSelector.value;
            loadFavorites(search,type);
        },500)
    })
}
controlSearchQuery();
setTypesOptions();
setSearchForm();
loadFavorites();