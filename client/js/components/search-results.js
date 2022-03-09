const resultsContainer = document.createElement('section');

function renderSearchResults(searchQuery) {
    resultsContainer.innerHTML = '';
    axios.get(`/api/plants?search=${searchQuery}`).then((response) => {
        const results = response.data;

        results.forEach((result) => {
            const item = document.createElement('div');
            item.innerHTML = `
                <div id="search-result" onClick="renderPlant(${result.id})" 
                class="
                flex flex-wrap  
                w-2/3 py-8 px-6 
                mx-auto my-3 justify-center 
                bg-green-50 shadow-2xl
                rounded-xl
                shadow-black-500/40">
                    <div id="search-result-container" class="flex flex-row gap-4 ">    
                        <img src="${result.image_url}" class="rounded-2xl h-auto w-52 cursor-pointer "/>
                        <div class="flex flex-col justify-center">
                            <h3 class="text-2xl" > ${result.name} </h3>
                            <p class="italic">Latin name: ${result.latin_name}</p>
                            <div class="w-full h-px bg-black my-1"></div>
                            <p> ${result.description}</p>

                            <a href="#####" class='mb-4 lg:mb-0 mt-4 px-8 py-0.5 bg-green-900 text-white rounded-full hover:bg-green-600 ease-in duration-300 hover:scale-105'>Learn more about ${result.name} here</a>

                        </div>
                    </div>
                </div>
            `;
            resultsContainer.appendChild(item);
        });
        page.appendChild(resultsContainer);
    });
}

{
    /* <button
    type='submit'
    class='mb-4 lg:mb-0 mt-4 px-8 py-0.5 bg-green-900 text-white rounded-full hover:bg-green-600 ease-in duration-300 hover:scale-110'>
    Submit
</button>; */
}
