renderAppWithoutSession();
renderAppWithSession();

function renderAppWithoutSession() {
    renderHeader();
    renderSearch();
    renderPlant(1);
}

function renderAppWithSession() {
    getSession().then((session) => {
        renderHeader(session);
        renderSearch();
        renderPlant(1);
    });
}