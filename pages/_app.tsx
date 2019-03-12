import React from 'react'
import { Provider } from 'react-redux'
import Router, { SingletonRouter } from 'next/router'
import App, { Container } from 'next/app'
import withReduxStore from '../lib/withReduxStore'
import { ThemeProvider } from 'styled-components'

import Page from '../components/Page/Page'
import { Theme, Nav, NavLink, NavActive, NavDisabled } from '../styles'
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
    this.state = { path: '' }
  }

  componentDidMount() {
    const path = pathIs(pluckRoute(Router));
    this.setState({ path });
  }

  render() {
    const { Component, reduxStore } = this.props;
    const { path } = this.state;
   
    const NavPortfolio = path === 'portfolio' ? NavActive : NavLink;
    const NavAbout = path === 'about' ? NavActive : NavLink;

    return (
      <ThemeProvider theme={Theme}>
        <Container>
          <Provider store={reduxStore}>
            <Page>
              <Nav>
                <ol>
                  <li><NavPortfolio href="/">Portfolio</NavPortfolio></li>
                  <li><NavAbout href="/about">About</NavAbout></li>
                  <li><NavDisabled title="Moon Ranks coming">Moon Ranks</NavDisabled></li>
                </ol>
              </Nav>
              <Component />
            </Page>
          </Provider>
        </Container>
      </ThemeProvider>
    );
  }
}

export default withReduxStore(MoonApp);
