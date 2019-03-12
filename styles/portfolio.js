import styled from 'styled-components';

export const PortfolioWrapper = styled.div`
  z-index: 2;
`

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
  flex-flow: row wrap;
  flex-direction: row;
  align-content: stretch;
  margin-bottom: 2rem;
  position: relative;
  top: 5rem;
  padding: 30px;
`

export const WatchlistContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  flex-flow: row wrap;
  flex-direction: row;
  align-content: stretch;
  position: relative;
  padding: 30px;
`
