function updateSchedule(action, id) {
    const body = {
        action: action,
    };

    axios
        .patch(`/api/schedule/${id}`, body)
        .then((response) => {
            console.log('AXIOS .PATCH IS HAPPENING!');
        })
        .catch((error) => {
            displayError(error.response.data.message);
        });
}
