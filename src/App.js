import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import uuidv4 from "uuid/v4";
 


const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  //retrieve our stored todos
  useEffect(() => {
    //get todos in localstorage, comes as string, needs parse
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    //now check if there is any stored todo, case yes, set it to setTodo
    if (storedTodos) setTodos(storedTodos);
  }, []);

  //to save our todos to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;

    if (name === "") return;
    //check if its empty so no empty todo gets added
    //so input gets cleared after
    //get oldtodos
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }

  function toggleTodo(id){
    //never ever modify a state variable. create new variable and then set current state to the new variable
    const newTodos = [...todos];
    //look for the item that has id equal to id that was passed down to function
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos)
  }

  function handleClearTodo(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }
  return (
    <>
      <TodoList todos={todos} toggleTodo = { toggleTodo} />
      <input type="text" ref={todoNameRef} />
      <button onClick={handleAddTodo}>Add Todo </button>
      <button onClick={handleClearTodo}>Clear Completed Todo's</button>

      <div> {todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  );
}

export default App;
