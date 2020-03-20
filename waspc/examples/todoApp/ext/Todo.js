// As seen here, we can import npm packages used in code generated by Wasp, which will be clearly defined.
// In the future, we will of course also be able to specify additional packages as dependencies.
import React from 'react'
import { connect } from 'react-redux'

// As seen here, we can import specific components/code generated by Wasp.
// These will have well defined and documented APIs and paths.
// Note that Task, NewTaskForm and TaskList are generated based on the declarations
// we made in todoApp.wasp file.
import NewTaskForm from '@wasp/entities/task/components/NewTaskForm'
import TaskList from '@wasp/entities/task/components/TaskList'
import * as taskState from '@wasp/entities/task/state.js'
import * as taskActions from '@wasp/entities/task/actions.js'
import ToggleIsDoneButton from '@wasp/components/ToggleIsDoneButton'
import DeleteDoneButton from '@wasp/components/DeleteDoneButton'

import Task from '@wasp/entities/task/Task'

class Todo extends React.Component {
  // TODO: prop types.

  isAnyTaskCompleted = () => this.props.taskList.some(t => t.isDone)

  isThereAnyTask = () => this.props.taskList.length > 0

  componentDidMount() {
    this.props.addTask(new Task({isDone: true, description: 'Present Wasp Inspector'}))
    this.props.addTask(new Task({isDone: false, description: 'Launch Wasp Alpha'}))
  }

  render = () => {
    return (
      <div className="todos">
        <div className="todos__container">
          <h1> Todos </h1>

          <div className="todos__toggleAndInput">
            <ToggleIsDoneButton
              disabled={!this.isThereAnyTask()}
              className="todos__toggleButton"
            />

            <NewTaskForm
              className="todos__newTaskForm"
              onCreate={task => this.props.addTask(task)}
              submitButtonLabel={'Create new task'}
            />
          </div>

          { this.isThereAnyTask() && (<>
            <TaskList editable />

            <div className="todos__footer">
              <div className="todos__footer__itemsLeft">
                { this.props.taskList.filter(task => !task.isDone).length } items left
              </div>

              <div className="todos__footer__clearCompleted">
                <DeleteDoneButton
                  className={this.isAnyTaskCompleted() ? '' : 'hidden' }
                />
              </div>
            </div>
          </>)}
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  taskList: taskState.selectors.all(state)
}), {
  addTask: taskActions.add
})(Todo)
