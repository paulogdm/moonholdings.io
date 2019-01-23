import React from 'react'
import Head from 'next/head'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import NomicsLink, { Link } from '../NomicsLink'
import { nomicsLink } from '../../../shared'

describe('<NomicsLink /> component', () => {
  describe('rendering', () => {
    const wrapper = shallow(<NomicsLink />);
    it('should render a component matching the snapshot', () => {
      const tree = toJson(wrapper);
      expect(tree).toMatchSnapshot();
      expect(wrapper).toHaveLength(1);
      expect(wrapper.contains(
        <Link>Powered by <a href={nomicsLink} target="blank">Nomics APIs.</a></Link>
      )).toEqual(true);
    });
  });

  describe('The Nomics API link', () => {
    it('should be correct', () => {
      expect(nomicsLink).toEqual("https://nomics.com/");
    });
  });
});
