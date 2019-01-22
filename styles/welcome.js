import styled from 'styled-components';

export const WelcomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;
  position: fixed;
  width: 100%;
  height: 100%;
`;

export const WelcomeMessage = styled.div`
  height: 200px;
  font-size: 1.5rem;
  line-height: 2;

  h1 {
    margin: 10px 0 0;
    height: 9rem;
    font-size: 5.5rem;
  }

  h2 {
    font-size: 2.1rem;
    text-align: center;
  }

  h4 {
    margin: 0;
    text-align: right;
    font-size: 1.5rem;
  }

  span {
    color: ${props => props.theme.apricot};
  }
`;
