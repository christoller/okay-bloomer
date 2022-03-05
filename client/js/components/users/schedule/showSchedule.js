function renderSchedule() {
    const resultsContainer = document.createElement('section');
    resultsContainer.innerHTML = '';
    page.innerHTML = ``;

    axios.get(`/api/schedule/`).then((response) => {
        const results = response.data;
        console.log(results);
        results.forEach((result) => {
            const item = document.createElement('div');

            item.innerHTML = `
                <div class="schedule-result">
                    <p> ${result.plant.nickname} needs ${result.action} on ${result.dueDate} </p>
                    <button class="refreshTimer" data-id="${result.id}" data-action="${result.action}">I am a button</button>       
                </div>
            `;
            resultsContainer.appendChild(item);
        });
        page.appendChild(resultsContainer);
        document.querySelectorAll('button.refreshTimer').forEach((button) => {
            button.addEventListener('click', (e) => {
                console.log('ADDING ON CLICK');
                e.preventDefault();
                updateSchedule(button.dataset.action, button.dataset.id);
            });
        });
    });
}
