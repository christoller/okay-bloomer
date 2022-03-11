function renderHeader(session = {}) {
    const header = document.querySelector('#header-nav');
    header.innerHTML = `
    `;
    if (session.username) {
        header.innerHTML += `

        <ul id="navlist" class="flex m-auto justify-center text-lg">
            <li class="px-8 ease-in duration-500 hover:scale-125 ">Welcome, ${session.username}</li>
            <li class="hidden md:contents">|</li>
            <li onClick="renderSearch()" class="px-8 cursor-pointer hover:text-green-800 ease-in duration-200 hover:underline hover:font-bold hover:scale-110">Search plants</li>
            <li class="hidden md:contents">|</li>
            <li onClick="renderSchedule()" class="px-8 cursor-pointer hover:text-green-800 ease-in duration-200 hover:underline hover:font-bold hover:scale-110" >View schedule</li>
            <li class="hidden md:contents">|</li>
            <li onClick="renderPlantFavourites()" class="px-8 cursor-pointer hover:text-green-800 ease-in duration-200 hover:underline hover:font-bold hover:scale-110"">View favourites</li>
            <li class="hidden md:contents">|</li>
            <li onClick="logout()" class="px-8 cursor-pointer hover:text-green-800 ease-in duration-200 hover:underline hover:font-bold hover:scale-110"">Logout</li>

        </ul>
        `;
    } else {
        header.innerHTML += `
        <ul id="navlist" class="flex m-auto justify-center">
            <li onClick="renderSearch()" class="px-8 cursor-pointer hover:text-green-800 ease-in duration-200 hover:underline hover:font-bold hover:scale-110">Homepage</li>
            <li class="hidden md:contents">|</li>
            <li onClick="renderSignupForm()" class="px-8 cursor-pointer hover:text-green-800 ease-in duration-200 hover:underline hover:font-bold hover:scale-110">Sign up</li>
            <li class="hidden md:contents">|</li>
            <li onClick="renderLoginForm()" class="px-8 cursor-pointer hover:text-green-800 ease-in duration-200 hover:underline hover:font-bold hover:scale-110">Login</li>
        </ul>
        `;
    }
}
