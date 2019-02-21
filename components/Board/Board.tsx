import React from 'react'
import { connect } from 'react-redux'
import { bind } from 'decko'

import {
  Welcome, Astronaut, NomicsLink, PlusButton, Portfolio,
  SquareEditWrapper, Search, Overlay
}  from '../../components'
import { IinitialState, IMarketAsset, IAsset } from '../../shared/types'
import { coinModel } from '../../shared/models'
import { StyledBoard } from '../../styles'
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
    position: 21,
    currency: 'BTC',
    marketCap: 63636922279.28325,
    name: 'Bitcoin',
    percentage: 66.4,
    price: 3637.33607,
    value: 76384.05747,
  },
  {
    position: 125,
    currency: 'DCR',
    marketCap: 63636922279.28325,
    name: 'Decred',
    percentage: 66.4,
    price: 125.45,
    value: 15681.25,
  },
  {
    position: 32,
    currency: 'ETH',
    marketCap: 63636922279.28325,
    name: 'Ethereum',
    percentage: 66.4,
    price: 145,
    value: 4640,
  },
  {
    position: 50,
    currency: 'BNB',
    marketCap: 63636922279.28325,
    name: 'Binance',
    percentage: 66.4,
    price: 10.60,
    value: 530,
  },
  {
    position: 10,
    currency: 'LTC',
    marketCap: 63636922279.28325,
    name: 'Litecoin',
    percentage: 66.4,
    price: 51.17,
    value: 511.7,
  },
  {
    position: 200,
    currency: 'LSK',
    marketCap: 63636922279.28325,
    name: 'Lisk',
    percentage: 66.4,
    price: 1.27,
    value: 254,
  },{
    position: 100,
    currency: 'ZRX',
    marketCap: 63636922279.28325,
    name: '0xProject',
    percentage: 66.4,
    price: 0.32,
    value: 32,
  },
  {
    position: 1,
    currency: 'MKR',
    marketCap: 63636922279.28325,
    name: 'Maker',
    percentage: 66.4,
    price: 650.79,
    value: 650.79,
  },
  {
    position: 200,
    currency: 'USDT',
    marketCap: 63636922279.28325,
    name: 'Tether',
    percentage: 66.4,
    price: 1.01,
    value: 202,
  },
  {
    position: 100,
    currency: 'NANO',
    marketCap: 63636922279.28325,
    name: 'Nano',
    percentage: 66.4,
    price: 0.99,
    value: 99,
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
        { edit && <SquareEditWrapper coin={coin} toggle={this.toggleSquareEdit}/> }
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
