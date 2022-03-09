function renderSearch() {
    const page = document.querySelector('#page');
    page.innerHTML = `
        <div class="flex text-1xl m-auto justify-center py-8">
            <form action="/">
            
                <div class='
        search-container mx-auto w-5/6 mt-4 lg:mt-8 lg:w-1/9 lg:p-16 lg:h-1/5 text-center border-neutral-400/50 border-2 bg-green-50 rounded-xl shadow-lg shadow-black-500/40
        '>
                <p class="font-bold my-2">Search a plant:</p>
                <input type="text" placeholder="Search by plant name.."name="search-term" id="search-term" class="border-2 border-neutral-400/50 rounded"/>

                <button class="mb-4 lg:mb-0 mt-4 px-8 py-0.5 bg-green-900 text-white rounded-full hover:bg-green-600 ease-in duration-300 hover:scale-105"type="submit" id="search-btn">Search</button>

                </div>

            </form>
            <div class="search-results"></div>
        </div>
    `;
    const searchInput = document.querySelector('#search-term');
    const searchButton = document.querySelector('#search-btn');

    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        renderSearchResults(searchInput.value);
    });
}
