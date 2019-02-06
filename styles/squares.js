import styled from 'styled-components'

export const SquareShade = styled.section`
  position: relative;
  top: -22px;
  left: -22px;
  padding: 10px;
  width: 192px;
  height: 192px;
  border-top: 1px solid rgba(256, 256, 256, .125);
  border-right: 1px solid rgba(256, 256, 256, .125);
  border-bottom: 1px solid rgba(0, 0, 0, .125);
  border-left: 1px solid rgba(0, 0, 0, .125);
`;

export const CoinSquare = styled.div`
  flex-grow: 1;
  box-sizing: content-box;
  position: relative;
  align-self: auto;
  padding: 20px 20px 0;
  /* margin: 0 1px 20px 0; */
  max-width: 170px;
  min-width: 170px;
  max-height: 190px;
  min-height: 190px;
  font-size: em(14);
  color: #fff;
  background: $lightGray;
  border: 2px solid rgba(87, 56, 92, 0);
  box-shadow: 1px 1px 0 rgba(47, 38, 90, 0.2),
              2px 2px 2px rgba(47, 38, 90, 0.1);
  cursor: pointer;

  &:hover {
    transition: all 200ms ease-in-out;
    border: 2px solid ${props => props.theme.offWhite};
    opacity: 0.8;
  }

  em {
    font-style: normal;
    opacity: 0.7;
  }

  p { font-weight: 200; }
`;

export const CoinStat = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 0 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  h1 {
    font-size: 1.5rem;
    line-height: 0;
  }

  h4 { line-height: 0.15rem; }

  p { margin: 0; }
`;

export const CoinRank = styled(CoinStat)`
  margin-bottom: 1rem;
  border-bottom: none;
`;
