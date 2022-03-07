const resultsContainer = document.createElement('section');

function renderSearchResults(searchQuery) {
    resultsContainer.innerHTML = '';
    axios.get(`/api/plants?search=${searchQuery}`).then((response) => {
        const results = response.data;

        results.forEach((result) => {
            const item = document.createElement('div');
            item.innerHTML = `
                <div id="search-result" onClick="renderPlant(${result.id})" class="flex flex-wrap bg-white w-96 py-8 m-auto justify-center">
                    <h3 class="text-2xl"> ${result.name} </h3>
                        <img src="${result.image_url}" height=200px width=200px ></img>
                        <p>Latin name: <i> ${result.latin_name} </i></p>
                        <p> ${result.description}</p>
                        <a href="#####" class=" text-green-900">Learn more about ${result.name} here</a>
                </div>
            `;
            resultsContainer.appendChild(item);
        });
        page.appendChild(resultsContainer);
    });
}
