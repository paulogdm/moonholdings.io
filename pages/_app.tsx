import React from 'react'

import App, { Container } from 'next/app'
import Page from '../components/Page/Page'

class MoonApp extends App {
  render() {
    const { Component } = this.props;

    return (
      <Container>
        <Page>
          <Component />
        </Page>
      </Container>
    )
  }
}

export default MoonApp;
