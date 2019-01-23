import React from 'react'
import Head from 'next/head'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Meta from '../Meta'

describe('<Astronaut /> component', () => {
  describe('rendering', () => {
    const wrapper = shallow(<Meta />);
    it('should render a component matching the snapshot', () => {
      const tree = toJson(wrapper);
      expect(tree).toMatchSnapshot();
      expect(wrapper).toHaveLength(1);
      expect(wrapper.contains(<Head/>));
    });
  });
});
