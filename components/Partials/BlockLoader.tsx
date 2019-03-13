import React from 'react'

import styled from 'styled-components'

export const Block = styled.div`
  position: absolute;
  z-index: 100;
  margin: 100px auto;
  width: 40px;
  height: 40px;
  background: ${props => props.theme.apricot};
`

export const BlockLoader = () => <Block className="block-spin"></Block>;
