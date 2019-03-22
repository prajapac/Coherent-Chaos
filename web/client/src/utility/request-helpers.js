export function* sendRequest ({method, url, headers, body, onSuccess, onFailure}) {
    try {
        let res = yield fetch(
            url,
            {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    ...headers
                },
                body: JSON.stringify(body)
            }
        );

        let data = yield res.json();

        if (res.ok && !data.failure) {
            yield onSuccess(data)
        } else {
            yield onFailure(data)
        }
    } catch (err) {
        yield onFailure(err)
    }
}
