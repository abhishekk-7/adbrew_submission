import './App.css';
import logo from './logo.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function App() {
    const [todos, setTodos] = useState([]);
    console.log("yaha");
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/todos/", {}).then((res) => {
            const task = res.data;
            console.log("here");
            console.log("ye mila", task);
            setTodos(task);
        });
        // .catch(e => console.log(e))
    }, []);
    return (
        <div>
            <h1>idhar</h1>
            {todos.map((content, id) => {
                console.log("content", content.task);
                return (
                    <>
                        <div className="App">
                            <h1>yaha</h1>
                            <div>
                                <h1>List of TODOs</h1>
                                {content.task}
                            </div>
                            <div>
                                <h1>Create a ToDo</h1>
                                <form>
                                    <div>
                                        <label for="todo">ToDo: </label>
                                        <input type="text" />
                                    </div>
                                    <div style={{ "marginTop": "5px" }}>
                                        <button>Add ToDo!</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                );
            })}
        </div>
    );
}

export default App;