import React, { Component } from 'react';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';

import Meta from '../components/Meta';
import { page } from '../styles';
import './global.scss';

const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  apricot: '#FEBE7E',
  margin: 0,
  padding: 0,
};

const { StyledPage, Inner } = page;

injectGlobal`
  html {
    height: 100%;
    box-sizing: border-box;
    font-size: 10px;
  }

  *, *:before, *:after  {
    box-sizing: inherit;
  }

  body {
    display: flex;
    overflow-y: auto;
    margin: 0;
    padding: 0;
    font-size: 1.5rem;
    line-height: 2;
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
        <StyledPage className="app-bg">
          <Meta />
          <Inner>{this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    )
  }
}
