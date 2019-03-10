import React from 'react';

import Document from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  // @ts-ignore
  static async getInitialProps (ctx) {
    const sheet = new ServerStyleSheet();
    const { originalUrl } = ctx.req || {};
    console.log('originalUrl', originalUrl);

    const originalRenderPage = ctx.renderPage
    ctx.renderPage = () =>
      originalRenderPage({
        // @ts-ignore
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
      })

    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      originalUrl,
      styles: [...initialProps.styles, ...sheet.getStyleElement()]
    }
  }
}
