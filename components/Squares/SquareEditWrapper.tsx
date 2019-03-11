import React from 'react'

import { SquareEdit } from '../../components'
import { IAsset } from '../../shared/types'
import { EditSquareWrapper } from '../../styles'

interface IProps {
  coin: IAsset;
  editWatchCoin: boolean;
  portfolio: IAsset[];
  toggle(toggle: boolean, coin?: IAsset): void;
}

export const SquareEditWrapper = (props: IProps) => {
  const { coin, portfolio, editWatchCoin, toggle } = props;
  return (
    <EditSquareWrapper>
      <SquareEdit
        coin={coin}
        portfolio={portfolio}
        editWatchCoin={editWatchCoin}
        toggle={toggle}
      />
    </EditSquareWrapper>
  );
}
