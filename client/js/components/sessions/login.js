function renderLoginForm() {
    const page = document.querySelector('#page');
    page.innerHTML = `
        <div class='login-container'>
            <form id="login" action="/api/sessions" method="POST"
            <p>Username:</p>
            <input type="text" name="username" />
            <p>Password:</p>
            <input type="password" name="password" />

            <button type="submit">Login</button>
        </form>
    `;
    const form = document.getElementById('login');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        clearErrors();

        const usernameField = document.querySelector('input[name=username]');
        const passwordField = document.querySelector('input[name=password]');
        const body = {
            username: usernameField.value,
            password: passwordField.value,
        };

        let error = null;
        if (body.username === '') {
            error = 'Username is required';
        } else if (body.password === '') {
            error = 'Password is required';
        }

        if (!error) {
            axios
                .post('/api/sessions', body)
                .then((response) => {
                    // Is a 2XX response code
                    renderAppWithSession();
                })
                .catch((error) => {
                    console.log(`There was an error ${error.response}`);
                    // Is a greater than 2XX response code. E.g. 422, 500 error
                    // Only runs on Error
                    displayError(error.response.data.message);
                });
        } else {
            displayError(error);
        }
    });
}
