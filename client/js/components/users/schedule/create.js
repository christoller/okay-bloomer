function addToSchedule() {
    // Render Modal Form
    // Nickname
    // Sumbit Btn

    // Pull Data from form

    // Calculate stuff
    const date = Date.now();
    const milisecondsInDay = 86400000;

    // insert into a object
    let body = {};
    // make post request

    axios.post(`/api/schedule/}`, body).then((response) => {
        renderSchedule();
    });
}
