import React from "react";

export default function FormInput({ name, placeholder, label, ...rest }) {
  return (
    <div className="flex flex-col-reverse" id="email">
      <input
        id={name}
        name={name}
        className="bg-transparent rounded border-2 
              dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary p-1
              dark:text-white text-secondary w-full text-lg outline-none peer transition"
        placeholder={placeholder}
        {...rest}
      />
      <label
        className="font-semibold dark:text-dark-subtle text-light-subtle dark:peer-focus:text-white peer-focus:text-secondary transition"
        htmlFor="email"
      >
        {label}
      </label>
    </div>
  );
}
