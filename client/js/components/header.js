function renderHeader(session = {}) {
    const header = document.querySelector('#header-nav');
    header.innerHTML = `
    `;
    if (session.username) {
        header.innerHTML += `
        <ul id="navlist" class="flex m-auto justify-center">
            <li class="px-8">Welcome, ${session.username}</li>
            <li onClick="renderSearch()" class="px-8">Homepage</li>
            <li onClick="renderSchedule()" class="px-8">View your schedule</li>
            <li onClick="renderPlantFavourites()" class="px-8">View your favourites</li>
            <li onClick="" class="px-8">Create plant listing (TODO)</li>
            <li onClick="logout()" class="px-8">Logout</li>
        </ul>
        `;
    } else {
        header.innerHTML += `
        <ul id="navlist" class="flex m-auto justify-center">
            <li onClick="renderSearch()" class="px-8">Homepage</li>
            <li onClick="renderSignupForm()" class="px-8">Sign up</li>
            <li onClick="renderLoginForm()" class="px-8">Login</li>
        </ul>
        `;
    }
}
