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

        <div class="flex text-1xl mx-auto mt-8 justify-center">
                <div class='
                search-container mx-auto w-1/3 mt-0.5 lg:p-4 text-center border-neutral-400/50 border-2 bg-green-50 rounded-xl shadow-lg shadow-black-500/40
                '>
                    <p class="font-bold my-2">Search a plant:</p>
                    <input type="text" placeholder="Search by plant name.."name="search-term" id="search-term" class="border-2 border-neutral-400/50 rounded mr-4 px-4"/>
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
        const headerIntro = document.getElementById('header-intro');
        if (headerIntro.style.display != 'none') {
            headerIntro.style.display = 'none';
        }
    });
}
