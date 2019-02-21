import React from 'react'

import { IAsset } from '../../shared/types'
import { SelectedAssetStyle } from '../../styles'

interface IProps {
  asset: IAsset;
}

export const SelectedAsset = (props: IProps) => {
  const { asset } = props;
  return (
    <SelectedAssetStyle>
      {asset.name} <em>{asset.currency}</em> <button>Clear Selection</button>
    </SelectedAssetStyle>
  )
}
