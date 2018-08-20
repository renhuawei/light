import 'whatwg-fetch';

async function request(url, config = {}) {
  const headers = new Headers();
  headers.append('Accept', 'application/json');

  for (const newHeader in config.headers) {
    headers.set(newHeader, config.headers[newHeader]);
  }

  if (!(config.body instanceof FormData)) {
    headers.append('Content-Type', 'application/json');
  }

  if (config.json) {
    config.body = JSON.stringify(config.json);
  }

  const finalConfig = {
    method: 'get',
    ...config,
    headers
  };

  try {
    const response = await fetch(url, finalConfig);
    const contentType = response.headers.get('content-type');
    const isSerialisable =
      contentType && contentType.includes('application/json');

    if (response.status === 200 || response.status === 201) {
      if (isSerialisable) {
        return response.json();
      }
      return response.text();
    } else if (response.status >= 400) {
      return Promise.reject({
        failure: true,
        errors: [{ message: response.statusText }]
      });
    }
  } catch (err) {
    return Promise.reject({
      failure: true,
      errors: [{ message: err.message }]
    });
  }
}

export default request;
