import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import MainSection from '../components/MainSection'
import * as TodoActions from '../actions'

class App extends React.Component {
  componentWillMount() {
    this.props.actions.load();
  }

  render() {
    const { todos, actions } = this.props;
    return (
      <div>
        <Header addTodo={actions.addTodo} />
        <MainSection todos={todos} actions={actions} />
      </div>
    );
  }
}

App.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  todos: state.todos
})

const mapDispatchToProps = dispatch => ({
  actions: Object.assign(bindActionCreators(TodoActions, dispatch), {
    addTodo: TodoActions.addTodo(dispatch),
    editTodo: TodoActions.editTodo(dispatch),
    deleteTodo: TodoActions.deleteTodo(dispatch),
    completeTodo: TodoActions.completeTodo(dispatch),
    clearCompleted: TodoActions.clearCompleted(dispatch),
    load: TodoActions.load(dispatch),
  })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
