function deletePlantFromFavourites(id) {
    axios.delete(`/api/favourites/${id}`).then(() => renderPlantFavourites());
}
