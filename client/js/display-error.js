function displayError(errorText) {
    const page = document.getElementById('page');
    const error = document.createElement('p');
    error.innerText = errorText;
    error.classList.add('error');
    page.prepend(error);
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error');

    errorMessages.forEach((error) => error.remove());
}
