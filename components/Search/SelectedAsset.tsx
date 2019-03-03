import React from 'react'

import { IAsset } from '../../shared/types'
import { SelectedAssetStyle, CommonButton as Button } from '../../styles'

interface IProps {
  asset: IAsset;
  clearSelected(): void;
}

export const SelectedAsset = (props: IProps) => {
  const { asset, clearSelected } = props;
  return (
    <SelectedAssetStyle>
      {asset.name} <em>{asset.currency}</em> <Button onClick={clearSelected}>Clear Selection</Button>
    </SelectedAssetStyle>
  )
}
