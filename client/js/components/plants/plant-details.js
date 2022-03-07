function renderPlant(id) {
    const page = document.getElementById('page');
    const detail = document.createElement('div');
    page.replaceChildren(detail);

    axios.get(`/api/plants/${id}`).then((response) => {
        const plant = response.data;
        let plantDiv = document.createElement('div');
        detail.appendChild(plantDiv).innerHTML = `
            
            <div><img src="${plant.image_url}" ></img></div>
            <h3>${plant.name}</h3>
            <div>${plant.latin_name}</div>
            <div>${plant.description}</div>
            <div>${plant.watering_frequency_in_days}</div>
            <div>${plant.sunlight}</div>
            <div>${plant.plant_location}</div>
            <div>${plant.fertilising_frequency_in_days}</div>
            <div>${plant.pruning_frequency_in_days}</div>
            <div>${plant.repotting_frequency_in_days}</div>
            <div>${plant.repotting_frequency_in_days}</div>
            <div>${plant.soil_type}</div>
            <button id="add-plant-to-favourites">Add to Favourites</button><br>
            <button id="add-plant-to-schedule">Add to Schedule</button>
        `;
        const addPlantToFavouritesButton = document.querySelector(
            '#add-plant-to-favourites'
        );
        const addPlantToScheduleButton = document.querySelector(
            '#add-plant-to-schedule'
        );

        addPlantToScheduleButton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(plant);
            addPlantToSchedule(plant);
        });

        addPlantToFavouritesButton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('addPlantToFavouritesButton is working ');
            addPlantToFavourites(); /// TODO
        });
    });
}
