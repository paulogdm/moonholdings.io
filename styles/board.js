import styled from 'styled-components'
import { FadeIn } from './animations'

export const StyledBoard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  width: 100%;
`

export const OverlayStyle = styled.div`
  position: fixed;
  z-index: 10;
  animation: ${FadeIn} .5s;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .6);
  cursor: pointer;
`
