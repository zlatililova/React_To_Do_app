import "./App.css";
import { useState } from "react";
import { FormCreator } from "./components/todo-creator";
import { TodoItem } from "./components/todo-item/todo-item";
import json from "./todos.json";

function App() {
  let [todos, addTodos] = useState(json);
  let [completed, changeToCompleted] = useState([]);

  const addTodo = (title) => {
    addTodos([...todos, { title, isDone: false }]);
    console.log(todos);
  };

  const removeTodo = (index, column, moveTodo) => {
    return () => {
      column.splice(index, 1);
      moveTodo([...column]);
    };
  };

  const renameTodo = (index, column, updateFunction) => {
    return (title) => {
      column[index].title = title;
      updateFunction([...column]);
    };
  };

  const moveTodo = (index, oldColumn, removeFromOld, newColumn, putInNew) => {
    return () => {
      const [todo] = oldColumn.splice(index, 1);
      todo.isDone = !todo.isDone;
      putInNew([...newColumn, todo]);
      removeFromOld([...oldColumn]);
    };
  };

  return (
    <div className="App">
      <h1>Todo app</h1>
      <hr />

      <FormCreator createTodo={addTodo} />
      <div className="columns">
        <div className="column">
          <h1>Todo</h1>
          {todos.map((todo, index) => {
            return (
              <TodoItem
                title={todo.title}
                checkItem={!todo.isDone}
                removeItem={removeTodo(index, todos, addTodos)}
                changeTodoTitle={renameTodo(index, todos, addTodos)}
                moveItem={moveTodo(
                  index,
                  todos,
                  addTodos,
                  completed,
                  changeToCompleted
                )}
              />
            );
          })}
        </div>
        <div className="column">
          <h1>Done</h1>
          {completed.map((todo, index) => {
            return (
              <TodoItem
                title={todo.title}
                checkItem={!todo.isDone}
                removeItem={removeTodo(index, completed, changeToCompleted)}
                changeTodoTitle={renameTodo(
                  index,
                  completed,
                  changeToCompleted
                )}
                moveItem={moveTodo(
                  index,
                  completed,
                  changeToCompleted,
                  todos,
                  addTodos
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
