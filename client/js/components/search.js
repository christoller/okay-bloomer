function renderSearch() {
    const page = document.querySelector('#page');

    page.innerHTML = `
    <div class="header-intro h-px w-1/4 bg-green-700 mx-auto my-8"></div>
        <p  class="header-intro w-7/8 mx-auto md:w-1/2  text-center font-type text-2xl font-bold text-green-900">
            You're only moments away for being a better plant parent.<br>
            Add to your plant care schedule by searching our extensive plant database!
        </p>
        <div class="header-intro h-px w-1/4 bg-green-700 mx-auto mt-8"></div>

        <div class="flex text-1xl mx-auto mt-8 justify-center">
                <div class='
                search-container mx-auto lg:p-4 text-center w-1/3 rounded-xl font-type font-bold border border-green-700 shadow-lg shadow-black-500/40"
                '>
                    <p class="font-bold my-2 text-lg">Search the database:</p>
                    <input type="text" placeholder="Search by plant name..."name="search-term" id="search-term" class="border-2 border-neutral-400/50 rounded mr-4 px-4"/>
                    <br />
                    <button class="mb-4 lg:mb-0 mt-3 px-8 py-0.5 bg-green-900 text-white rounded-full hover:bg-green-600 ease-in duration-300 hover:scale-105"type="submit" id="search-btn">Search</button>
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

        const headerIntro = document.querySelectorAll('.header-intro');
        headerIntro.forEach((element) => {
            if (element.style.display != 'none') {
                element.style.display = 'none';
            }
        });
    });
}
