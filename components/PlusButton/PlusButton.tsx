import React from 'react'

import { PlusButtonStyle } from '../../styles/plusButton'

interface IProps {
  toggleSearch(): void;
}

export default class PlusButton extends React.PureComponent<IProps> {
  public render() {
    return (
      <PlusButtonStyle tabIndex={0} onClick={this.props.toggleSearch}>
        <span>+</span>
        <h1>Add Asset</h1>
      </PlusButtonStyle>
    );
  }
}
