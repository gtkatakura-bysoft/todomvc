import WebApi from './http/WebApi';

export default class EventService {
  constructor() {
    this.api = new WebApi('http://localhost:3002/events');
  }

  all() {
    return this.api.get();
  }

  create(event) {
    return this.api.post(event);
  }

  update(event) {
    return this.api.withRoute(event.id).put(event);
  }

  destroy(id) {
    return this.api.withRoute(id).delete();
  }
}
