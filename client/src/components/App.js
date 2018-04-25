import React from 'react'
import PropTypes from 'prop-types'
import Header from '../components/Header'
import MainSection from '../components/MainSection'

class App extends React.Component {
  componentWillMount() {
    this.props.actions.load()
  }

  render() {
    const { todos, actions } = this.props

    return (
      <div>
        <Header addTodo={actions.addTodo} />
        <MainSection todos={todos} actions={actions} />
      </div>
    )
  }
}

App.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

export default App
