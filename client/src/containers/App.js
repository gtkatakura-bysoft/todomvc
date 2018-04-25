import React from 'react'
import { Provider, Subscribe, Container } from 'unstated'
import App from '../components/App'
import TodoService from '../services/TodoService'

const service = new TodoService()

class TodosContainer extends Container {
  state = {
    entities: [],
  }

  addTodo = async (text) => {
    const { id } = await service.create({ text })

    this.setState({
      entities: [
        ...this.state.entities,
        { id, text, completed: false },
      ],
    })
  }

  editTodo = async (id, text) => {
    await service.update({ id, text })

    const todos = this.state.entities.filter(entity => entity.id !== id)
    const todo = this.state.entities.find(entity => entity.id === id)

    this.setState({
      entities: [
        ...todos,
        { ...todo, text },
      ],
    })
  }

  load = async () => {
    const todos = await service.all()
    this.setState({
      entities: [...todos],
    })
  }
}

const AppContainer = () => (
  <Provider>
    <Subscribe to={[TodosContainer]}>
      {({ state, ...actions }) => <App todos={state.entities} actions={actions} />}
    </Subscribe>
  </Provider>
)

export default AppContainer
