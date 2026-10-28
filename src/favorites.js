import { createPokemonCard } from "./functions.js";
import { getFavoritesFromLocalStorage } from "./localStorage.js";


function init(){
    const pokemons  = getFavoritesFromLocalStorage();
    const section = document.getElementById("favorites-list");
    pokemons.forEach(pokemon =>{
        const card = createPokemonCard(pokemon,(p,isFavorite)=>{
            if(!isFavorite){
                //card.remove();
                const card = document.querySelector(`.pokemon-card[data-id='${pokemon.id}']`);
                if(card){
                    card.remove();
                }
            }
        });
        section.append(card);
    })
}

init();