import React from 'react'
import { connect } from 'react-redux'
import { bind } from 'decko'

import {
  Welcome, Astronaut, NomicsLink, PlusButton, Portfolio, SquareEditWrapper, Search, BlockLoader, Overlay
}  from '../../components'
import { addCoinsPortfolio, addCoinsWatchlist, fetchAllAssets } from '../../actions/assets'
import { setOverlayState } from '../../actions/board'
import { IinitialState, IMarketAsset, IAsset } from '../../shared/types'
import { coinModel } from '../../shared/models'
import { MOON_PORTFOLIO, MOON_WATCHLIST } from '../../shared/constants/copy'
import { sortByValue } from '../../services/coinFactory'
import { StyledBoard, PortfolioContainer } from '../../styles'

interface IState {
  coin: IAsset;
  edit: boolean;
  search: boolean;
}

interface IProps {
  assets: IAsset[];
  portfolio: IAsset[];
  watchlist: IAsset[];
  exchanges: IMarketAsset[];
  loading: boolean;
  overlay: boolean;
  fetchingMarkets: boolean;
  addCoinsPortfolio(assets: IAsset[] | {}[]): void;
  addCoinsWatchlist(assets: IAsset[] | {}[]): void;
  fetchAllAssets(): void;
  setOverlayState(overlay: boolean): void;
}

class Board extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      coin: coinModel,
      edit: false,
      search: false
    };
  }

  componentDidMount() {
    const { localStorage } = window;
    const { portfolio } = this.props;

    this.props.fetchAllAssets();

    if (portfolio.length === 0) {
      const savedPortfolio = JSON.parse(localStorage.getItem(MOON_PORTFOLIO) || '{}');
      const savedWatchlist = JSON.parse(localStorage.getItem(MOON_WATCHLIST) || '{}');

      if (savedPortfolio) {
        // console.log('savedPortfolio', savedPortfolio);
        const reconstructedPortfolio = Object.values(savedPortfolio);
        this.props.addCoinsPortfolio(reconstructedPortfolio);
      }

      if (savedWatchlist) {
        // console.log('savedWatchlist', savedWatchlist);
        const reconstructedWatchlist = Object.values(savedWatchlist);
        this.props.addCoinsWatchlist(reconstructedWatchlist);
      }
    }
  }

  render() {
    const { assets, portfolio, loading, overlay, exchanges, fetchingMarkets, watchlist } = this.props;
    const { coin, edit, search } = this.state;
    const sortedPortfolio = sortByValue(portfolio);
    const hasPortfolio = portfolio.length > 0;

    return (
      <PortfolioContainer>
        { edit &&
          <SquareEditWrapper
            coin={coin}
            portfolio={sortedPortfolio}
            toggle={this.toggleSquareEdit}
          /> }
        { search &&
          <Search
            assets={assets}
            exchanges={exchanges}
            cancel={this.handleOverlayClick}
            fetching={fetchingMarkets}
          /> }
        { overlay && <Overlay handleClick={this.handleOverlayClick}/> }
        <StyledBoard>
          { loading ? <BlockLoader /> : !hasPortfolio ? <Welcome/>
            : <Portfolio portfolio={sortedPortfolio} watchlist={watchlist} edit={this.toggleSquareEdit}/> }
          <PlusButton toggleSearch={this.handleOnSearch}/>
          <NomicsLink/>
          <Astronaut showLogo={hasPortfolio}/>
        </StyledBoard>
      </PortfolioContainer>
    );
  }

  @bind
  private handleOnSearch() {
    this.setState({ search: true });
    this.props.setOverlayState(true);
  }

  @bind
  private toggleSquareEdit(toggle: boolean, coin?: IAsset) {
    coin ?
      this.setState({ coin, edit: toggle }) :
      this.setState({ edit: toggle });
 
    this.props.setOverlayState(toggle);
  }

  @bind
  private handleOverlayClick() {
    const { edit, search } = this.state;
    if (edit) this.toggleSquareEdit(false, coinModel);
    if (search) this.setState({ search: false });
    this.props.setOverlayState(false);
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  fetchAllAssets: () => dispatch(fetchAllAssets()),
  addCoinsPortfolio: (assets: IAsset[]) => dispatch(addCoinsPortfolio(assets)),
  addCoinsWatchlist: (assets: IAsset[]) => dispatch(addCoinsWatchlist(assets)),
  setOverlayState: (overlay: boolean) => dispatch(setOverlayState(overlay))
});

const mapStateToProps = (state: IinitialState) => ({
  assets: state.AssetsReducer.assets,
  portfolio: state.AssetsReducer.portfolio,
  watchlist: state.AssetsReducer.watchlist,
  exchanges: state.AssetsReducer.exchanges,
  loading: state.AssetsReducer.loading,
  fetchingMarkets: state.AssetsReducer.fetchingMarkets,
  overlay: state.BoardReducer.overlay
});

export const BoardJest = Board;

export default connect(mapStateToProps, mapDispatchToProps)(Board);
