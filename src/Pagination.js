import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Pagination = ({ totalItems, from, to, setPage }) => {
  return (
    <div className="dark:text-white flex gap-2">
      <label className="select-none w-24 min-w-fit text-center">
        {from}-{to} of {totalItems}
      </label>
      <button
        className="rounded-lg px-2 bg-blue-300 disabled:bg-blue-200 dark:bg-blue-500 dark:disabled:bg-blue-800"
        onClick={() => setPage((prevPage) => prevPage - 1)}
        disabled={from <= 1}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button
        className="rounded-lg px-2 bg-blue-300 disabled:bg-blue-200 dark:bg-blue-500 dark:disabled:bg-blue-800"
        onClick={() => setPage((prevPage) => prevPage + 1)}
        disabled={totalItems === to}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default Pagination;
