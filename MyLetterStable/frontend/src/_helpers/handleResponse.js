export function handleResponse(response) {
    if (!response)
        return Promise.reject("notResponce");
    return response.text().then(text => {
        if (response.status === 500) {
            const error = response.statusText;

            console.log("Logout Fire")
            // accountService.logout();


            // location.reload(true);
            return Promise.reject(error);
        }
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                console.log("Logout Fire")
                //   accountService.logout();
            }
            console.log("Logout Fire")
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        // console.log(data)
        return data;
    });
}