import React from 'react';
import {Navbar,NavbarBrand,Nav,NavItem,NavLink} from 'reactstrap';
const appHeader = props => {
  return(
    <div>
      <Navbar color="faded" light expand="md">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/posts">Posts</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/create">Create Posts</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  )
}
export default appHeader;