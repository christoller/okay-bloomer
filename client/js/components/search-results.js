function renderSearchResults(searchQuery) {
    axios.get(`/api/plants?search=${searchQuery}`).then((response) => {
        const results = response.data;
        const resultsContainer = document.createElement('div');

        results.forEach((result) => {
            const item = document.createElement('h3');
            item.innerHTML = `
                <h3 onclick="renderPlant(${result.id})">
                    ${result.name}
                </h3>
            `;
            resultsContainer.appendChild(item);
        });
        page.appendChild(resultsContainer);
    });
}
