import React from 'react'

class Header extends React.Component {
  render() {
    // @TODO: Add logo
    const logo = '';
    return (
      <header>
        <img src={logo} alt="logo" />
        <h1 id="app-name">Engine Design Tool</h1>
      </header>
    );
  }
}

export default Header;