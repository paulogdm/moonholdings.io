import React from 'react'
import { connect } from 'react-redux'
import { bind } from 'decko'

import { SearchInput, SelectedAsset, SearchList, SearchSelect } from '../../components'
import { IAsset, IMarketAsset } from '../../shared/types'
import { SearchContainerDiv, SearchSection, SearchButtons, FunctionButton, CommonButton } from '../../styles'
import { setSearchBtnDisabled } from '../../shared/utils'
import { findAsset, getExchangePrice } from '../../services/coinFactory';
import { addCoinPortfolio, addCoinWatchlist, fetchMarketPrices } from '../../actions/assets'

interface IProps {
  assets: IAsset[];
  exchanges: IMarketAsset[];
  fetching: boolean;
  cancel(): void;
  addCoinPortfolio(coin: IAsset): void;
  addCoinWatchlist(coin: IAsset): void;
  fetchMarketPrices(asset: string): void;
}

interface IState {
  exchange: string;
  exchange_base: string;
  aggregate: boolean;
  position: number;
  selected: IAsset | null;
  searchList: IAsset[];
  saved: IAsset[];
}

class Search extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      exchange: '',
      exchange_base: '',
      aggregate: false,
      position: 0,
      selected: null,
      searchList: props.assets,
      saved: props.assets,
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
    const { exchange, position, searchList, selected, aggregate } = this.state;

    const portfolioCheck = { type: 'portfolio', position, selected, exchange, exchanges };
    const watchlistCheck = { type: 'watchlist', selected, exchange, exchanges };
    const disabledPort = setSearchBtnDisabled(portfolioCheck);
    const disabledWatch = aggregate ? false : setSearchBtnDisabled(watchlistCheck);

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
                aggregate={aggregate}
                checkAggregate={this.handleCheckAggregate}
                enterPosition={this.handleEnterPosition}
                exchangeSelect={this.handleExchangeSelect}
              />
            : <SearchList
                searchList={searchList}
                onSelect={this.handleSelect}
              /> }
        </SearchSection>
        <SearchButtons>
          <FunctionButton disabled={disabledPort} onClick={this.handleAddPortfolio}>
            Add to Portfolio
          </FunctionButton>
          <FunctionButton disabled={disabledWatch} onClick={this.handleAddWatchlist}>
            Add to Watchlist
          </FunctionButton>
          <CommonButton onClick={cancel}>Cancel Search</CommonButton>
        </SearchButtons>
      </SearchContainerDiv>
    );
  }

  @bind
  handleEnterPosition(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    const { value } = target;
    this.setState({ position: Number(value) });
  }

  @bind
  handleAddPortfolio() {
    const { exchanges, cancel: closeSearchModal } = this.props;
    const { exchange, exchange_base, position, selected } = this.state;

    if (selected) {
      const { currency, marketCap, name, price: defaultPrice, } = selected;
      const price = exchange
        ? getExchangePrice(exchange, exchanges)
        : Number(defaultPrice);

      this.props.addCoinPortfolio(Object.assign({
        currency,
        exchange,
        exchange_base,
        name,
        marketCap,
        position,
        price,
        value: (price * position)
      }, selected));

      closeSearchModal();
    }
  }

  @bind
  handleAddWatchlist() {
    const { selected } = this.state;
    if (selected) {
      this.props.addCoinWatchlist(selected);
    }
  }

  @bind
  handleExchangeSelect(value: IMarketAsset) {
    const { exchange, quote: exchange_base } = value;
    this.setState({ exchange, exchange_base });
  }

  @bind
  handleCheckAggregate() {
    const { aggregate } = this.state;
    this.setState({ aggregate: !aggregate });
  }

  @bind
  handleClearSelected() {
    this.setState({
      searchList: this.state.saved,
      selected: null,
      exchange: '',
      exchange_base: '',
      aggregate: false
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
  addCoinPortfolio: (coin: IAsset) => dispatch(addCoinPortfolio(coin)),
  addCoinWatchlist: (coin: IAsset) => dispatch(addCoinWatchlist(coin))
});

export const SearchJest = Search;

export default connect(null, mapDispatchToProps)(Search);
