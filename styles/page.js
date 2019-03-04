import styled from 'styled-components';

export const StyledPage = styled.div`
  display: flex;
  color: ${props => props.theme.offWhite};
`

export const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  width: 100%;
`
