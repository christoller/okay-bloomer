function updateSchedule(action, id, name) {
    const body = {
        action: action,
        newName: name,
    };

    axios
        .patch(`/api/schedule/${id}`, body)
        .then((response) => {
            renderSchedule();
        })
        .catch((error) => {
            displayError(error.response.data.message);
        });
}
