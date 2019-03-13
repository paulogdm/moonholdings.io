import React from 'react'
import { connect } from 'react-redux'

import { IinitialState, IAsset } from '../../shared/types'
import { PortfolioBalance } from '../../styles'
import { calculateBalance } from '../../shared/utils/math';

interface IProps {
  portfolio: IAsset[];
}

class Balance extends React.PureComponent<IProps> {
  public render() {
    const { portfolio } = this.props;

    return (
      <PortfolioBalance>
        ${calculateBalance(portfolio)}
      </PortfolioBalance>
    );
  }
}

const mapStateToProps = (state: IinitialState) => ({
  portfolio: state.AssetsReducer.portfolio
});

export const BalanceJest = Balance;

export default connect(mapStateToProps, null)(Balance);
