import React from 'react'
import { connect } from 'react-redux'
import { bind } from 'decko'

import {
  Welcome, Astronaut, NomicsLink, PlusButton,
  Portfolio, SquareEdit, SearchContainer
} from '../' // components
import { IAsset, IinitialState } from '../../shared/types'
import { coinModel } from '../../shared/models'
import { StyledBoard, EditSquareWrapper, Overlay } from '../../styles'
import { fetchAllAssets } from '../../actions/assets'

interface IState {
  portfolio: IAsset[];
  coin: IAsset;
  edit: boolean;
}

interface IProps {
  assets: IAsset[];
  loading: boolean;
  fetchAllAssets(): void;
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
      edit: false
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
    const { assets } = this.props;
    const { coin, edit, portfolio } = this.state;
    const hasPortfolio = portfolio.length > 0;
    console.log('1', assets);
    return (
      <div>
        { edit && this.renderSquareEdit(coin) }
        <StyledBoard>
          { !hasPortfolio && <Welcome /> }
          <SearchContainer assets={assets} />
          <Portfolio
            coins={portfolio}
            edit={this.toggleSquareEdit}
          />
          <PlusButton toggleSearch={this.handleOnSearch} />
          <NomicsLink />
          <Astronaut showLogo={hasPortfolio} />
        </StyledBoard>
      </div>
    );
  }

  @bind
  private handleOnSearch() {
    console.log('handleSearchButton...');
  }

  @bind
  private toggleSquareEdit(toggle: boolean, coin?: IAsset) {
    coin ?
      this.setState({ coin, edit: toggle }) :
      this.setState({ edit: toggle });
  }

  @bind
  private renderSquareEdit(coin: IAsset) {
    return (
      <EditSquareWrapper>
        <SquareEdit coin={coin} toggle={this.toggleSquareEdit} />
        <Overlay onClick={() => this.toggleSquareEdit(false, coinModel)} />
      </EditSquareWrapper>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  fetchAllAssets: () => dispatch(fetchAllAssets())
});

const mapStateToProps = (state: IinitialState) => ({
  assets: state.assets,
  portfolio: state.portfolio,
  loading: state.loading
});

export const BoardJest = Board;

export default connect(mapStateToProps, mapDispatchToProps)(Board);
