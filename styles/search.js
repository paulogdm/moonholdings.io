import styled from 'styled-components'

export const SearchContainerDiv = styled.div`
  z-index: 11;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  bottom: 180px;
  left: 30px;
  padding: 1.5rem;
  width: 400px;
  height: 670px;
  border-top: 1px solid rgba(256, 256, 256, .125);
  border-right: 1px solid rgba(256, 256, 256, .125);
  border-bottom: 1px solid rgba(0, 0, 0, .125);
  border-left: 1px solid rgba(0, 0, 0, .125);
  background: ${props => props.theme.lightPurple};
`;

export const SelectedAssetStyle = styled.div`
  padding-left: 1rem;
  width: 100%;
  height: 3rem;
  font-size: 1.5rem;
  line-height: 3rem;
  border: 1px solid ${props => props.theme.darkPurple};

  em {
    font-style: normal;
    color: ${props => props.theme.apricot};
  }

  button {
    float: right;
    margin: 0.7rem 1rem 0 0;
    height: 1.5rem;
    font-size: 0.8rem;
  }
`

export const SearchSection = styled.section`
  input {
    padding-left: 1rem;
    width: 100%;
    height: 3rem;
    font-size: 1.5rem;
    color: ${props => props.theme.darkPurple};
    background: ${props => props.theme.offWhite};
    border: 1px solid ${props => props.theme.darkPurple};
    outline-width: 0;

    &::placeholder { color: ${props => props.theme.darkPurple}; }
  }
`

export const SearchListStyle = styled.ul`
  overflow-y: scroll;
  margin: 1rem 0 0;
  padding: 0;
  height: 310px;

  &::-webkit-scrollbar { width: 1em; }

  &::-webkit-scrollbar-track {
    background: ${props => props.theme.darkPurple};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.apricot};
    cursor: pointer;
  }

  li {
    padding: 0.5rem 0.5rem 0.5rem 1rem;
    font-size: 1.2rem;
    line-height: 1rem;
    list-style: none;
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

  p { display: inline; margin: 0 0.5rem 0 0; }

  span { color: ${props => props.theme.apricot}; }

  em {
    float: right;
    font-size: 1.2rem;
    font-style: normal;
    color: ${props => props.theme.black};
  }
`

export const SearchButtons = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  button {
    margin-bottom: 1rem;
    height: 4rem;
    font-size: 1.2rem;

    &:last-child { margin-bottom: 0; }
  }
`;

export const SearchSelectContainer = styled.section`
  h2 {
    margin: 1rem 0 0 0;
    font-size: 1rem;
    color: ${props => props.theme.offWhite};

    span { color: ${props => props.theme.apricot}; }
  }
`;

export const SearchSelectStyle = styled.select`
  margin-top: 0.5rem;
  text-indent: 0.5rem;
  width: 100%;
  height: 3rem;
  font-size: 1rem;
  color: #fff;
  border: 1px solid ${props => props.theme.darkPurple};
  background: ${props => props.theme.brightPurple};
  cursor: pointer;
`

export const LoaderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const SearchListLoader = styled(LoaderDiv)`
  width: 330px;
  height: 300px;
`

export const SearchSelectLoader = styled(LoaderDiv)`
  width: 350px;
  height: 300px;
`
export const SquareContainer = styled.div`width: 245px;`

export const SearchSelectAsset = styled.section`
  h2 { margin: 1.5rem 0; font-size: 1rem; }

  li {
    margin-left: 0;
    list-style: none;
    font-size: 1.2rem;

    &:first-child { font-size: 1.5rem; }
  }
`
