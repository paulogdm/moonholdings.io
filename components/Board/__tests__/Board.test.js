import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Board from '../Board'
import { Welcome, Astronaut, NomicsLink, PlusButton } from '../../'

describe('<Astronaut /> component', () => {
  describe('rendering', () => {
    const wrapper = shallow(<Board />);
    it('should render a component matching the snapshot', () => {
      const tree = toJson(wrapper);
      expect(tree).toMatchSnapshot();
      expect(wrapper).toHaveLength(1);
      expect(wrapper.contains(<Welcome/>));
      expect(wrapper.contains(<Astronaut showLogo={true}/>));
      expect(wrapper.contains(<NomicsLink/>));
      expect(wrapper.contains(<PlusButton toggleSearch={jest.fn()}/>));
    });
  });
});
