import React from 'react'

// components
import { BlockLoader } from '..'
import { IAsset } from '../../shared/types'
import { SearchListStyle, SearchListLoader } from '../../styles'
import { numberWithCommas } from '../../shared/utils/math'

interface IProps {
  searchList: IAsset[];
  onSelect(asset: IAsset): void;
}

export const SearchList = (props: IProps) => {
  const { searchList, onSelect } = props;
  return (
    <SearchListStyle>
      { searchList && searchList.length > 0
        ? searchList.map((asset: IAsset, i: number) => (
          <li
            key={asset.currency}
            role="button"
            tabIndex={i}
            onClick={() => onSelect(asset)}
          >
            <p>{asset.name}</p>
            <span className="symbol">{asset.currency}</span>
            <em>${numberWithCommas(Math.round(asset.marketCap))}</em>
          </li>))
        : <SearchListLoader><BlockLoader/></SearchListLoader>
      }
    </SearchListStyle>
  );
}
