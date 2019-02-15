import React from 'react'
import App, { Container } from 'next/app'
import withReduxStore from '../lib/withReduxStore'
import { Provider } from 'react-redux'

import Page from '../components/Page/Page'

interface IProps {
  reduxStore: any;
}

class MoonApp extends App<IProps> {
  render() {
    const { Component, reduxStore } = this.props;

    return (
      <Container>
        <Provider store={reduxStore}>
          <Page>
            <Component />
          </Page>
        </Provider>
      </Container>
    )
  }
}

export default withReduxStore(MoonApp);
