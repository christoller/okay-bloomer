function renderLoginForm() {
    const page = document.querySelector('#page');
    page.innerHTML = `
        <h2 class="font-bold text-4xl text-center mt-12">Log In</h2>
        <div class='
        login-container mx-auto w-5/6 mt-4 lg:mt-8 lg:w-1/3 lg:p-16 lg:h-1/3 text-center border-neutral-400/50 border-2 bg-green-50 rounded-xl shadow-lg shadow-black-500/40
        '>
            <h3 class="mt-2 lg:mt-0 mb-4 font-bold">Log in with your details below:</h3>
            <form id="login" action="/api/sessions" method="POST">
                <p class="font-bold my-2">Username:</p>
                <input type="text" name="username" class="border-2 border-neutral-400/50 rounded"/>
                <p class="font-bold my-2.5">Password:</p>
                <input type="password" name="password" class="border-2 border-neutral-400/50 rounded"> 
                <br/>
                <p class="error-location text-red-600 mt-1"></p>
                <button type="submit" class="mb-4 lg:mb-0 mt-4 px-8 py-0.5 bg-green-900 text-white rounded-full hover:bg-green-600 ease-in duration-300 hover:scale-110 ">Login</button>
            </form>
        </div>
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
                    renderAppWithSession();
                })
                .catch((error) => {
                    console.log(`There was an error ${error.response}`);
                    displayError(error.response.data.message);
                });
        } else {
            displayError(error);
        }
    });
}
