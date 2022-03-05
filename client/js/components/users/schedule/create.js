
function addPlantToSchedule(plant) {
    const body = {
        plant_id: plant.id,
        plant_nickname: plant.plant_nickname,
    };

    axios
        .post('/api/schedule/', body)
        .then((response) => {
            // Is a 2XX response code
            console.log('success')
        })
        .catch((error) => {
            // Is a greater than 2XX response code. E.g. 422, 500 error
            // Only runs on Error
            displayError(error.response.data.message);
        });

    console.log(body);
}
