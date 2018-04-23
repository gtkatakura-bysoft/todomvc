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
  dispatch({ type: types.EDIT_TODO, id, text });

  await service.update({ id, text });
};

export const completeTodo = dispatch => async ({ id, completed }) => {
  dispatch({ type: types.COMPLETE_TODO, id })

  await service.update({ id, completed: !completed })
};

export const completeAll = () => ({ type: types.COMPLETE_ALL })

export const clearCompleted = dispatch => async () => {
  dispatch({ type: types.CLEAR_COMPLETED })

  const todos = await service.all();

  await Promise.all(
    todos
      .filter(todo => todo.completed)
      .map(({ id }) => service.destroy(id))
  );
}

export const load = dispatch => async () => {
  const todos = await service.all();

  dispatch({
    type: 'TODOS_FETCH',
    payload: todos,
  })
}