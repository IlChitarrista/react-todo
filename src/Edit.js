import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Button from "./Button";

const Edit = ({ item, onComplete, onCancel, onConfirm, initialValue }) => {
  const [value, setValue] = useState(initialValue);
  const completed = item.completed ? "line-through" : "";
  return (
    <div className="flex gap-2 w-96 m-auto min-h-fit">
      <input
        className="w-5 shrink-0 cursor-pointer"
        type="checkbox"
        checked={item.completed}
        onChange={onComplete}
      />
      <input
        className={`rounded-lg text-center w-full p-1 mt-1 mb-1 mr-1 ${completed}`}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        autoFocus
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            onConfirm(value);
          }
          if (event.key === "Escape") {
            onCancel();
          }
        }}
      ></input>
      <Button onClick={() => onConfirm(value)} className="bg-blue-500">
        <FontAwesomeIcon icon={faCheck} />
      </Button>
      <Button onClick={onCancel} className="bg-red-500">
        <FontAwesomeIcon icon={faXmark} />
      </Button>
    </div>
  );
};

export default Edit;
