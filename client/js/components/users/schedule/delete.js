function deleteScheduleEntry(id) {
    axios
        .delete(`/api/schedule/${id}`)
        .then((response) => {
            renderSchedule();
        })
        .catch((error) => {
            displayError(error.response.data.message);
        });
}
