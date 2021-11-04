import React, { Component } from "react";
import { Link } from "gatsby";
import Scrollspy from "react-scrollspy";
import classnames from "classnames";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from "reactstrap";

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  toggleActiveClass = (e) => {
    e.target.classList.includes("active") ? e.target.classList.remove("active") : e.target.classList.add("active");
  };

  render() {
    const { title, hideNav = false, scaleUp } = this.props;
    // use window.location.href to remove font-size transition
    // const workRegex = new RegExp(/work/, "i");
    // const workIsActive = workRegex.test(window.location.href);
    // const aboutIsActive = window.location.href.includes(/\/about$/i);
    // const eventsIsActive = window.location.href.includes(/events/i);

    return (
      <Navbar expand="xl" className="flex-column align-items-start">
        <div className="d-flex justify-content-between align-items-center w-100">
          <NavbarBrand style={scaleUp ? { fontSize: "7.2rem", left: "12vw" } : {}} href="/about">
            {title}
          </NavbarBrand>
          <NavbarToggler className="nav-link top right" onClick={this.toggle}>
            MENU
          </NavbarToggler>
        </div>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="navbar-nav ml-auto nav-list">
            <NavItem>
              <Link
                className={classnames({ "nav-link": true, bottom: true, hide: hideNav })}
                to="/#work"
                activeClassName="active"
                partiallyActive={true}
              >
                Work
              </Link>
            </NavItem>
            <NavItem>
              <Link
                className={classnames({ "nav-link": true, top: true, hide: hideNav })}
                to="/events"
                activeClassName="active"
                partiallyActive={true}
              >
                Events
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Navigation;

// <Scrollspy items={["work", "events", "about"]} currentClassName="active" offset={800}>
// </Scrollspy>

// {links.map((link, i) => (
//   <NavItem key={i}>
//     <Link className="nav-link" to={`/${links[i]}`} activeClassName="active">
//       {capitalise(link)}
//     </Link>
//   </NavItem>
// ))}
