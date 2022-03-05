function renderSchedule() {
    const resultsContainer = document.createElement('section');
    resultsContainer.innerHTML = '';
    page.innerHTML = ``;

    axios.get(`/api/schedule/`).then((response) => {
        const results = response.data;
        // Create empty results array
        const resultsArray = [];

        results.forEach((result) => {
            // calculate when each action is due
            // if less than x, append to resultsArray
        });

        // For each result in results array
        resultsArray.forEach((result) => {
            const item = document.createElement('div');

            item.innerHTML = `
                <div class="schedule-result">
                    <h3> ${result.name} </h3>
                        <img src="${result.image_url}" height=200px width=200px ></img>
                        <p>This needs to be watered in ${result.watering_frequency_in_days} days</p>
                </div>
            `;
            resultsContainer.appendChild(item);
        });
        page.appendChild(resultsContainer);
    });
}
