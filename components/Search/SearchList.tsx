import React from 'react'

import { BlockLoader } from '../../components'
import { IAsset } from '../../shared/types'
import { SearchListStyle, SearchListLoader } from '../../styles'
import { numberWithCommas as addCommas } from '../../shared/utils/math'

interface IProps {
  searchList: IAsset[];
  onSelect(asset: IAsset): void;
}

export const SearchList = (props: IProps) => {
  const { searchList, onSelect } = props;
  const marketCap = (asset: IAsset) => addCommas(Math.round(asset.marketCap));

  return (
    <SearchListStyle>
      { searchList && searchList.length > 0
        ? searchList.map((asset: IAsset, i: number) => {
          if (asset.marketCap === 0) return null;
          return (
            <li
              key={asset.currency}
              role="button"
              tabIndex={i}
              onClick={() => onSelect(asset)}
            >
              <p>{asset.name}</p>
              <span className="symbol">{asset.currency}</span>
              <em>${marketCap(asset)}</em>
            </li>)
        })
        : <SearchListLoader><BlockLoader/></SearchListLoader>
      }
    </SearchListStyle>
  );
}
