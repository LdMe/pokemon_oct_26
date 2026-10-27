
function getFavoritesFromLocalStorage(){
    const favoritesString = localStorage.getItem("favorites") || "[]";
    const favorites = JSON.parse(favoritesString);
    return favorites;
}

function saveFavoritesToLocalStorage(favorites){
    const favoritesString = JSON.stringify(favorites);
    localStorage.setItem("favorites",favoritesString);
}
function clearFavorites(){
    localStorage.setItem("favorites","[]");
}
function addToFavorites(element){
    const favorites = getFavoritesFromLocalStorage();
    const oldFavorite = favorites.find(f=>f.id === element.id);
    if(!oldFavorite){
        favorites.push(element);
        saveFavoritesToLocalStorage(favorites);
    }
}
function removeFavorite(element){
    const favorites = getFavoritesFromLocalStorage();
    const oldFavoriteIndex = favorites.findIndex(f=>f.id === element.id);
    if(oldFavoriteIndex !== -1){
        favorites.splice(oldFavoriteIndex,1);
        saveFavoritesToLocalStorage(favorites);
    }
}

function toggleFavorite(element){
    const favorites = getFavoritesFromLocalStorage();
    const oldFavoriteIndex = favorites.findIndex(f=>f.id === element.id);
    let result = false;
    if(oldFavoriteIndex === -1){
        favorites.push(element);
        result = true;
    }else{
        favorites.splice(oldFavoriteIndex,1)
    }
    saveFavoritesToLocalStorage(favorites);
    return result;
}

function isInFavorites(element){
    const favorites = getFavoritesFromLocalStorage();
    const oldFavorite = favorites.find(f=>f.id === element.id);
    if(oldFavorite){
        return true;
    }else{
        return false;
    }
}

export {
    saveFavoritesToLocalStorage,
    getFavoritesFromLocalStorage,
    toggleFavorite,
    addToFavorites,
    removeFavorite,
    isInFavorites
}