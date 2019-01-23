import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Page from '../Page'

describe('<Page /> component', () => {
  describe('rendering', () => {
    const wrapper = shallow(<Page />);
    it('should render a component matching the snapshot', () => {
      const tree = toJson(wrapper);
      expect(tree).toMatchSnapshot();
      expect(wrapper).toHaveLength(1);
    });
  });
});
