function renderPlantFavourites() {
    const resultsContainer = document.createElement('section');
    resultsContainer.innerHTML = '';
    page.innerHTML = ``;

    axios.get(`/api/favourites/`).then((response) => {
        const results = response.data;
        console.log(results);
        results.forEach((result) => {
            console.log(result);
            const item = document.createElement('div');

            item.innerHTML = `
                <div id="favourites-container" class="flex flex-row gap-4 ">  
                    <div class="favourites-result" class="bg-green-50 rounded-lg w-9/12 mt-6 mx-auto mb-9 flex flex-wrap gap-6 p-8 shadow-lg shadow-black-500/40">
                        <h3 class="text-2xl"> ${result.name} </h3>   
                        <p> ${result.description} </p> 
                        <button id="delete" data-favourite_id="${result.favourite_id}"class="delete-favourite text-white hover:bg-green-600  bg-green-900  px-8 p-2 rounded-full ease-in duration-300 hover:scale-110">Remove ${result.name} from favourites</button>
                    </div>
            `;
            resultsContainer.appendChild(item);
            page.appendChild(resultsContainer);
        });

        document
            .querySelectorAll('button.delete-favourite')
            .forEach((button) => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    deletePlantFromFavourites(button.dataset.favourite_id);
                });
            });
    });
}
