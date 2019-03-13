import styled from 'styled-components'

export const NavContainer = styled.div`
  position: fixed;
  z-index: 3;
  width: 100%;
  height: 5rem;
  background-color: rgba(62,31,67, 0.5);
  /* background: ${props => props.theme.darkestPurple}; */
`

export const Nav = styled.nav`
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
