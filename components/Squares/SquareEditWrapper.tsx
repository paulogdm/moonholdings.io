import React from 'react'

import { SquareEdit } from '../../components'
import { IAsset } from '../../shared/types'
import { EditSquareWrapper } from '../../styles'

interface IProps {
  coin: IAsset;
  toggle(toggle: boolean, coin?: IAsset): void;
}

export const SquareEditWrapper = (props: IProps) => {
  return (
    <EditSquareWrapper>
      <SquareEdit coin={props.coin} toggle={props.toggle} />
    </EditSquareWrapper>
  );
}
