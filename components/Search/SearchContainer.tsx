import React from 'react'
import { connect } from 'react-redux'
import { bind } from 'decko'

import { findAsset } from '../../services/coinFactory';
import { IAsset } from '../../shared/types'
import { SearchContainerDiv, SearchSection, SearchList, SearchButtons } from '../../styles'
import { coinModel } from '../../shared/models';
import { numberWithCommas } from '../../shared/utils/math'

interface IProps {
  assets: IAsset[];
}

interface IState {
  asset: IAsset;
  searchList: IAsset[];
  saved: IAsset[];
}

class SearchContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      asset: coinModel,
      searchList: [],
      saved: []
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
    const { searchList } = this.state;
    console.log('searchList', searchList);
    return (
      <SearchContainerDiv>
        <SearchSection>
          <input
            type="text"
            placeholder="Search here"
            onChange={this.handleSearchTyping}
          />
          <SearchList>
            { searchList.length > 0
              ? searchList.map((asset, i) => (
                <li
                  key={asset.currency}
                  role="button"
                  tabIndex={i}
                  // onFocus={() => this.setFocus(asset)}
                  onClick={() => this.handleSelect(asset)}
                >
                  <p>{asset.name}</p>
                  <span className="symbol">{asset.currency}</span>
                  <em>${numberWithCommas(Math.round(asset.marketCap))}</em>
                </li>))
              : <li>Loading...</li>
            }
          </SearchList>
        </SearchSection>
        {/* <section>
          ExchangeSelect
        </section> */}
        <SearchButtons>
          SearchButtons
        </SearchButtons>
      </SearchContainerDiv>
    );
  }

  @bind
  handleSearchTyping(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    const { value: searchText } = target;
    console.log('searchText', searchText);

    const search = (text: string) => {
      const { searchList } = this.state;
      const searchedCoins = findAsset(text, searchList);
      this.setState({ searchList: searchedCoins });
    };

    const clearSearch = () => {
      this.setState({ searchList: this.state.saved });
    };

    const handleUpdate = (num: number) => (num > 1 ? search(searchText) : clearSearch());

    return handleUpdate(searchText.length);
  }

  @bind
  handleSelect(asset: IAsset) {
    console.log('handleSelect', asset);
    // this.setState({ focused: coin });
    // this.props.openEdit(true, coin);
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  // addCoin: (...args) => dispatch(addCoin(...args)),
  // updateCoin: (...args) => dispatch(updateCoin(...args)),
  // removeCoin: (...args) => dispatch(removeCoin(...args))
});

// const mapStateToProps = (state: { portfolio: IAsset[] }) => ({
//   assets: state.assets,
//   portfolio: state.portfolio
// });

export const SearchContainerJest = SearchContainer;

export default connect(null, mapDispatchToProps)(SearchContainer);
