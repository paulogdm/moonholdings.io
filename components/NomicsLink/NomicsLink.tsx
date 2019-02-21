import React from 'react'
import styled from 'styled-components'

import { NOMICS_LINK } from '../../shared/constants/copy'

export const Link = styled.p`
  position: absolute;
  z-index: 10;
  bottom: 0.4rem;
  right: 300px;
  width: 100%;
  font-size: 1rem;
  text-align: right;
  cursor: pointer;

  a {
    color: ${(props) => props.theme.apricot};
    cursor: pointer;

    &:hover { color: ${(props) => props.theme.offWhite}; }
  }
`;

export default class NomicsLink extends React.Component {
  render() {
    return (<Link>Powered by <a href={NOMICS_LINK} target="blank">Nomics APIs.</a></Link>)
  }
}
