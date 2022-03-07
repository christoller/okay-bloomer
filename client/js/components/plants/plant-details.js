function renderPlant(id) {
    const page = document.getElementById('page');
    const detail = document.createElement('div');
    page.replaceChildren(detail);

    axios.get(`/api/plants/${id}`).then((response) => {
        const plant = response.data;
        let plantDiv = document.createElement('div');

        detail.appendChild(plantDiv).innerHTML = `
            <div id="plant-details-container" class="bg-white rounded-lg w-9/12 mt-6 mx-auto mb-9 flex flex-wrap gap-6 p-8 shadow-lg shadow-black-500/40">
                <img src="${plant.image_url}" class="w-1/4 h-1/4 "></img>
                <div id="plant-details" class="flex flex-col gap-1">
                <h3><span class="font-bold">Name:</span> ${plant.name}</h3>
                <div><span class="font-bold">Latin Name:</span> ${plant.latin_name}</div>
                <div><span class="font-bold">Watering Frequency:</span> Every ${plant.watering_frequency_in_days} Days</div>
                <div><span class="font-bold">Sunlight:</span> ${plant.sunlight}</div>
                <div><span class="font-bold">Indoors/Outdoors:</span> ${plant.plant_location}</div>
                <div><span class="font-bold">Fertilising Frequency:</span> Every ${plant.fertilising_frequency_in_days} days</div>
                <div><span class="font-bold">Pruning Frequency:</span> Every ${plant.pruning_frequency_in_days} days</div>
                <div><span class="font-bold">Repotting Frequency:</span> Every ${plant.repotting_frequency_in_days} days</div>
                <div><span class="font-bold">Soil Type:</span> ${plant.soil_type}</div>
                </div>
                <div>${plant.description}</div>
                <button id="add-plant-to-schedule" class="text-white hover:bg-green-600  bg-green-900  px-8 p-2 rounded-full ease-in duration-300 hover:scale-110">Add to Schedule</button>
            </div>
        `;
        const addPlantToScheduleButton = document.querySelector(
            '#add-plant-to-schedule'
        );

        addPlantToScheduleButton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(plant);
            addPlantToSchedule(plant);
        });
    });
}
