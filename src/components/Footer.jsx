import { Link } from "gatsby";
import React, { Component } from "react";

import "../scss/Footer.scss";

class Footer extends Component {
  constructor() {
    super();

    this.state = {
      scrollDown: false,
      footer: null,
      updated: null,
      touchStartX: null,
      touchStartY: null,
    };
  }

  componentDidMount() {
    this.setState({ footer: document.getElementById("footer") });

    window.onwheel = (e) => {
      this.handleScroll(e);
    };

    window.ontouchstart = (e) => {
      this.handleTouchStart(e);
    };

    window.ontouchmove = (e) => {
      this.handleTouchMove(e);
    };
  }

  handleScroll = (e) => {
    const xMove = e.deltaX;
    const yMove = e.deltaY;

    // Excludes X moves
    if (Math.abs(yMove) > Math.abs(xMove)) {
      this.setState({ scrollDown: e.deltaY > 0 });
    }

    this.toggleFooter();
    // FIX: need a working requestAnimationFrame setup!
    // if (!this.state.updated) window.requestAnimationFrame(this.toggleFooter);
    // this.setState({ updated: true });

    // reset checks
    this.setState({ scrollDown: null });
  };

  handleTouchStart = (e) => {
    this.setState({
      touchStartX: e.touches[0].screenX,
      touchStartY: e.touches[0].screenY,
    });
  };

  handleTouchMove = (e) => {
    if (!this.state.touchStartY) return;

    const xUp = e.touches[0].screenX;
    const yUp = e.touches[0].screenY;
    const xDiff = this.state.touchStartX - xUp;
    const yDiff = this.state.touchStartY - yUp;

    if (Math.abs(yDiff) > Math.abs(xDiff)) {
      this.setState({ scrollDown: yDiff > 0 });
    }

    this.toggleFooter();
    this.setState({ updated: true });
    this.setState({ touchStartX: null, touchStartY: null, scrollDown: null });
  };

  isPageBottom = () => {
    return window.innerHeight + window.scrollY >= document.body.offsetHeight;
  };

  toggleFooter = () => {
    if (this.state.scrollDown && this.isPageBottom()) {
      this.show(this.state.footer);
    } else if (!this.state.scrollDown) {
      this.hide(this.state.footer);
    }

    // this.setState({ updated: false });
  };

  show = (el) => {
    if (el.classList.contains("footer-hide")) {
      el.classList.remove("footer-hide");
      el.classList.add("footer-show");
    }
  };

  hide = (el) => {
    if (el.classList.contains("footer-show") || !el.classList.contains("footer-hide")) {
      el.classList.remove("footer-show");
      el.classList.add("footer-hide");
    }
  };

  render() {
    return (
      <footer className="d-flex flex-row w-100 footer-hide justify-content-between" id="footer">
        <p className="mb-1 col-12 col-sm text-nowrap">
          <small>
            Olympia Bukkakis &copy; {new Date().getFullYear()} &middot; <Link to="/privacy">Privacy Policy</Link>{" "}
            &middot; <Link to="/imprint">Imprint</Link>
          </small>
        </p>
        <p className="footer-credit">
          <small>
            Website by{" "}
            <a rel="noopener noreferrer" className="text-nowrap" href="https://vincentreynaud.de/" target="_blank">
              Vincent Reynaud
            </a>
          </small>
        </p>
      </footer>
    );
  }
}

export default Footer;
