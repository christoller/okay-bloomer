function renderSearch() {
    const page = document.querySelector('#page');

    page.innerHTML = `
        <p id="header-intro" class="w-7/8 mx-auto md:w-1/2 my-8 text-justify">
            This is our introductory paragraph/s. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            ullamcorper, ante sit amet ullamcorper aliquet, ipsum mauris mollis
            nibh, sed pellentesque metus mauris ut justo. Cras mollis lacus eget
            iaculis consectetur. <br /><br />
            Fusce aliquet lacinia eros, id sodales leo
            consectetur vitae. Duis pharetra lacinia lectus, ultrices euismod
            dui blandit non. Mauris vitae mauris vitae neque imperdiet maximus.
            Integer arcu turpis, accumsan quis turpis dapibus, molestie semper
            quam. Nunc euismod magna quis arcu tincidunt hendrerit. Fusce a
            cursus mi. Praesent ornare ligula non justo sollicitudin, vitae
            malesuada felis placerat. Duis id ultricies ante, ut finibus lectus.
        </p>

        <div class="flex text-1xl m-auto justify-center py-8">
            <form action="/">
                <input type="text" placeholder="Search by plant name.." name="search-term" id="search-term">
                <button class="px-8 bg-green-900 text-white rounded-full" type="submit" id="search-btn">Search</button>
            </form>
            <div class="search-results"></div>
        </div>
    `;
    const searchInput = document.querySelector('#search-term');
    const searchButton = document.querySelector('#search-btn');

    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        renderSearchResults(searchInput.value);
        const headerIntro = document.getElementById('header-intro');
        if (headerIntro.style.display == 'none') {
            headerIntro.style.display = 'contents';
        } else {
            headerIntro.style.display = 'none';
        }
    });
}
