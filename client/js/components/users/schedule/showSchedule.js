function renderSchedule() {
    // const resultsContainer = document.createElement('section');
    // resultsContainer.innerHTML = '';
    page.innerHTML = ``;
    axios.get(`/api/schedule/`).then((response) => {
        const results = response.data;
        results.forEach((result) => {
            console.log(result);
            const timeContainer = document.createElement('div');
            result.forEach((entry) => {
                const item = document.createElement('div');
                item.classList.add('schedule-result');
                item.innerHTML = `
                        <p> ${entry.plantName} needs ${entry.actionType}</p>
                        <button class="refreshTimer" data-id="${result.id}" data-action="${result.action}">I am a button</button>
                `;
                timeContainer.appendChild(item);
                page.appendChild(timeContainer);
            });
        });
        // page.appendChild(resultsContainer);
        document.querySelectorAll('button.refreshTimer').forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                updateSchedule(button.dataset.action, button.dataset.id);
            });
        });
    });
}
