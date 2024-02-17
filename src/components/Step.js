import React from "react";

function Step({ id, heading, image, item }) {
  return (
    <div>
      <img src={image} alt="i" />
      <div className="questions-details">
        <h5>{heading}</h5>
        {item?.map((item) => (
          <div key={item.id}>
            <input type={item.type}   id={item.id} name={item.name} />
            <label htmlFor={item.id}>{item.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Step;
