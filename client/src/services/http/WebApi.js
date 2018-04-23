export default class WebApi {
  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
  }

  async fetch({ method, data }) {
    const body = data && JSON.stringify(data);

    const response = await fetch(this.baseUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method,
      body,
    });

    if (method !== 'DELETE') {
      return response.json();
    }
  }

  get() {
    return this.fetch({ method: 'GET' });
  }

  post(data) {
    return this.fetch({ method: 'POST', data });
  }

  put(data) {
    return this.fetch({ method: 'PUT', data });
  }

  delete() {
    return this.fetch({ method: 'DELETE' });
  }

  withRoute(route) {
    return new WebApi(`${this.baseUrl}/${route}`);
  }
}