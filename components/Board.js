import React from 'react';
import styled from 'styled-components';

import Welcome from './Welcome';
import Astronaut from './Astronaut';

const StyledBoard = styled.div`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
`;

class Board extends React.Component {
  constructor(props) {
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
        {/* <Nomics /> */}
        <Astronaut showLogo={hasPortfolio} />
      </StyledBoard>
    );
  }
}

export default Board;
