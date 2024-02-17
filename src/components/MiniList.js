import React from "react";
import { Link } from "react-router-dom";
import "../styles/View.css";
function MiniList({ title, data }) {
  const selectedItem = data.find((item) => item.title === title);

  // Render subCatAll array if a matching item is found
  const subCatAllList = selectedItem
    ? selectedItem.subCatAll.map((item, index) => (
        <li key={index}>
          <Link to={`/some-path/${item.id}`}>{item.title}</Link>
        </li>
      ))
    : null;
  return (
    <div className="my-list">
      <h5>{title}</h5>
      <ul className="mini-list">{subCatAllList}</ul>
    </div>
  );
}

export default MiniList;
