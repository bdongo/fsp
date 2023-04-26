

const csrfFetch = async (url, options = {}) => {
    options.method = options.method || 'GET';

    options.headers = options.headers || {};

    if (options.method.toUpperCase() !== 'GET') {
        options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
        options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token')
    }

    const res = await fetch(url, options);

    if (res.status >= 400) {
        throw res
    }

    return res;
}
export default csrfFetch;

export const restoreCSRF = async () => {
    const res = await fetch('/api/session')
    if (res.ok) {
        storeCSRFtoken(res);
        return res;
    }
}

export const storeCSRFtoken = (res) => {
    const token = res.headers.get('X-CSRF-Token');
    if (token) {
        sessionStorage.setItem('X-CSRF-Token', token);
    }
}