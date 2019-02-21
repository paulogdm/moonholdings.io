import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

// @ts-ignore (works with .tsx)
import Astronaut from '../Astronaut.tsx'
import { MOON_HOLDINGS } from '../../../shared/constants/copy'
import { AstronautContainer, Heading } from '../../../styles'

describe('<Astronaut /> component', () => {
  describe('rendering', () => {
    const wrapper = shallow(<Astronaut showLogo={true} />);
    it('should render a component matching the snapshot', () => {
      const tree = toJson(wrapper);
      expect(tree).toMatchSnapshot();
      expect(wrapper).toHaveLength(1);
      expect(wrapper.contains(<AstronautContainer/>));
    });
  });

  describe('showLogo boolean', () => {
    it('should display the Heading if showLogo is true', () => {
      const wrapperShowLogoTrue = shallow(<Astronaut showLogo={true} />);
      expect(wrapperShowLogoTrue.containsAllMatchingElements([
        <Heading>{MOON_HOLDINGS}</Heading>
      ])).toEqual(true);
    });

    it('should not display the Heading if showLogo is false', () => {
      const wrapperShowLogoFalse = shallow(<Astronaut showLogo={false} />);
      expect(wrapperShowLogoFalse.containsAllMatchingElements([
        <Heading>{MOON_HOLDINGS}</Heading>
      ])).toEqual(false);
    });
  });
});
