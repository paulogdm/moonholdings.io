import React from 'react'
import { connect } from 'react-redux'
import { bind } from 'decko'

import {
  Welcome, Astronaut, NomicsLink, PlusButton, Notification, Overlay,
  Portfolio, SquareEditWrapper, Search, BlockLoader,
} from '../../components'
import { addCoinsPortfolio, addCoinsWatchlist, fetchAllAssets } from '../../actions/assets'
import { setNotification, setOverlayState } from '../../actions/board'
import { IinitialState, IMarketAsset, IAsset } from '../../shared/types'
import { coinModel } from '../../shared/models'
import { MOON_PORTFOLIO, MOON_WATCHLIST } from '../../shared/constants/copy'
import { sortByValue } from '../../services/coinFactory'
import { StyleContainer, StyledBoard } from '../../styles'

interface IState {
  coin: IAsset;
  editWatchCoin: boolean;
  edit: boolean;
  search: boolean;
  notificationClass: string;
}

interface IProps {
  assets: IAsset[];
  portfolio: IAsset[];
  watchlist: IAsset[];
  exchanges: IMarketAsset[];
  loading: boolean;
  overlay: boolean;
  fetchingMarkets: boolean;
  notification: string;
  notificationError: boolean;
  addCoinsPortfolio(assets: IAsset[] | {}[]): void;
  addCoinsWatchlist(assets: IAsset[] | {}[]): void;
  fetchAllAssets(): void;
  setNotification(notification: string, notificationError: boolean): void;
  setOverlayState(overlay: boolean): void;
}

class Board extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      coin: coinModel,
      editWatchCoin: false,
      edit: false,
      search: false,
      notificationClass: 'spin-in-notification'
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
        const reconstructedPortfolio = Object.values(savedPortfolio);
        this.props.addCoinsPortfolio(reconstructedPortfolio);
      }

      if (savedWatchlist) {
        const reconstructedWatchlist = Object.values(savedWatchlist);
        this.props.addCoinsWatchlist(reconstructedWatchlist);
      }
    }
  }

  render() {
    const {
      assets, portfolio, watchlist, exchanges, loading, overlay,
      fetchingMarkets, notification, notificationError
    } = this.props;
    const { coin, edit, editWatchCoin, search, notificationClass } = this.state;
    const sortedPortfolio = sortByValue(portfolio);
    const hasPortfolio = portfolio.length > 0;
    const hasWatchlist = watchlist.length > 0;

    this.checkForSuccessNotification(this.props);

    return (
      <StyleContainer>
        { notification !== '' &&
          <Notification
            class={notificationClass}
            error={notificationError}
            message={notification}
            onClick={this.handleNotificationClick}/> }
        { edit &&
          <SquareEditWrapper
            coin={coin}
            editWatchCoin={editWatchCoin}
            portfolio={sortedPortfolio}
            toggle={this.toggleSquareEdit}
          /> }
        { search &&
          <Search
            assets={assets}
            portfolio={portfolio}
            watchlist={watchlist}
            exchanges={exchanges}
            cancel={this.handleOverlayClick}
            fetching={fetchingMarkets}
          /> }
        { overlay && <Overlay handleClick={this.handleOverlayClick}/> }
        <StyledBoard id="board">
          { loading ? <BlockLoader /> : !hasPortfolio && !hasWatchlist ? <Welcome/>
            : <Portfolio portfolio={sortedPortfolio} watchlist={watchlist} edit={this.toggleSquareEdit}/> }
          <PlusButton toggleSearch={this.handleOnSearch}/>
          <NomicsLink/>
          <Astronaut showLogo={hasPortfolio}/>
        </StyledBoard>
      </StyleContainer>
    );
  }

  @bind
  private handleOnSearch() {
    this.setState({ search: true });
    this.props.setOverlayState(true);
  }

  @bind
  private toggleSquareEdit(toggle: boolean, coin: IAsset, editWatchCoin?: boolean) {
    !editWatchCoin ? 
      this.setState({ coin, edit: toggle, editWatchCoin: false }) :
      this.setState({ coin, edit: toggle, editWatchCoin });
 
    this.props.setOverlayState(toggle);
  }

  @bind
  private handleOverlayClick() {
    const { edit, search } = this.state;
    if (edit) this.toggleSquareEdit(false, coinModel);
    if (search) this.setState({ search: false });
    this.props.setOverlayState(false);
  }

  @bind
  resetNotification(): void {
    this.setState({ notificationClass: 'spin-in-notification' });
    this.props.setNotification('', false);
  }

  @bind
  private handleNotificationClick() {
    this.setState({ notificationClass: 'slide-out-bck-top' });

    setTimeout(() => {
      this.resetNotification();
    }, 500);
  }

  @bind
  private checkForSuccessNotification({ notification, notificationError }: IProps) {
    if (notification !== '' && !notificationError) {
      setTimeout(() => {
        this.handleNotificationClick();
      }, 5000);
    }
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  fetchAllAssets: () => dispatch(fetchAllAssets()),
  addCoinsPortfolio: (assets: IAsset[]) => dispatch(addCoinsPortfolio(assets)),
  addCoinsWatchlist: (assets: IAsset[]) => dispatch(addCoinsWatchlist(assets)),
  setOverlayState: (overlay: boolean) => dispatch(setOverlayState(overlay)),
  setNotification: (notification: string, notificationError: boolean) =>
    dispatch(setNotification(notification, notificationError))
});

const mapStateToProps = (state: IinitialState) => ({
  assets: state.AssetsReducer.assets,
  portfolio: state.AssetsReducer.portfolio,
  watchlist: state.AssetsReducer.watchlist,
  exchanges: state.AssetsReducer.exchanges,
  loading: state.AssetsReducer.loading,
  fetchingMarkets: state.AssetsReducer.fetchingMarkets,
  notification: state.BoardReducer.notification,
  notificationError: state.BoardReducer.notificationError,
  overlay: state.BoardReducer.overlay,
});

export const BoardJest = Board;

export default connect(mapStateToProps, mapDispatchToProps)(Board);
