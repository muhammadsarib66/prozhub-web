import React from "react";

function InputField({ value, type, placeholder, id, label, onChange  }) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
        value={value}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default InputField;
