class easyHTTP {

    //Make a GET HTTP request
    async get(url) {

        const response = await fetch(url);

        const data = await response.json();

        return data;
    }

    //Make a Post HTTP request

    async post(url, data) {

        const response = await fetch(url, {

            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const resData = await response.json();

        return resData;
    }

    //Make a PUT HTTP request

    async put(url, data) {

        const response = await fetch(url, {

            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },

            body: JSON.stringify(data)
        });

        const resData = await response.json();

        return resData;
    }

    //Make a Delete Request

    async delete(url) {

        const response = await fetch(url, {

            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })

        const resData = await 'Resource Deleted...';

        return resData;
    }
}

export const http = new easyHTTP();