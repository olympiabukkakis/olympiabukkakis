import React from "react";
import { isBrowser } from "../helpers/esm";

function ToTop() {
  return (
    <button className="to-top bottom right" onClick={() => {
      if (isBrowser()) {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M277.375 427V167.296l119.702 119.702L427 256 256 85 85 256l29.924 29.922 119.701-118.626V427h42.75z" />
      </svg>
    </button>
  );
}

export default ToTop;
