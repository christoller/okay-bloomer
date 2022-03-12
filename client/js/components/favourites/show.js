function renderPlantFavourites() {
    const resultsContainer = document.createElement('section');
    resultsContainer.innerHTML = '';
    page.innerHTML = ``;

    axios.get(`/api/favourites/`).then((response) => {
        const results = response.data;
        if (results == null) {
            const emptyFavourites = document.createElement('div');
            emptyFavourites.innerHTML = `
                <div class="text-center mt-12 mx-auto">
                    <div class="flex justify-center">
                        <img src="https://images.unsplash.com/photo-1550983552-d9031a050568?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80" width='200px' height='auto' class="rounded-xl"/>
                    </div>
                    <p class="w-1/3 mx-auto mt-2 font-bold">
                        You don't have any favourite plants! Head to the 'Search plants' page and add to favourites to keep track of your favourite plants.
                    </p>
                </div>`;
            page.appendChild(emptyFavourites);
        } else {
            results.forEach((result) => {
                const item = document.createElement('div');
                item.innerHTML = `
                <div id="favourites-result" class="
                w-2/3 py-8 px-6 
                mx-auto my-3 justify-center 
                bg-green-50 shadow-2xl
                rounded-xl
                shadow-black-500/40">
                    <div id="favourites-container" class="flex gap-4" >  
                        <img src="${result.image_url}" class="rounded-2xl h-auto w-52 cursor-pointer "/>
                        <div class="justify-center">
                            <h3 class="text-2xl"> ${result.name} </h3><br>
                            <p > ${result.description} <a onClick="renderPlant(${result.id})"class=" text-green-900 hover:text-green-600 ease-in duration-200 mt-1 cursor-pointer font-bold" >Learn more.</a></p><br>
                            <button id="delete" data-favourite_id="${result.favourite_id}"class="delete-favourite text-white hover:bg-green-600  bg-green-900  px-8 p-2 rounded-full ease-in duration-300 hover:scale-110">Remove ${result.name} from favourites</button>
                        </div>
                    </div>
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
        }
    });
}
