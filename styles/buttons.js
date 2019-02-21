import styled from 'styled-components'

export const FunctionButton = styled.button`
  color: ${props => props.theme.apricot};
  border: 1px solid ${props => props.theme.brightPurple};
  background: ${props => props.theme.darkPurple};
  transition: all 200ms ease-in-out;
  outline-width: 0;

  &:hover {
    color: ${props => props.theme.darkPurple};
    border: 1px solid ${props => props.theme.offWhite};
    background: ${props => props.theme.apricot};
  }

  &:active {
    transition: all 0ms ease-in-out;
    color: ${props => props.theme.offWhite};
    border: 1px solid ${props => props.theme.brightPurple};
    background: ${props => props.theme.brightPurple};
  }

  &:disabled {
    cursor: not-allowed;
    -webkit-user-select: none;
    user-select: none;
    opacity: 0.5;
    color: ${props => props.theme.lightGrey};
    border: 1px solid ${props => props.theme.grey};
    background: ${props => props.theme.grey};
  }
`

export const CommonButton = styled.button`
  color: ${props => props.theme.grey};
  border: 1px solid ${props => props.theme.offWhite};
  background: ${props => props.theme.lightGrey};

  &:hover {  
    color: #fff;
    border: 1px solid ${props => props.theme.midGray};
    background: ${props => props.theme.grey};
  }

  &:active {
    transition: all 0ms ease-in-out;
    color: ${props => props.theme.black};
    border: 1px solid ${props => props.theme.brightPurple};
    background: ${props => props.theme.offWhite};
  }
`
