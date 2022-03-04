const resultsContainer = document.createElement('section');

function renderSearchResults(searchQuery) {
    resultsContainer.innerHTML = '';
    axios.get(`/api/plants?search=${searchQuery}`).then((response) => {
        const results = response.data;

        results.forEach((result) => {
            const item = document.createElement('div');
            item.innerHTML = `
                <div id="search-result" onclick="renderPlant(${result.id})">
                    <h3> ${result.name} </h3>
                        <img src="${result.image_url}" height=200px width=200px ></img>
                        <p>Latin name: <i> ${result.latin_name} </i></p>
                        <p> ${result.description}</p>
                        <a href="#####">Learn more about ${result.name} here</a>
                </div>
            `;
            resultsContainer.appendChild(item);
        });
        page.appendChild(resultsContainer);
    });
}
