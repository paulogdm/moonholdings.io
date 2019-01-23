import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Welcome from '../Welcome'

describe('<Astronaut /> component', () => {
  describe('rendering', () => {
    const wrapper = shallow(<Welcome />);
    it('should render a component matching the snapshot', () => {
      const tree = toJson(wrapper);
      expect(tree).toMatchSnapshot();
      expect(wrapper).toHaveLength(1);
    });
  });
});
