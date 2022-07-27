import TodoItem from "./TodoItem";

import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const BASE_URL = "https://612687da3ab4100017a68fd8.mockapi.io/todos";

  useEffect(() => {
    fetch(BASE_URL)
      .then((resp) => resp.json())
      .then((data) => setTodos(data));
  }, []);

  const onInputChange = (e) => {
    setTitle(e.target.value);
  };

  const onSubmitButtonClick = (e) => {
    e.preventDefault();
    const newItem = {
      title,
      completed: false,
    };
    fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    })
      .then((resp) => resp.json())
      .then((data) => setTodos([...todos, data]));
  };

  const onItemClick = (id) => {
    const item = todos.find((todo) => todo.id === id);
    const newItem = { ...item, completed: !item.completed };
    fetch(BASE_URL + "/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });
    setTodos(todos.map((item) => (item.id === id ? newItem : item)));
  };

  const onDeleteButtonClick = (id) => {
    fetch(BASE_URL + "/" + id, {
      method: "DELETE",
    });
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <>
      <form action="">
        <fieldset>
          <legend>Enter new todo</legend>
          <input type="text" value={title} onChange={onInputChange} />
          <button onClick={onSubmitButtonClick}>Add</button>
        </fieldset>
      </form>

      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            item={todo}
            onDeleteButtonClick={onDeleteButtonClick}
            onItemClick={onItemClick}
          />
        ))}
      </ul>
    </>
  );
}
