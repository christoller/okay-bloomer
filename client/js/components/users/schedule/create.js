function addPlantToSchedule(plant) {
    const body = {
        plant_id: plant.id,
        plant_nickname: plant.plant_nickname,
    };

    axios
        .post('/api/schedule/', body)
        .then((response) => {
            // Is a 2XX response code
            renderSchedule();
            const plantAddedNotification = document.createElement('div');
            plantAddedNotification.style =
                'background-color: rgb(20,83,45); width:100%; height:100%';

            plantAddedNotification.innerHTML = `
            <p class="text-center text-white my-4">${plant.name} added to schedule</p>
            `;

            page.appendChild(plantAddedNotification);
            console.log('Success');
        })
        .catch((error) => {
            // Is a greater than 2XX response code. E.g. 422, 500 error
            // Only runs on Error
            displayError(error.response.data.message);
        });

    console.log(body);
}
