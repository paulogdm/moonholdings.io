import React from 'react'

import { OverlayStyle } from '../../styles'

interface IProps {
  handleClick(): void;
}

export default class Overlay extends React.PureComponent<IProps> {
  public render() {
    return (
      <OverlayStyle onClick={this.props.handleClick} />
    );
  }
}
