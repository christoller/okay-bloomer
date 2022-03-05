function renderSchedule() {
    const resultsContainer = document.createElement('section');
    resultsContainer.innerHTML = '';
    page.innerHTML = ``;

    axios.get(`/api/schedule/`).then((response) => {
        const results = response.data;

        results.forEach((result) => {
            const item = document.createElement('div');

            item.innerHTML = `
                <div class="schedule-result">
                    <p> ${result.plant.nickname} needs ${result.action} on ${result.dueDate} </p>       
                </div>
            `;
            resultsContainer.appendChild(item);
        });
        page.appendChild(resultsContainer);
    });
}
