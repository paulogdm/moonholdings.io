import styled from 'styled-components'

export const SearchContainerDiv = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  bottom: 180px;
  left: 30px;
  padding: 1.5rem;
  width: 800px;
  height: 420px;
  border-top: 1px solid rgba(256, 256, 256, .125);
  border-right: 1px solid rgba(256, 256, 256, .125);
  border-bottom: 1px solid rgba(0, 0, 0, .125);
  border-left: 1px solid rgba(0, 0, 0, .125);
  background: ${props => props.theme.lightPurple};
`;

export const SearchSection = styled.section`
  width: 50%;

  input {
    width: 100%;
    height: 3rem;
    font-size: 1.5rem;
    padding-left: 1rem;
    color: ${props => props.theme.darkPurple};
    background: ${props => props.theme.brightPurple};
    border: 1px solid ${props => props.theme.darkPurple};
    outline-width: 0;

    &::placeholder { color: ${props => props.theme.darkPurple}; }
  }
`

export const SearchList = styled.ul`
  overflow-y: scroll;
  margin: 1rem 0 0;
  padding: 0;
  height: 310px;

  &::-webkit-scrollbar { width: 1em; }

  &::-webkit-scrollbar-track { background: ${props => props.theme.darkPurple}; }

  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.apricot};
    cursor: pointer;
  }

  li {
    padding: 0.5rem 0.5rem 0.5rem 1rem;
    list-style: none;
    font-size: 1.2rem;
    outline-width: 0;
    cursor: pointer;

    &:hover {
      transition: background 150ms ease-in-out;
      color: ${props => props.theme.darkPurple};
      background: ${props => props.theme.brightPurple};
    }

    &:active {
      color: ${props => props.theme.darkPurple};
      background: ${props => props.theme.apricot};
    }
  }

  p {
    display: inline;
    margin: 0 0.5rem 0 0;
  }

  span { color: ${props => props.theme.apricot}; }

  em {
    float: right;
    font-size: 1.2rem;
    font-style: normal;
    color: ${props => props.theme.black};
  }
`

export const SearchButtons = styled.section`
  margin-left: 2rem;
  width: 50%;
`;
