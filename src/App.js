import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Button from "./Button";
import Edit from "./Edit";
import Item from "./Item";
import Pagination from "./Pagination";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [editIdx, setEditIdx] = useState(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const from = items.length === 0 ? 0 : page * pageSize + 1;
  const to = Math.min(items.length, (page + 1) * pageSize);

  const onToggleEdit = (idx) => {
    setEditIdx(idx);
  };

  const onComplete = (completedKey) =>
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.key === completedKey
          ? { ...item, completed: !item.completed }
          : item
      )
    );

  const onRemove = (removeKey) => {
    setItems((prevItems) => prevItems.filter((item) => item.key !== removeKey));
    if (from >= to && page !== 0) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const onAdd = (content) => {
    if (editIdx !== null || content === "") {
      return;
    }
    setItems((prevItems) => [
      { key: Math.random(), completed: false, content },
      ...prevItems,
    ]);
    setInputValue("");
  };

  const onEditCancel = () => {
    setEditIdx(null);
  };

  const onInputChange = (event) => setInputValue(event.target.value);

  const onConfirm = (content, editKey) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.key === editKey ? { ...item, content } : item
      )
    );
    setEditIdx(null);
  };

  const onChangePageSize = (newPageSize) => {
    setPageSize(newPageSize);
    setPage(0);
  };

  const onMoveUp = (idx) => {
    setItems((prevItems) => {
      if (idx === 0) {
        return prevItems;
      }
      return [
        ...prevItems.slice(0, idx - 1),
        prevItems[idx],
        prevItems[idx - 1],
        ...prevItems.slice(idx + 1),
      ];
    });
  };

  const onMoveDown = (idx) => {
    setItems((prevItems) => {
      if (idx === prevItems.length - 1) {
        return prevItems;
      }
      return [
        ...prevItems.slice(0, idx),
        prevItems[idx + 1],
        prevItems[idx],
        ...prevItems.slice(idx + 2),
      ];
    });
  };

  return (
    <div className="w-screen h-screen flex justify-center p-10 bg-blue-100 dark:bg-blue-700">
      <div className="flex flex-col items-center p-10 min-w-fit w-1/3 gap-6 border rounded-lg bg-blue-200 dark:bg-blue-800 dark:border-blue-700">
        <h1 className="text-5xl font-bold dark:text-white select-none">
          My To-Do List
        </h1>
        <div className="flex gap-4">
          <input
            className="rounded-lg border-2 p-1 text-center disabled:opacity-80 disabled:bg-white"
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                onAdd(inputValue);
              }
            }}
            onChange={onInputChange}
            value={inputValue}
            autoFocus
            placeholder="Stuff I Have To Do"
            disabled={editIdx !== null}
          ></input>
          <Button
            className=" bg-blue-500 disabled:opacity-80"
            onClick={() => onAdd(inputValue)}
            disabled={inputValue === "" || editIdx !== null}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
        <div className="flex flex-col gap-2 overflow-y-scroll w-full">
          {items
            .slice(from - 1, to)
            .map((item, idx) =>
              editIdx === idx ? (
                <Edit
                  key={`Edit_${item.key}`}
                  onCancel={onEditCancel}
                  item={item}
                  initialValue={item.content}
                  onComplete={() => onComplete(item.key)}
                  onConfirm={(content) => onConfirm(content, item.key)}
                />
              ) : (
                <Item
                  key={`Item_${item.key}`}
                  item={item}
                  onComplete={() => onComplete(item.key)}
                  onRemove={() => onRemove(item.key)}
                  onToggleEdit={() => onToggleEdit(idx)}
                  onMoveUp={() => onMoveUp(idx + pageSize * page)}
                  onMoveDown={() => onMoveDown(idx + pageSize * page)}
                />
              )
            )}
        </div>
        <div className="flex gap-2 mt-auto">
          <label
            htmlFor="changePageSize"
            className="dark:text-white select-none min-w-fit"
          >
            Page Size
          </label>
          <select
            name="changePageSize"
            onChange={(event) => onChangePageSize(event.target.value)}
            className={"px-2 cursor-pointer rounded-lg text-center"}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
          </select>
          <Pagination
            totalItems={items.length}
            from={from}
            to={to}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
