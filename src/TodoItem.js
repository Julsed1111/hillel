import React from "react";

export default function TodoItem({ onItemClick, onDeleteButtonClick, item }) {
  const { completed, title, id } = item;
  return (
    <div className="divLi">
      <li
        style={{
          backgroundColor: getStyle(completed),
        }}
        onClick={() => onItemClick(id)}
      >
        {title}
      </li>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDeleteButtonClick(id);
        }}
        title="Delete item"
      >
        Delete
      </button>
    </div>
  );
}

function getStyle(completed) {
  return completed ? "lightGray" : "#00FF7F";
}
