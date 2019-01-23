import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import PlusButton from '../PlusButton'

describe('<PlusButton /> component', () => {
  describe('rendering', () => {
    const wrapper = shallow(<PlusButton toggleSearch={jest.fn()} />);
    it('should render a component matching the snapshot', () => {
      const tree = toJson(wrapper);
      expect(tree).toMatchSnapshot();
      expect(wrapper).toHaveLength(1);
    });
  });
});
