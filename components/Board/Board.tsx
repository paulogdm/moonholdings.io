import React from 'react'
import { connect } from 'react-redux'
import { bind } from 'decko'

import {
  Welcome, Astronaut, NomicsLink, PlusButton,
  Portfolio, SquareEdit, Search, Overlay
} from '../' // components
import { IinitialState, IMarketAsset, IAsset } from '../../shared/types'
import { coinModel } from '../../shared/models'
import { StyledBoard, EditSquareWrapper } from '../../styles'
import { fetchAllAssets } from '../../actions/assets'
import { setOverlayState } from '../../actions/board'

interface IState {
  portfolio: IAsset[];
  coin: IAsset;
  edit: boolean;
  search: boolean;
}

interface IProps {
  assets: IAsset[];
  exchanges: IMarketAsset[];
  loading: boolean;
  overlay: boolean;
  fetchingMarkets: boolean;
  fetchAllAssets(): void;
  setOverlayState(overlay: boolean): void;
}

//@TODO to remove...
const tempPortfolio = [
  {
    position: 2.46781018,
    currency: 'BTC',
    marketCap: 63636922279.28325,
    name: 'Bitcoin',
    percentage: 66.4,
    price: 3637.33607,
    value: 8976.25,
  },
  {
    position: 2.46781018,
    currency: 'DCR',
    marketCap: 63636922279.28325,
    name: 'Decred',
    percentage: 66.4,
    price: 3637.33607,
    value: 8976.25,
  },
  {
    position: 2.46781018,
    currency: 'ETH',
    marketCap: 63636922279.28325,
    name: 'Ethereum',
    percentage: 66.4,
    price: 3637.33607,
    value: 8976.25,
  },
  {
    position: 2.46781018,
    currency: 'BNB',
    marketCap: 63636922279.28325,
    name: 'Binance',
    percentage: 66.4,
    price: 3637.33607,
    value: 8976.25,
  },
  {
    position: 2.46781018,
    currency: 'LTC',
    marketCap: 63636922279.28325,
    name: 'Litecoin',
    percentage: 66.4,
    price: 3637.33607,
    value: 8976.25,
  },
  {
    position: 2.46781018,
    currency: 'LSK',
    marketCap: 63636922279.28325,
    name: 'Lisk',
    percentage: 66.4,
    price: 3637.33607,
    value: 8976.25,
  },{
    position: 2.46781018,
    currency: 'ZRX',
    marketCap: 63636922279.28325,
    name: '0xProject',
    percentage: 66.4,
    price: 3637.33607,
    value: 8976.25,
  },
  {
    position: 2.46781018,
    currency: 'MKR',
    marketCap: 63636922279.28325,
    name: 'Maker',
    percentage: 66.4,
    price: 3637.33607,
    value: 8976.25,
  },
  {
    position: 2.46781018,
    currency: 'USDT',
    marketCap: 63636922279.28325,
    name: 'Tether',
    percentage: 66.4,
    price: 3637.33607,
    value: 8976.25,
  },
  {
    position: 2.46781018,
    currency: 'NANO',
    marketCap: 63636922279.28325,
    name: 'Nano',
    percentage: 66.4,
    price: 3637.33607,
    value: 8976.25,
  }
]

class Board extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      portfolio: tempPortfolio,
      coin: coinModel,
      edit: false,
      search: false
    };
  }

  componentDidMount() {
    const { localStorage } = window;
    const { portfolio } = this.state;

    this.props.fetchAllAssets();

    if (portfolio.length === 0) {
      const storedPortfolio = JSON.parse(localStorage.getItem('moonPortfolio') || '{}');

      if (storedPortfolio) {
        const reconstructedPortfolio = Object.values(storedPortfolio);
        this.props.fetchAllAssets();
        // this.props.addCoins(reconstructedPortfolio);
      }
    }
  }

  render() {
    const { assets, overlay, exchanges, fetchingMarkets } = this.props;
    const { coin, edit, portfolio, search } = this.state;
    const hasPortfolio = portfolio.length > 0;

    return (
      <div>
        { edit && this.renderSquareEdit(coin) }
        { search &&
          <Search
            assets={assets}
            exchanges={exchanges}
            cancel={this.handleOverlayClick}
            fetching={fetchingMarkets}
          />}
        { overlay && <Overlay handleClick={this.handleOverlayClick} /> }
        <StyledBoard>
          { !hasPortfolio && <Welcome /> }
          <Portfolio coins={portfolio} edit={this.toggleSquareEdit} />
          <PlusButton toggleSearch={this.handleOnSearch} />
          <NomicsLink />
          <Astronaut showLogo={hasPortfolio} />
        </StyledBoard>
      </div>
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
 
    this.props.setOverlayState(true);
  }

  @bind
  private renderSquareEdit(coin: IAsset) {
    return (
      <EditSquareWrapper>
        <SquareEdit coin={coin} toggle={this.toggleSquareEdit} />
      </EditSquareWrapper>
    );
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
  setOverlayState: (overlay: boolean) => dispatch(setOverlayState(overlay))
});

const mapStateToProps = (state: IinitialState) => ({
  assets: state.AssetsReducer.assets,
  portfolio: state.AssetsReducer.portfolio,
  exchanges: state.AssetsReducer.exchanges,
  loading: state.AssetsReducer.loading,
  fetchingMarkets: state.AssetsReducer.fetchingMarkets,
  overlay: state.BoardReducer.overlay
});

export const BoardJest = Board;

export default connect(mapStateToProps, mapDispatchToProps)(Board);
