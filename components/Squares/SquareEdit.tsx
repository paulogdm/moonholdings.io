import React from 'react'
import { connect } from 'react-redux'
import { bind } from 'decko'

// import { addCoin, updateCoin, removeCoin } from '../../actions/coins';
import { IAsset } from '../../shared/types'
import { styleModifier, setStyle, numberWithCommas, round, rounder } from '../../shared/utils'
import { EditSquare, EditSquareData, EditButtonsContainer } from '../../styles'

const renderInstructions = (inPortfolio: boolean) => (inPortfolio ? 'Edit' : 'Enter');

interface IProps {
  coin: IAsset;
  toggle(toggle: boolean, coin?: IAsset): void;
}

interface IState {
  coin: IAsset;
  price: number;
  balance: number;
  value: number;
  allocation: number;
  portfolio: IAsset[];
  inPortfolio: boolean;
}

class SquareEdit extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    // @TODO wire up redux portfolio into state.
    // const { coin, moon } = this.props;
    // const { portfolio } = moon;
    const { coin } = this.props;
    const { price } = coin;
    const value = coin.position !== undefined ? round(coin.position * price) : 0;

    this.state = {
      coin,
      price,
      balance: 0,
      value,
      portfolio: [],
      allocation: 0,
      inPortfolio: false
    };
  }

  componentWillMount() {
    const { coin, balance: stateBalance } = this.state;
    const { portfolio } = this.state;
    const inPortfolio = portfolio.filter(c => c.currency === coin.currency);
    const portCoin = inPortfolio[0] ? inPortfolio[0] : coin;
    const balance = portCoin.position ? portCoin.position : stateBalance;

    this.setState({
      coin: portCoin,
      balance,
      inPortfolio: inPortfolio.length > 0
    });
  }

  render() {
    const { coin, balance, value, inPortfolio } = this.state;
    const { currency, price } = coin;
    const SaveButton = () => <button onClick={this.handleSave} disabled={balance <= 0}>Save</button>;
    const RemoveButton = () => <button onClick={this.handleRemove}>Remove</button>;
    const CancelButton = () => <button onClick={() => this.props.toggle(false)}>Cancel</button>;

    return (
      <EditSquare className={styleModifier(currency)} style={setStyle(currency)}>
        <h2 style={setStyle(currency)}>{renderInstructions(inPortfolio)} your position below</h2>
        <input
          type="number"
          placeholder="0"
          value={this.state.balance}
          onFocus={this.handleFocus}
          onChange={this.handleChange}
        />
        <EditSquareData>
          <h3>{currency}</h3>
          <p>Price: ${round(price)} </p>
          <p>Value: ${numberWithCommas(value)} </p>
          <p>Allocation: ${numberWithCommas(value)} </p>
        </EditSquareData>
        <EditButtonsContainer>
          <SaveButton/>
          {inPortfolio ? <RemoveButton/> : <CancelButton/>}
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

    this.setState({
      balance,
      value
    });
  }

  @bind
  private addCoin(coin: IAsset, balance: number) {
    const { value } = this.state;
    console.log('addCoin');
    // this.props.addCoin(Object.assign({
    //   balance,
    //   value
    // }, coin));
  }

  @bind
  private updateCoin(coin: IAsset, balance: number) {
    const { value } = this.state;
    const updatedCoin = Object.assign(coin);
    updatedCoin.balance = balance;
    updatedCoin.value = value;
    console.log('updateCoin');
    // this.props.updateCoin(updatedCoin);
  }

  @bind
  private handleSave() {
    const { coin, balance, inPortfolio } = this.state;
    console.log('handleSave');
    // inPortfolio ? this.updateCoin(coin, balance) : this.addCoin(coin, balance);
    // this.props.toggle(false);
  }

  @bind
  @bind handleRemove() {
    const { coin } = this.state;
    console.log('handleRemove');
    // this.props.removeCoin(coin);
    // this.props.toggle(false);
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  // addCoin: (...args) => dispatch(addCoin(...args)),
  // updateCoin: (...args) => dispatch(updateCoin(...args)),
  // removeCoin: (...args) => dispatch(removeCoin(...args))
});

const mapStateToProps = (state: { portfolio: IAsset[] }) => ({
  portfolio: state.portfolio
});

export const SquareEditJest = SquareEdit;

export default connect(mapStateToProps, mapDispatchToProps)(SquareEdit);
