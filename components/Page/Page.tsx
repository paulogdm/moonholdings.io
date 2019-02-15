import React, { Component } from 'react'
import { ThemeProvider, injectGlobal } from 'styled-components'

import Meta from '../Meta/Meta'
import { StyledPage, Inner } from '../../styles'
import '../global.scss'

const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  midGray: '#515151',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  apricot: '#FEBE7E',
  brightPurple: '#B987C0',
  lightPurple: '#8F6894',
  darkPurple: '#57385C',
  margin: 0,
  padding: 0,
  transitionAll: 'all .2s ease-in-out',
};

injectGlobal`
  html {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    font-size: 16px;
  }

  *, *:before, *:after  {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Abel', sans-serif;
  }

  a {
    text-decoration: none;
    color: ${theme.offWhite};
  }
`;

export default class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Inner>{this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    )
  }
}
