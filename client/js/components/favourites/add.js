function addPlantToFavourites() {
    // TODO

    const body = {
        plant_id: plants.id,
        user_id: req.session.userId,
    };

    axios
        .post('/api/favourites/', body)
        .then((response) => {
            console.log('success');
        })
        .catch((error) => {
            displayError(error.response.data.message);
        });

    console.log(body);
}
