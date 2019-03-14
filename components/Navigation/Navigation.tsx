import React from 'react'

import { NavContainer, Nav, NavLink, NavActive, NavDisabled } from '../../styles'

interface IProps {
  path: string;
}

export class Navigation extends React.Component<IProps> {
  render() {
    const { path } = this.props;
    const NavPortfolio = path === 'portfolio' ? NavActive : NavLink;
    const NavAbout = path === 'about' ? NavActive : NavLink;

    return (
      <NavContainer>
        <Nav>
          <ol>
            <li><NavPortfolio href="/">Portfolio</NavPortfolio></li>
            <li><NavAbout href="/about">About</NavAbout></li>
            <li><NavDisabled title="Moon Ranks coming">Moon Ranks</NavDisabled></li>
          </ol>
        </Nav>
      </NavContainer>
    );
  }
}
