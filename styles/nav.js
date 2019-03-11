import styled from 'styled-components'

export const Nav = styled.div`
  width: 300px;

  ol {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 30px 0 0 0;
  }

  li { margin-right: 1.5rem; list-style: none; }
`

export const NavLink = styled.a`
  color: ${props => props.theme.apricot};
  border: none;
  &:hover { color: ${props => props.theme.offWhite}; }
`

export const NavActive = styled(NavLink)`
  color: ${props => props.theme.offWhite};
  border-bottom: 2px solid ${props => props.theme.apricot};
`

export const NavDisabled = styled(NavLink)`
  color: ${props => props.theme.darkPurple};
  &:hover { color: ${props => props.theme.darkPurple}; }
  cursor: not-allowed;
`
