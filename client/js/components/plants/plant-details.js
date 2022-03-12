function renderPlant(id) {
    const page = document.getElementById('page');
    const detail = document.createElement('div');
    page.replaceChildren(detail);

    axios.get(`/api/plants/${id}`).then((response) => {
        const plant = response.data;
        let plantDiv = document.createElement('div');
        let fertilisingFreq,
            wateringFreq,
            pruningFreq,
            repottingFreq,
            soilType,
            sunlight,
            location;

        const modalBox = document.createElement('div');
        modalBox.innerHTML = `
                    <div class="modal-content w-60 flex justify-center flex-col content-center">
                    <span class="close-btn flex justify-end cursor-pointer">&times;</span>
                        <h3 class="text-bold text-lg">Not Logged In!</h3>
                        <p class="my-6">Please <span class="login-link text-green-700 hover:text-green-400 cursor-pointer ease-in duration-300">Login</span> or <span class="signup-link text-green-700 hover:text-green-400 cursor-pointer ease-in duration-300">Sign up</span> to use this feature!</p>
                    </div>
                    `;
        modalBox.classList.add('not-logged-in-modal');
        page.appendChild(modalBox);

        let closeBtn = document.querySelector('.close-btn');
        closeBtn.onclick = function () {
            modalBox.style.display = 'none';
        };
        window.onclick = function (e) {
            if (e.target == modalBox) {
                modalBox.style.display = 'none';
            }
        };

        const loginLink = document.querySelector('.login-link');
        const signupLink = document.querySelector('.signup-link');

        loginLink.addEventListener('click', () => {
            renderLoginForm();
        });
        signupLink.addEventListener('click', () => {
            renderSignupForm();
        });

        plant.fertilising_frequency_in_days == 0
            ? (fertilisingFreq = 'N/A')
            : (fertilisingFreq = `Every ${plant.fertilising_frequency_in_days} days`);

        plant.watering_frequency_in_days == 0
            ? (wateringFreq = 'N/A')
            : (wateringFreq = `Every ${plant.watering_frequency_in_days} days`);

        plant.pruning_frequency_in_days == 0
            ? (pruningFreq = 'N/A')
            : (pruningFreq = `Every ${plant.pruning_frequency_in_days} days`);

        plant.repotting_frequency_in_days == 0
            ? (repottingFreq = 'N/A')
            : (repottingFreq = `Every ${plant.repotting_frequency_in_days} days`);

        plant.soil_type ? (soilType = plant.soil_type) : (soilType = 'N/A');

        sunlight = plant.sunlight;
        location = plant.plant_location;

        detail.appendChild(plantDiv).innerHTML = `
            <div id="plant-details-container" class="bg-green-50 rounded-lg w-9/12 mt-6 mx-auto mb-9 flex flex-wrap gap-6 p-8 shadow-lg shadow-black-500/40">
                <img src="${plant.image_url}" class="w-1/4 h-1/4 "></img>
                <div id="plant-details" class="flex flex-col gap-1">
                <h3><span class="font-bold">Name:</span> ${plant.name}</h3>
                <div><span class="font-bold">Latin Name:</span> ${
                    plant.latin_name
                }</div>
                <div><span class="font-bold">Watering Frequency:</span> ${wateringFreq}</div>
                <div><span class="font-bold">Sunlight:</span> ${
                    sunlight[0].toUpperCase() + sunlight.substring(1)
                }</div>
                <div><span class="font-bold">Indoors/Outdoors:</span> ${
                    location[0].toUpperCase() + location.substring(1)
                }</div>
                <div><span class="font-bold">Fertilising Frequency:</span> ${fertilisingFreq}</div>
                <div><span class="font-bold">Pruning Frequency:</span> ${pruningFreq}</div>
                <div><span class="font-bold">Repotting Frequency:</span> ${repottingFreq}</div>
                <div><span class="font-bold">Soil Type:</span> ${soilType}</div>
                </div>
                <div>${plant.description}</div>
                
                <button id="add-plant-to-schedule" class="text-white hover:bg-green-600  bg-green-900  px-8 p-2 rounded-full ease-in duration-300 hover:scale-110">Add to Schedule</button>
                <button id="add-plant-to-favourites" class="text-white hover:bg-green-600  bg-green-900  px-8 p-2 rounded-full ease-in duration-300 hover:scale-110">Add to Favourites</button>
                <div class='pt-2 text-red-600 plant-error'></div>
            </div>
        `;
        const addPlantToFavouritesButton = document.querySelector(
            '#add-plant-to-favourites'
        );

        const addPlantToScheduleButton = document.querySelector(
            '#add-plant-to-schedule'
        );

        getSession().then((session) => {
            if (session.username == null) {
                addPlantToFavouritesButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    const notLoggedInModal = document.querySelector(
                        '.not-logged-in-modal'
                    );
                    notLoggedInModal.style.display = 'block';
                });

                addPlantToScheduleButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    const notLoggedInModal = document.querySelector(
                        '.not-logged-in-modal'
                    );
                    notLoggedInModal.style.display = 'block';
                });
            } else {
                addPlantToFavouritesButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    addPlantToFavourites(plant);
                });

                addPlantToScheduleButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    addPlantToSchedule(plant);
                });
            }
        });

        // addPlantToFavouritesButton.addEventListener('click', (e) => {
        //     e.preventDefault();
        //     addPlantToFavourites(plant);
        // });

        // addPlantToScheduleButton.addEventListener('click', (e) => {
        //     e.preventDefault();
        //     addPlantToSchedule(plant);
        // });
    });
}
