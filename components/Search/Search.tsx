import React from 'react'
import { connect } from 'react-redux'
import { bind } from 'decko'

import { SearchInput, SelectedAsset, SearchList, SearchSelect } from '../../components'
import { IAsset, IMarketAsset } from '../../shared/types'
import { SearchContainerDiv, SearchSection, SearchButtons, FunctionButton, CommonButton }
  from '../../styles'
import { setSearchBtnDisabled } from '../../shared/utils'
import { findAsset } from '../../services/coinFactory';
import { fetchMarketPrices } from '../../actions/assets'

interface IProps {
  assets: IAsset[];
  exchanges: IMarketAsset[];
  fetching: boolean;
  cancel(): void;
  fetchMarketPrices(asset: string): void;
}

interface IState {
  selected: IAsset | null;
  searchList: IAsset[];
  saved: IAsset[];
  exchange: string;
}

class Search extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      selected: null,
      searchList: props.assets,
      saved: props.assets,
      exchange: ''
    }
  }

  componentDidUpdate() {
    const { assets } = this.props;
    const { saved } = this.state;

    if (saved.length === 0) {
      this.setState({
        searchList: assets,
        saved: assets
      });
    }
  }

  render() {
    const { assets, cancel, exchanges, fetching } = this.props;
    const { exchange, searchList, selected } = this.state;
    const disabled = setSearchBtnDisabled(selected, exchange, exchanges);
    console.log('selected', selected);
    console.log('exchange', exchange);
    console.log('exchanges', exchanges);

    return (
      <SearchContainerDiv>
        <SearchSection>
          { selected
            ? <SelectedAsset asset={selected} clearSelected={this.handleClearSelected}/>
            : <SearchInput handleSearchTyping={this.handleSearchTyping}/> }
          { selected
            ? <SearchSelect
                assets={assets}
                selected={selected}
                exchange={exchange}
                exchanges={exchanges}
                fetching={fetching}
                exchangeSelect={this.handleExchangeSelect}
              />
            : <SearchList
                searchList={searchList}
                onSelect={this.handleSelect}
              /> }
        </SearchSection>
        <SearchButtons>
          <FunctionButton disabled={disabled}>Add to Portfolio</FunctionButton>
          <FunctionButton disabled={disabled}>Add to Watchlist</FunctionButton>
          <CommonButton onClick={cancel}>Cancel Search</CommonButton>
        </SearchButtons>
      </SearchContainerDiv>
    );
  }

  @bind
  handleExchangeSelect(event: React.FormEvent<HTMLSelectElement>) {
    const target = event.target as HTMLSelectElement;
    const exchange = target.value;
    this.setState({ exchange });
  }

  @bind
  handleClearSelected() {
    const { saved } = this.state;
    this.setState({
      searchList: saved,
      selected: null,
      exchange: ''
    });
  }

  @bind
  handleSearchTyping(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    const { value: searchText } = target;

    const search = (text: string) => {
      const { searchList } = this.state;
      const searchedCoins = findAsset(text, searchList);
      this.setState({ searchList: searchedCoins });
    };

    const clearSearch = () => this.setState({ searchList: this.state.saved });

    const handleUpdate = (num: number) => (num > 1 ? search(searchText) : clearSearch());

    return handleUpdate(searchText.length);
  }

  @bind
  handleSelect(asset: IAsset) {
    this.props.fetchMarketPrices(asset.currency);
    this.setState({ selected: asset });
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  fetchMarketPrices: (asset: string) => dispatch(fetchMarketPrices(asset)),
});

export const SearchJest = Search;

export default connect(null, mapDispatchToProps)(Search);
