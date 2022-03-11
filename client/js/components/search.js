function renderSearch() {
    const page = document.querySelector('#page');

    page.innerHTML = `
        <p id="header-intro" class="w-7/8 mx-auto md:w-1/2 my-8 text-center">
            You're only moments away for being a better plant parent.<br>
            Add to your plant care schedule by searching our extensive plant database!
        </p>

        <div class="flex text-1xl mx-auto mt-8 justify-center">
                <div class='
                search-container mx-auto w-1/3 mt-0.5 lg:p-4 text-center border-neutral-400/50 border-2 bg-green-50 rounded-xl shadow-lg shadow-black-500/40
                '>
                    <p class="font-bold my-2">Search the database:</p>
                    <input type="text" placeholder="Search by plant name..."name="search-term" id="search-term" class="border-2 border-neutral-400/50 rounded mr-4 px-4"/>
                    <button class="mb-4 lg:mb-0 mt-2 px-8 py-0.5 bg-green-900 text-white rounded-full hover:bg-green-600 ease-in duration-300 hover:scale-105"type="submit" id="search-btn">Search</button>
                </div>
            
            <div class="search-results"></div>
        </div>
    `;
    const searchInput = document.querySelector('#search-term');
    const searchButton = document.querySelector('#search-btn');

    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        renderSearchResults(searchInput.value);

        // Disables the search button until search results have loaded to prevent multiple loading spinners/search results
        searchButton.disabled = true;
        setTimeout(() => {
            searchButton.disabled = false;
        }, 1500);

        const headerIntro = document.getElementById('header-intro');
        if (headerIntro.style.display != 'none') {
            headerIntro.style.display = 'none';
        }
    });
}
