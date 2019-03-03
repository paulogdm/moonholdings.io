import React from 'react'

import { MOON_HOLDINGS } from '../../shared/constants/copy'
import { WelcomeContainer, WelcomeMessage } from '../../styles'

export default class Board extends React.Component {
  render() {
    return (
      <WelcomeContainer>
        <WelcomeMessage>
          <h1>{MOON_HOLDINGS}</h1>
          <h4>A Futuratum Project</h4>
          <h2>Click the <span>+</span> button to create your portfolio.</h2>
        </WelcomeMessage>
      </WelcomeContainer>
    );
  }
}
