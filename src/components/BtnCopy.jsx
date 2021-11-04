import React, { Component } from "react";
import classnames from "classnames";

class BtnCopy extends Component {
  state = {
    tooltip: null,
  };

  componentDidMount() {
    this.state.tooltip = document.querySelector(".tooltip");
  }

  toggle = (el) => {
    this.show(el);
    setTimeout(() => {
      this.hide(el);
    }, 3200);
  };

  // duplicates !!!!
  hide = (el) => {
    if (el.classList.contains("show") || !el.classList.contains("hide")) {
      el.classList.remove("show");
      el.classList.add("hide");
    }
  };

  show = (el) => {
    if (el.classList.contains("hide")) {
      el.classList.remove("hide");
      el.classList.add("show");
    }
  };

  render() {
    const { children, copyItem } = this.props;

    return (
      <>
        <button
          id="btn-copy"
          onClick={() => {
            console.log(copyItem);
            this.toggle(this.state.tooltip);
            navigator.clipboard.writeText(copyItem).then(
              () => console.log("copied!"),
              (err) => console.error(err)
            );
          }}
        >
          {children}
        </button>
        <span className="tooltip hide">
          <small>Copied to clipboard!</small>
        </span>
      </>
    );
  }
}

export default BtnCopy;

// console.log(e.target.closest(".btn-copy"));
// e.target.closest(".btn-copy").tooltip({ trigger: "click" });
