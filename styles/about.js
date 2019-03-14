import styled from 'styled-components';

export const AboutContainer = styled.div`
  position: relative;
  z-index: 2;
  top: 2rem;
  padding: 30px;
  max-width: 600px;

  h1 { font-family: Oswald; font-weight: 300; }
  p { font-size: 1.15rem; }
  span { color: ${props => props.theme.apricot}; }
`

export const TeamImages = styled.section`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-flow: row wrap;
  flex-direction: row;

  h4 {
    margin: 0.25rem 0;
    font-size: 1rem;
    color: ${props => props.theme.brightPurple};
  }

  p {
    width: 200px;
    font-size: 0.9rem;
    line-height: 1.25rem;
  }
`

export const TeamImg = styled.img`
  border: 3px solid ${props => props.theme.brightPurple};
`
export const TeamDiv = styled.div`width: 50%;`

export const TeamSocial = styled.div`
  margin-top: 1rem;
  img { margin: 0 0.5rem 0 0; }
`
