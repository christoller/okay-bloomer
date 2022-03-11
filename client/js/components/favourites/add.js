function addPlantToFavourites(plant) {
    const body = {
        plant_id: plant.id,
    };

    // Get list of favourite plants
    axios.get(`/api/favourites/`).then((response) => {
        const results = response.data;

        // If no plants in the favourites, just add the plant
        if (results == null) {
            axios
                .post('/api/favourites/', body)
                .then((response) => {
                    renderPlantFavourites();
                })
                .catch((error) => {
                    displayError(error.response.data.message);
                });
        } // else check if plant is already in favourites
        else {
            const duplicatePlants = (favouritePlant) =>
                favouritePlant.id == plant.id;
            if (results.some(duplicatePlants)) {
                const duplicatePlantResponse = document.createElement('div');
                const plantError = document.querySelector('.plant-error');
                const addToFavouritesBtn = document.querySelector(
                    '#add-plant-to-favourites'
                );

                duplicatePlantResponse.innerHTML = `
                         Plant already added to favourites.`;
                console.log('plant duplicate');

                plantError.appendChild(duplicatePlantResponse);
                // If plant already in favourites, deactivates add button
                addToFavouritesBtn.disabled = true;
            }
            // if no duplicates, add to favourites
            else {
                axios
                    .post('/api/favourites/', body)
                    .then((response) => {
                        renderPlantFavourites();
                    })
                    .catch((error) => {
                        displayError(error.response.data.message);
                    });
            }
        }
    });
}
