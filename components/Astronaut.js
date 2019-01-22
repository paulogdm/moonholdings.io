import React from 'react';

import { astronaut } from '../styles';

const { AstronautContainer, Heading } = astronaut;

export default ({ showLogo }) => (
  <AstronautContainer>
    { showLogo === true ? <Heading>MOON.HOLDINGS</Heading> : null }
    <img src="static/astronaut.png" alt="astronaut" />
  </AstronautContainer>
);
