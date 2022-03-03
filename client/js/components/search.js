function renderSearch() {
    const page = document.querySelector('#page');
    page.innerHTML = `
        <div class="search-container">
            <form action="/">
                <input type="text" placeholder="Search by plant name.." name="search-term" id="search-term">
                <button type="submit" id="search-btn">Search</button>
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
