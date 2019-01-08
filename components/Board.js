import React from 'react';
import styled from 'styled-components';

import Welcome from './Welcome';

const StyledBoard = styled.div`
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
    return (
      <StyledBoard>
        <Welcome />
        {/* <PlusButton toggleSearch={this.handleSearchButton} /> */}
        {/* <Affiliates /> */}
        {/* <Nomics /> */}
        {/* <Astronaut logo={isTrue} /> */}
      </StyledBoard>
    );
  }
}

export default Board;
