import React from 'react';

import { moonHoldings } from '../shared/models';
import { astronaut } from '../styles';

const { AstronautContainer, Heading } = astronaut;

interface LogoCheck {
  showLogo: boolean;
}

export default (showLogo: LogoCheck) =>  (
  <AstronautContainer>
    { showLogo.showLogo === true ? <Heading>{moonHoldings}</Heading> : null }
    <img src="static/astronaut.png" alt="astronaut" />
  </AstronautContainer>
);
