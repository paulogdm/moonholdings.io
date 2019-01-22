import React from 'react';
import styled from 'styled-components';

import Welcome from './Welcome';
import Astronaut from './Astronaut';
import NomicsLink from './NomicsLink';

interface IState {
  portfolio: [];
  loading: boolean;
}

const StyledBoard = styled.div`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
`;

class Board extends React.Component<{}, IState> {
  constructor(props: IState) {
    super(props);

    this.state = {
      portfolio: [],
      loading: true
    };
  }

  render() {
    const { portfolio } = this.state;
    const hasPortfolio = portfolio.length > 0;

    return (
      <StyledBoard>
        <Welcome />
        {/* <PlusButton toggleSearch={this.handleSearchButton} /> */}
        {/* <Affiliates /> */}
        <NomicsLink />
        <Astronaut showLogo={hasPortfolio} />
      </StyledBoard>
    );
  }
}

export default Board;
