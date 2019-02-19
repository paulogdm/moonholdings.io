import styled from 'styled-components';

export const PortfolioBalance = styled.div`
  position: fixed;
  top: 1rem;
  right: 2rem;
  height: 10rem;
  font-size: 5rem;
  color: ${props => props.theme.apricot};
`

export const PortfolioContainer = styled.div`
  z-index: 1;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  flex-flow: row wrap;
  flex-direction: row;
  align-content: stretch;
  position: relative;
  top: 10rem;
  padding: 30px;
  margin-bottom: 160px;
`
