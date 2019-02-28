import React, { Component } from 'react'
import { ThemeProvider, injectGlobal } from 'styled-components'

import Meta from '../Meta/Meta'
import { Theme, StyledPage, Inner } from '../../styles'
import '../global.scss'

injectGlobal`
  a {
    text-decoration: none;
    color: ${Theme.offWhite};
  }
`;

export default class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={Theme}>
        <StyledPage>
          <Meta />
          <Inner>{this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    )
  }
}
