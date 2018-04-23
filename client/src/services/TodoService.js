import WebApi from './http/WebApi';
import EventService from '../services/EventService';

export default class TodoService {
  constructor() {
    this.eventService = new EventService();
    this.api = new WebApi('http://localhost:3001/todos');
  }

  all() {
    return this.api.get();
  }

  async create(todo) {
    await this.eventService.create({ type_name: 'CREATE_TODO', data: JSON.stringify(todo) });

    return await this.api.post(todo);
  }

  async update(todo) {
    await this.eventService.create({ type_name: 'UPDATE_TODO', data: JSON.stringify(todo) });
    
    return this.api.withRoute(todo.id).put(todo);
  }

  async destroy(id) {
    await this.eventService.create({ type_name: 'DELETE_TODO', data: JSON.stringify({ id }) });
    
    return this.api.withRoute(id).delete();
  }
}
