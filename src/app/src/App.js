import './App.css';
import logo from './logo.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/todos/", {}).then((res) => {
      const tasks = res.data;
      setTodos(tasks);
    });
    // .catch(e => console.log(e))
  }, []);
  const submitForm = (e) => {
    axios
      .post(
        "http://127.0.0.1:8000/todos/",
        {
          "task": newTask,
        })
      .then(function (response) {
        setTodos([...todos, response.data]);
        // console.log(response.data);
        setNewTask("");
      })
      .catch(function (error) { });
  };
  return (
    <div>
      <h1 className='App'>List of TODOs</h1>
      {todos.map((content, id) => {
        // console.log("content", content.task);
        return (
          <>
            <div className="App">
              <div>
                <li>{content.task}</li>
              </div>

            </div>
          </>
        );
      })}
      <div className="App">
        <h1>Create a ToDo</h1>
        <form onSubmit={submitForm}>
          <div>
            <label htmlFor="todo">ToDo: </label>
            <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
          </div>
          <div style={{ "marginTop": "5px" }}>
            <button>Add ToDo!</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;