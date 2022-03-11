function renderSchedule() {
    page.innerHTML = ``;
    axios.get(`/api/schedule/`).then((response) => {
        const results = response.data;
        if (
            results.day.length == 0 &&
            results.week.length == 0 &&
            results.month.length == 0
        ) {
            const emptySchedule = document.createElement('div');
            emptySchedule.innerHTML = `
                <div class="text-center mt-12 mx-auto">
                    <div class="flex justify-center">
                        <img src="https://images.unsplash.com/photo-1570778003102-2036f73c5e60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" width='400px' height='auto' class="rounded-xl"/>
                    </div>
                    <p class="w-1/3 mx-auto mt-2 font-bold">
                        Nothing added to your schedule. Go to the homepage and use the search function to find plants and add to schedule to keep track of maintainence for your plants.
                    </p>
                </div>`;
            page.appendChild(emptySchedule);
        }

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
