import React from 'react'

import { OverlayStyle } from '../../styles'

interface IProps {
  handleClick(): void;
}

export const Overlay = (props: IProps) => <OverlayStyle onClick={props.handleClick} />;
