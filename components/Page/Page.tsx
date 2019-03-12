import React, { Component } from 'react'

import Meta from '../Meta/Meta'
import { StyledPage, Inner } from '../../styles'

export default class Page extends Component {
  render() {
    return (
      <StyledPage>
        <Meta />
        <Inner>{this.props.children}</Inner>
      </StyledPage>
    )
  }
}
