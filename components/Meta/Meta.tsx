import React from 'react'
import Head from 'next/head'

import { moonHoldings } from '../../shared/models'

export default () => (
  <Head>
    <title>{moonHoldings}</title>
    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
    <meta name="description" content="Your Cryptocurrency Portfolio"/>
    <meta name="keywords" content="cryptocurrency, crypto, portfolio, bitcoin, ethereum, holdings"/>
    <meta name="robots" content="index, follow"/>
    <meta name="owner" content="https://twitter.com/leongaban"/>
    <meta name="url" content="https://moon.holdings"/>
    <meta name="identifier-URL" content="https://moon.holdings"/>
    <meta name="category" content="finance"/>
    <meta name="rating" content="General"/>
    <meta name="revisit-after" content="7 days"></meta>

    <meta name="og:title" content={moonHoldings}/>
    <meta name="og:type" content="app"/>
    <meta name="og:url" content="https://moon.holdings"/>
    <meta name="og:image" content="https://moon.holdings/static/logo.png"/>
    <meta name="og:site_name" content={moonHoldings}/>
    <meta name="og:description" content="Your Cryptocurrency Portfolio"/>

    <meta name="twitter:title" content={moonHoldings}/>
    <meta name="twitter:description" content="Your Cryptocurrency Portfolio"/>
    <meta name="twitter:image" content="https://moon.holdings/static/twittercard.png"/>
    <meta name="twitter:card" content="https://moon.holdings/static/twittercard.png"></meta>

    <link rel="icon" type="image/x-icon" href="static/favicon.ico"/>
    <link rel="apple-touch-icon" sizes="180x180" href="static/apple-icon-180x180.png"/>
    <link rel="icon" type="image/png" sizes="192x192"  href="static/android-icon-192x192.png"/>
    <link href="https://fonts.googleapis.com/css?family=Abel|Overpass:200,700" rel="stylesheet"></link>
  </Head>
)
