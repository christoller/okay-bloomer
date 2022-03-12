function addPlantToFavourites(plant) {
    const body = {
        plant_id: plant.id,
    };
    axios.get(`/api/favourites/`).then((response) => {
        const results = response.data;
        if (results == null) {
            axios
                .post('/api/favourites/', body)
                .then((response) => {
                    renderPlantFavourites();
                })
                .catch((error) => {
                    displayError(error.response.data.message);
                });
        } else {
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
                addToFavouritesBtn.disabled = true;
            } else {
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
