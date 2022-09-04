import { useEffect } from "react";
import { v4 as uuidV4 } from "uuid";

export default function Form({ input, setInput, todos, setTodos, editTodo, setEditTodo }) {
  function onInputChange(event) {
    setInput(event.target.value);
  }

  useEffect(()=> {
    if(editTodo) {
        setInput(editTodo.title)
    }else {
        setInput("")
    }
  },[setInput, editTodo])

  function updateTodo(title, id, completed) {
    const newTodo = todos.map((todo) => 
        todo.id === id ? {title, id, completed} : todo
    )
    setTodos(newTodo)
    setEditTodo("")
  }

  function onFormSubmit(event) {
    event.preventDefault();

    if(!editTodo) {
        setTodos([...todos, { id: uuidV4(), title: input, completed: false }]);
        setInput("");
    }else {
        updateTodo(input, editTodo.id, editTodo.completed)
    }

    
  }

  return (
    <form onSubmit={onFormSubmit}>
      <input
        type="text"
        placeholder="Masukan mas...."
        className="task-input"
        value={input}
        required
        onChange={onInputChange}
      />
      <button className="button-add" type="submit">
        {editTodo ? "OK" : "Add"}
      </button>
    </form>
  );
}
