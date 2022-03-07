function viewPlantFavourites() {
    const resultsContainer = document.createElement('section');
    resultsContainer.innerHTML = '';
    page.innerHTML = ``;

    axios.get(`/api/favourites/`).then((response) => {
        const results = response.data;
        console.log(results);
        results.forEach((result) => {
            const item = document.createElement('div');

            item.innerHTML = `
                <div class="favourites-result">
                    <h3> ${result.name} </h3>   
                    <p> ${result.description} </p> 
                    <button> Remove ${result.name} from favourites </button> 
                </div>
            `;
            resultsContainer.appendChild(item);
        });
        page.appendChild(resultsContainer);
    });
}
