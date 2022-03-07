const resultsContainer = document.createElement('section');

function renderSearchResults(searchQuery) {
    resultsContainer.innerHTML = '';
    axios.get(`/api/plants?search=${searchQuery}`).then((response) => {
        const results = response.data;

        results.forEach((result) => {
            const item = document.createElement('div');
            item.innerHTML = `
                <div id="search-result" onClick="renderPlant(${result.id})" class="flex flex-wrap  w-2/3 py-8 px-6 m-auto justify-center gap-5 bg-white">
                    <div id="search-result-container" class="flex flex-row gap-4 ">    
                        <img src="${result.image_url}" class="rounded h-auto w-52 cursor-pointer"/>
                    <div class="flex flex-col justify-center">
                        <h3 class="text-2xl"> ${result.name} </h3>
                        <p>Latin name: <i> ${result.latin_name} </i></p>
                        <p> ${result.description}</p>
                        <a href="#####" class=" text-green-900">Learn more about ${result.name} here</a>
                    </div>
                    </div>
                </div>
            `;
            resultsContainer.appendChild(item);
        });
        page.appendChild(resultsContainer);
    });
}
