import * as types from '../constants/ActionTypes'
import TodoService from '../services/TodoService';

const service = new TodoService();

export const addTodo = dispatch => async (text) => {
  const { id } = await service.create({ text });

  dispatch({ type: types.ADD_TODO, id, text });

  return Promise.resolve();
};

export const deleteTodo = dispatch => async (id) => {
  await service.destroy(id);

  dispatch({ type: types.DELETE_TODO, id });
};

export const editTodo = dispatch => async (id, text) => {
  await service.update({ id, text });

  dispatch({ type: types.EDIT_TODO, id, text });
};

export const completeTodo = id => ({ type: types.COMPLETE_TODO, id })
export const completeAll = () => ({ type: types.COMPLETE_ALL })
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED })
