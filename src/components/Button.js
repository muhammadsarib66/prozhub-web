import React from "react";
import "../styles/Login.css";
function Button({ title, onClick, type }) {
  return (
    <div>
      <button onClick={onClick} className="login-btn" type={type}>
        {title}
      </button>
    </div>
  );
}

export default Button;
