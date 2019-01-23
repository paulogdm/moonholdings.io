import styled from 'styled-components';

export const PlusButtonStyle = styled.button`
  position: fixed;
  z-index: 9;
  bottom: 2rem;
  left: 2rem;
  padding-top: 2rem;
  width: 14rem;
  height: 14rem;
  text-align: center;
  background: rgba(87, 56, 92, 0.85);
  border: 2px solid rgba(87, 56, 92, 0);
  transition: ${props => props.theme.transitionAll};
  cursor: pointer;

  h1 {
    margin: 0;
    height: 2rem;
    font-family: 'Abel', sans-serif;
    font-size: 2rem;
    color: ${props => props.theme.offWhite};
  }

  span {
    font-size: 7rem;
    line-height: 7rem;
  }

  :hover {
    background: ${props => props.theme.apricot};
    border: 2px solid ${props => props.theme.brightPurple};
    h1 { color: ${props => props.theme.darkPurple}; }
    span { color: #fff }
  }

  :active {
    background: none;
    h1 { color: #fff; }
    span { color: ${props => props.theme.apricot}; }
  }
`
