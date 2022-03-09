function addPlantToFavourites(plant) {
    const body = {
        plant_id: plant.id,
    };

    axios
        .post('/api/favourites/', body)
        .then((response) => {
            renderPlantFavourites();
        })
        .catch((error) => {
            displayError(error.response.data.message);
        });
}
