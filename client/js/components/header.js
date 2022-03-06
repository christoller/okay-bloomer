function renderHeader(session = {}) {
    const header = document.querySelector('#header-nav');
    header.innerHTML = `
    `;
    if (session.username) {
        header.innerHTML += `
        <ul id="navlist">
            <li onClick="#####">Create plant listing</li>
            <li onClick="renderSchedule()">View your schedule</li>
            <li>Welcome, ${session.username}.</li>
            <li onClick="logout()">Logout</li>
        </ul>
        `;
    } else {
        header.innerHTML += `
        <ul id="navlist">
            <li onClick="renderSignupForm()">Sign up</li>
            <li onClick="renderLoginForm()">Login</li>
        </ul>
        `;
    }
}
