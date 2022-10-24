import React from "react"
import "./App.css"

class App extends React.Component {
  state = {
    formValue: "",
    status: "all",
    todos: [],
    todoList: [],
  }

  componentDidMount() {
    this.setState({ todoList: [...this.state.todos] })
  }

  handleSubmit = e => {
    e.preventDefault()
    const newTodos = [...this.state.todos]
    if (this.state.formValue.length > 0) {
      newTodos.push({
        id: e.timeStamp,
        text: this.state.formValue.trim(),
        completed: false,
      })
    }
    this.setState({ formValue: "", todos: newTodos })
    if (this.state.status === "all") {
      this.setState({ todoList: [...newTodos] })
    } else if (this.state.status === "active") {
      const activeTodos = [...newTodos].filter(todo => !todo.completed)
      this.setState({ status: "active", todoList: activeTodos })
    } else if (this.state.status === "completed") {
      const completedTodos = [...newTodos].filter(todo => todo.completed)
      this.setState({ status: "active", todoList: completedTodos })
    }
  }

  handleInputChange = e => {
    this.setState({ formValue: e.target.value })
  }

  handleCheckChange = todo => {
    const todoIndex = this.state.todos.indexOf(todo)
    const newTodos = [...this.state.todos]
    newTodos[todoIndex].completed = !newTodos[todoIndex].completed
    this.setState({ todos: newTodos })
    if (this.state.status === "all") {
      this.setState({ todoList: [...newTodos] })
    } else if (this.state.status === "active") {
      const activeTodos = [...newTodos].filter(todo => !todo.completed)
      this.setState({ todoList: activeTodos })
    } else if (this.state.status === "completed") {
      const completedTodos = [...newTodos].filter(todo => todo.completed)
      this.setState({ todoList: completedTodos })
    }
  }

  displayAll = () => {
    this.setState({ status: "all", todoList: [...this.state.todos] })
  }
  displayActive = () => {
    const activeTodos = [...this.state.todos].filter(todo => !todo.completed)
    this.setState({ status: "active", todoList: activeTodos })
  }
  displayCompleted = () => {
    const completedTodos = [...this.state.todos].filter(todo => todo.completed)
    this.setState({ status: "completed", todoList: completedTodos })
  }
  deleteTodo = todo => {
    let newTodos = [...this.state.todos].filter(item => item !== todo)
    const newDisplayedTodos = [...newTodos].filter(todo => todo.completed)
    this.setState({ todos: newTodos, todoList: newDisplayedTodos })
  }
  deleteAllCompleted = () => {
    const activeTodos = [...this.state.todos].filter(todo => !todo.completed)
    this.setState({ todos: activeTodos, todoList: [] })
  }

  render() {
    return (
      <div className="mainapp">
        <h1>Internship Assignment 2</h1>

        <div className="todosection">
          <button
            onClick={this.displayAll}
            className={this.state.status === "all" ? "highlighted" : ""}
          >
            All
          </button>
          <button
            onClick={this.displayActive}
            className={this.state.status === "active" ? "highlighted" : ""}
          >
            Active
          </button>
          <button
            onClick={this.displayCompleted}
            className={this.state.status === "completed" ? "highlighted" : ""}
          >
            Completed
          </button>
        </div>

        <form
          onSubmit={this.handleSubmit}
          className={this.state.status === "completed" ? "hidden" : ""}
        >
          <input
            type="text"
            placeholder="Add New Todo"
            value={this.state.formValue}
            onChange={this.handleInputChange}
          />
          <input type="submit" value="Add" />
        </form>

        <div className="todo-list">
          {this.state.todoList.map(todo => (
            <div className="todo-item" key={todo.id}>
              <label className={todo.completed ? "completed" : ""}>
                {todo.text}
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => this.handleCheckChange(todo)}
                />
                <span class="checkmark"></span>
              </label>
              <button
                className={this.state.status === "completed" ? "trash" : "trash hidden"}
                onClick={() => this.deleteTodo(todo)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="22px" height="22px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
              </button>
            </div>
          ))}
        </div>

        <button
          className={
            this.state.status === "completed" && this.state.todoList.length > 0
              ? "delete-all"
              : "delete-all hidden"
          }
          onClick={this.deleteAllCompleted}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
          Delete All Todos
        </button>
      </div>
    )
  }
}

export default App