import React from 'react'
import { connect } from 'react-redux'
import { bind } from 'decko'
import * as R from 'ramda'

import { SearchInput, SelectedAsset, SearchList, SearchSelect } from '../../components'
import { addCoinPortfolio, addCoinWatchlist, fetchMarketPrices } from '../../actions/assets'
import { setNotification } from '../../actions/board'
import { findAsset, getExchangePrice } from '../../services/coinFactory';
import { IAsset, IMarketAsset } from '../../shared/types'
import { setSearchBtnDisabled } from '../../shared/utils'
import { ERROR_ALREADY_PORTFOLIO, ERROR_ALREADY_WATCHLIST } from '../../shared/constants/errors'
import { ASSET_NOT_SUPPORTED, ADDED_FIRST_PORTFOLIO_ASSET, ADDED_FIRST_WATCHLIST_ASSET }
  from '../../shared/constants/copy'
import { SearchContainerDiv, SearchSection, SearchButtons, FunctionButton, CommonButton, Note }
  from '../../styles'

interface IProps {
  assets: IAsset[];
  portfolio: IAsset[];
  watchlist: IAsset[];
  exchanges: IMarketAsset[];
  fetching: boolean;
  cancel(): void;
  addCoinPortfolio(coin: IAsset): void;
  addCoinWatchlist(coin: IAsset): void;
  setNotification(notification: string, notificationError: boolean): void;
  fetchMarketPrices(asset: string | undefined): void;
}

interface IState {
  exchange: string;
  exchange_base: string;
  aggregate: boolean;
  position: number;
  noAsset: boolean;
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
      noAsset: false,
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
    const { exchange, position, searchList, selected, aggregate, noAsset } = this.state;

    const portfolioCheck = { type: 'portfolio', position, selected, exchange, exchanges };
    const watchlistCheck = { type: 'watchlist', selected, exchange, exchanges };
    const disabledPort = setSearchBtnDisabled(portfolioCheck);
    const disabledWatch = aggregate ? false : setSearchBtnDisabled(watchlistCheck);
    const NoAsset = () => <Note>{ASSET_NOT_SUPPORTED}</Note>;

    return (
      <SearchContainerDiv>
        <SearchSection>
          { selected
            ? <SelectedAsset asset={selected} clearSelected={this.handleClearSelected}/>
            : <SearchInput handleSearchTyping={this.handleSearchTyping}/> }
          { noAsset && <NoAsset/> }
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
    this.setState({ position: Number(target.value) });
  }

  @bind
  addAssetToPortfolio(selected: IAsset, exchanges: IMarketAsset[], isFirstAsset: boolean) {
    const { setNotification: setNote } = this.props;
    const { exchange, exchange_base, position } = this.state;
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

    isFirstAsset && setNote(ADDED_FIRST_PORTFOLIO_ASSET(currency), false);
  }

  @bind
  handleAddPortfolio() {
    const { exchanges, portfolio, cancel: closeSearchModal, setNotification } = this.props;
    const { selected } = this.state;

    if (selected) {
      const { currency } = selected;
      const isFirstAsset = portfolio.length === 0;

      R.not(R.find(R.propEq('currency', currency))(portfolio))
        ? this.addAssetToPortfolio(selected, exchanges, isFirstAsset)
        : setNotification(`${currency} ${ERROR_ALREADY_PORTFOLIO}`, true);
    }

    closeSearchModal();
  }

  @bind
  addAssetToWatchlist(selected: IAsset, isFirstAsset: boolean) {
    const { addCoinWatchlist, setNotification: setNote } = this.props;
    const { exchange, exchange_base } = this.state;

    addCoinWatchlist({
      ...selected,
      exchange,
      exchange_base
    });

    isFirstAsset && setNote(ADDED_FIRST_WATCHLIST_ASSET(selected.currency),  false);
  }

  @bind
  handleAddWatchlist() {
    const { cancel: closeSearchModal, watchlist, setNotification } = this.props;
    const { selected } = this.state;
    
    if (selected) {
      const { currency } = selected;
      const isFirstAsset = watchlist.length === 0;

      R.not(R.find(R.propEq('currency', currency))(watchlist))
        ? this.addAssetToWatchlist(selected, isFirstAsset)
        : setNotification(`${selected.currency} ${ERROR_ALREADY_WATCHLIST}`, true);

      closeSearchModal();
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

    const updateSearchList = (searchList: IAsset[], noAsset: boolean) => this.setState({ noAsset, searchList });

    const search = (text: string) => {
      const searchedCoins = findAsset(text, this.state.saved);

      if (text.length > 2 && searchedCoins.length === 1) {
        // No asset found, display note.
        if (searchedCoins[0].currency === '') {
          updateSearchList(searchedCoins, true);
        }
        else {
          updateSearchList(searchedCoins, false);
        }
      }
      else {
        updateSearchList(searchedCoins, false);
      }
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
  addCoinWatchlist: (coin: IAsset) => dispatch(addCoinWatchlist(coin)),
  setNotification: (notification: string, notificationError: boolean) =>
    dispatch(setNotification(notification, notificationError))
});

export const SearchJest = Search;

export default connect(null, mapDispatchToProps)(Search);
