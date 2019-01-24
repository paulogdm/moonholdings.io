import React from 'react'

import { moonHoldings } from '../../shared/models'
import { welcome } from '../../styles'

const { WelcomeContainer, WelcomeMessage } = welcome;

export default class Board extends React.Component {
  render() {
    return (
      <WelcomeContainer>
        <WelcomeMessage>
          <h1>{moonHoldings}</h1>
          <h4>A Futuratum Project</h4>
          <h2>Click the <span>+</span> button to create your portfolio.</h2>
        </WelcomeMessage>
      </WelcomeContainer>
    );
  }
}
