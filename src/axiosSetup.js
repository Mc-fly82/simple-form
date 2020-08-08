
window.axios.interceptors.response.use((response) => {
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error.response);
});

export default window.axios;
