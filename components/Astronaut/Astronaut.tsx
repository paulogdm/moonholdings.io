import React from 'react'

import { MOON_HOLDINGS } from '../../shared/constants/copy'
import { AstronautContainer, Heading } from '../../styles'

interface LogoCheck {
  showLogo: boolean;
}

export default (showLogo: LogoCheck) =>  (
  <AstronautContainer>
    { showLogo.showLogo === true ? <Heading>{MOON_HOLDINGS}</Heading> : null }
    <img src="static/astronaut.png" alt="astronaut" />
  </AstronautContainer>
);
