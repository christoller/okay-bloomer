function loadingSpinner(searchQuery) {
    const page = document.getElementById('page');
    const loader = document.createElement('div');
    loader.classList.add('loader');
    page.appendChild(loader);

    setTimeout(() => {
        loader.style.display = 'none';
    }, 1000);
}
