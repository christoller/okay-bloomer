function renderSchedule() {
    page.innerHTML = ``;
    axios.get(`/api/schedule/`).then((response) => {
        const results = response.data;
        const dayContainer = document.createElement('div');
        const weekContainer = document.createElement('div');
        const monthContainer = document.createElement('div');
        dayContainer.classList.add('timeContainer');
        weekContainer.classList.add('timeContainer');
        monthContainer.classList.add('timeContainer');
        dayContainer.setAttribute('id', 'dayContainer');
        weekContainer.setAttribute('id', 'weekContainer');
        monthContainer.setAttribute('id', 'monthContainer');
        results.day.forEach((result) => {
            const item = document.createElement('div');

            item.classList.add('schedule-result');
            item.innerHTML = `
                        <p> ${result.plantName} needs ${result.actionType}</p>
                        <button class="refreshTimer" data-id="${result.id}" data-action="${result.actionType}">Task completed!</button>
                        <input type="text" placeholder="Change plant name.." name="new-name" id="new-name">
                        <button class="changeNickname" data-id="${result.id}" data-action="rename">Change plant name</button>
                `;
            dayContainer.appendChild(item);
        });
        page.appendChild(dayContainer);
        results.week.forEach((result) => {
            const item = document.createElement('div');
            item.classList.add('schedule-result');
            item.innerHTML = `
                        <p> ${result.plantName} needs ${result.actionType}</p>
                        <button class="refreshTimer" data-id="${result.id}" data-action="${result.actionType}">Task completed!</button>
                        <input type="text" placeholder="Change plant name.." name="new-name" id="new-name">
                        <button class="changeNickname" data-id="${result.id}" data-action="rename">Change plant name</button>
                `;
            weekContainer.appendChild(item);
        });
        page.appendChild(weekContainer);
        results.month.forEach((result) => {
            const item = document.createElement('div');
            item.classList.add('schedule-result');
            item.innerHTML = `
                        <p> ${result.plantName} needs ${result.actionType}</p>
                        <input type="text" placeholder="Change plant name.." name="new-name" id="new-name">
                        <button class="changeNickname" data-id="${result.id}" data-action="rename">Change plant name</button>
                `;
            monthContainer.appendChild(item);
        });
        page.appendChild(monthContainer);
        document.querySelectorAll('button.refreshTimer').forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                updateSchedule(button.dataset.action, button.dataset.id);
            });
        });
        const newName = document.querySelector('#new-name');
        document.querySelectorAll('button.changeNickname').forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                updateSchedule(
                    button.dataset.action,
                    button.dataset.id,
                    newName.value
                );
            });
        });
    });
}
