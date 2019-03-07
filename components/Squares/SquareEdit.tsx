import React from 'react'
import { connect } from 'react-redux'
import { bind } from 'decko'

import { SquareRow } from '../../components'
import { updateCoinPortfolio, removeCoinPortfolio } from '../../actions/assets';
import { IAsset } from '../../shared/types'
import { styleModifier, setStyle, round, rounder } from '../../shared/utils'
import { EditSquare, EditSquareData, EditButtonsContainer } from '../../styles'

interface IProps {
  coin: IAsset;
  editWatchCoin: boolean;
  portfolio: IAsset[];
  toggle(toggle: boolean, coin?: IAsset): void;
  updateCoinPortfolio(asset: IAsset): void;
  removeCoinPortfolio(asset: IAsset): void;
}

interface IState {
  coin: IAsset;
  price: number;
  balance: number;
  value: number;
  inPortfolio: boolean;
}

class SquareEdit extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    const { coin } = this.props;
    const { price } = coin;
    const value = coin.position !== undefined ? round(coin.position * price) : 0;

    this.state = {
      coin,
      price,
      balance: 0,
      value,
      inPortfolio: false
    };
  }

  componentWillMount() {
    const { coin, portfolio } = this.props;
    const { balance: stateBalance } = this.state;

    const inPortfolio = portfolio && portfolio.filter(c => c.currency === coin.currency);
    const portCoin = inPortfolio[0] ? inPortfolio[0] : coin;
    const balance = portCoin.position ? portCoin.position : stateBalance;

    this.setState({
      coin: portCoin,
      balance,
      inPortfolio: inPortfolio.length > 0
    });
  }

  render() {
    const { editWatchCoin } = this.props;
    const { coin, balance, value, inPortfolio } = this.state;
    const { currency, exchange, marketCap, percentage, position, price } = coin;
    
    const EDIT_POSITION = 'Edit your position below';
    const SaveButton = () => <button onClick={this.handleSave} disabled={balance <= 0}>Save</button>;
    const RemoveButton = () => <button onClick={this.handleRemove}>Remove</button>;
    const CancelButton = () => <button onClick={() => this.props.toggle(false)}>Cancel</button>;
    
    console.log('editWatchCoin', editWatchCoin);
    console.log('coin', coin);

    return (
      <EditSquare className={styleModifier(currency)} style={setStyle(currency)}>
        <header>
          <h2>{currency}</h2>
          <h3 style={setStyle(currency)}>{ editWatchCoin ? coin.name : EDIT_POSITION }</h3>
        </header>
        {
          editWatchCoin ? null :
          <input
            type="number"
            placeholder="0"
            value={this.state.balance}
            onFocus={this.handleFocus}
            onChange={this.handleChange}
          />
        }
        <EditSquareData>
          <SquareRow type={'Price:'} data={price}/>
          <SquareRow type={'Exchange:'} data={exchange}/>
          { editWatchCoin ? null : <SquareRow type={'Position:'} data={position ? position : 0}/> }
          { editWatchCoin ? null : <SquareRow type={'Allocation:'} data={percentage ? percentage : 0}/> }
          { editWatchCoin ? null : <SquareRow type={'Value:'} data={value}/> }
          { editWatchCoin && <SquareRow type={'Marketcap:'} data={marketCap} isWatchlist /> }
        </EditSquareData>
        <EditButtonsContainer>
          <SaveButton/>
          {inPortfolio && <RemoveButton/>}
          <CancelButton/>
        </EditButtonsContainer>
      </EditSquare>
    );
  }

  @bind
  private handleFocus(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    target.select();
  }

  @bind
  private handleChange(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    const balance = Number(target.value);
    const value = rounder(balance, this.state.price);
    this.setState({ balance, value });
  }

  @bind
  private handleSave() {
    const { coin, balance: position } = this.state;
    const coinValue = coin.value ? coin.value : 0;
    const updatedCoin = { ...coin, position, value: coinValue * position };
    this.props.updateCoinPortfolio(updatedCoin);
    this.props.toggle(false);
  }

  @bind
  private handleRemove() {
    const { coin } = this.state;
    this.props.removeCoinPortfolio(coin);
    this.props.toggle(false);
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  updateCoinPortfolio: (coin: IAsset) => dispatch(updateCoinPortfolio(coin)),
  removeCoinPortfolio: (coin: IAsset) => dispatch(removeCoinPortfolio(coin))
});

export const SquareEditJest = SquareEdit;

export default connect(null, mapDispatchToProps)(SquareEdit);
