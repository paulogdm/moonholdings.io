import React from 'react'
import { bind } from 'decko'

import { ExchangesCount } from '../../components'
import { IMarketAsset } from '../../shared/types'
import { SearchSelectStyle } from '../../styles'
import { capitalizeFirstLetter as capFirst } from '../../shared/utils'

interface IProps {
  exchanges: IMarketAsset[];
  disabled: boolean;
  onSelect(value: IMarketAsset): void;
}

export class ExchangeSelect extends React.Component<IProps> {
  render() {
    const { exchanges, disabled } = this.props;

    return (
      <SearchSelectStyle
        id="exchange-select"
        disabled={disabled}
        onChange={this.handleSelect}
      >
        <ExchangesCount exchanges={exchanges}/>
        {exchanges.map(ex => (
          <option key={`${ex.exchange}-${ex.base}-${ex.quote}`} value={ex.exchange}>
            {capFirst(ex.exchange)} ({ex.quote}) ${ex.price_quote}
          </option>
        ))}
      </SearchSelectStyle>
    );
  }

  @bind
  private handleSelect(event: React.FormEvent<HTMLSelectElement>) {
    const target = event.target as HTMLInputElement;
    const { value } = target;
    const { exchanges, onSelect } = this.props;
    const selected = exchanges.find(exchange => exchange.exchange === value);
    if (selected) onSelect(selected);
  };
}
