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
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  position: relative;
  top: 10rem;
  z-index: 1;
  display: flex;
  flex-flow: row wrap;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: stretch;
  padding: 20px;
  margin-bottom: 160px;
`
