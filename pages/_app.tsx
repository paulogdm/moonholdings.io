import React from 'react'
import { Provider } from 'react-redux'
import Router, { SingletonRouter } from 'next/router'
import App, { Container } from 'next/app'
import withReduxStore from '../lib/withReduxStore'
import { ThemeProvider } from 'styled-components'

import { Page, Balance, Navigation } from '../components'
import { Theme } from '../styles'
import '../styles/global.scss'

interface IProps {
  Component: any;
  reduxStore: any;
  pageProps: any;
  router: any;
}

interface IState {
  path: string;
}

const pluckRoute = (Router: SingletonRouter) => Router && Router.router ? Router.pathname : '/';

const pathIs = (path: string) => {
  switch (path) {
    case '/': return 'portfolio';
    case '/about': return 'about';
    default: return 'portfolio';
  }
}

class MoonApp extends App<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { path: '' };
  }

  componentDidMount() {
    const path = pathIs(pluckRoute(Router));
    this.setState({ path });
  }

  render() {
    const { Component, reduxStore } = this.props;
    const { path } = this.state;

    return (
      <ThemeProvider theme={Theme}>
        <Container>
          <Provider store={reduxStore}>
            <Page>
              { path === 'portfolio' && <Balance /> }
              <Navigation path={path}/>
              <Component />
            </Page>
          </Provider>
        </Container>
      </ThemeProvider>
    );
  }
}

export default withReduxStore(MoonApp);
