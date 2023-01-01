import {
  faArrowUp,
  faArrowDown,
  faPen,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Button from "./Button";

export default function Item({
  item,
  onComplete,
  onRemove,
  onToggleEdit,
  onMoveUp,
  onMoveDown,
}) {
  const completed = item.completed
    ? "opacity-70 dark:opacity-60 line-through"
    : "";
  return (
    <div className="flex gap-2 w-96 min-w-fit m-auto min-h-fit">
      <input
        className="w-5 shrink-0 cursor-pointer"
        type="checkbox"
        checked={item.completed}
        onChange={onComplete}
      />
      <p
        className={`rounded-lg p-2 bg-blue-300 w-64 break-words text-center place-self-center ${completed}`}
      >
        {item.content}
      </p>
      <div className="flex gap-1 self-center">
        <Button className="bg-green-500 min-w-fit max-h-fit" onClick={onMoveUp}>
          <FontAwesomeIcon icon={faArrowUp} />
        </Button>
        <Button
          className="bg-green-500 min-w-fit max-h-fit"
          onClick={onMoveDown}
        >
          <FontAwesomeIcon icon={faArrowDown} />
        </Button>
      </div>
      <Button className="bg-orange-500 w-fit" onClick={onToggleEdit}>
        <FontAwesomeIcon icon={faPen} />
      </Button>
      <Button className="bg-red-500" onClick={onRemove}>
        <FontAwesomeIcon icon={faXmark} />
      </Button>
    </div>
  );
}
