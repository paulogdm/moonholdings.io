import React from 'react';
import { bind } from 'decko';
import styled from 'styled-components';

import { Welcome, Astronaut, NomicsLink, PlusButton } from './';

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
        <PlusButton toggleSearch={this.handleOnSearch} />
        <NomicsLink />
        <Astronaut showLogo={hasPortfolio} />
      </StyledBoard>
    );
  }

  @bind
  private handleOnSearch() {
    console.log('handleSearchButton...');
  }
}

export default Board;
