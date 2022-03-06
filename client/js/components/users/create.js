function renderSignupForm() {
    const page = document.getElementById('page');
    page.innerHTML = `
        <h2>Sign up</h2>
        <h3>Sign up to Ok Bloomer today:</h3>
        <form id="signup" action="/api/users" method="POST">
            
            <p>Username:</p>
            <input type="text" name="username" />
            <p>Password:</p>
            <input type="password" name="password" />
            <p>Email:</p>
            <input type="text" name="email" />

            <button type="submit">Submit</button>
        </form>
    `;

    const form = document.getElementById('signup');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        clearErrors();

        const usernameField = document.querySelector('input[name=username]');
        const passwordField = document.querySelector('input[name=password]');
        const emailField = document.querySelector('input[name=email]');

        const body = {
            username: usernameField.value,
            password: passwordField.value,
            email: emailField.value,
        };

        let error = null;
        if (body.username === '') {
            error = 'Username is required';
        } else if (body.password === '') {
            error = 'Password is required';
        } else if (body.email === '') {
            error = 'Email is required';
        }

        if (!error) {
            axios
                .post('/api/users', body)
                .then((response) => {
                    renderAppWithSession();
                })
                .catch((error) => {
                    displayError(error.response.data.message);
                });
        } else {
            displayError(error);
        }
    });
}
