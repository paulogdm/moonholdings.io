import React from 'react';
import styled from 'styled-components';

const StyledBoard = styled.div`
  #board {
    /* margin: 0;
    padding: 0;
    width: 100%;
    height: 100%; */
    /* background: rgba(87, 56, 92, 0.85); */
  }
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
        <div id="board">
          <div id="welcome-container">
            <section id="welcome-msg">
              <h1>MOONHOLDINGS</h1>
              <h4>A Futuratum Project</h4>
              <h2>Click the <span className="plus">+</span> button to create your portfolio.</h2>
            </section>
          </div>
          {/* <PlusButton toggleSearch={this.handleSearchButton} /> */}
          {/* <Affiliates /> */}
          {/* <Nomics /> */}
          {/* <Astronaut logo={isTrue} /> */}
        </div>
      </StyledBoard>
    );
  }
}

export default Board;
