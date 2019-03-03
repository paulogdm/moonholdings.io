import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import NomicsLink, { Link } from '../NomicsLink'
import { NOMICS_LINK } from '../../../shared/constants/copy'

describe('<NomicsLink /> component', () => {
  describe('rendering', () => {
    const wrapper = shallow(<NomicsLink />);
    it('should render a component matching the snapshot', () => {
      const tree = toJson(wrapper);
      expect(tree).toMatchSnapshot();
      expect(wrapper).toHaveLength(1);
      expect(wrapper.contains(
        <Link>Powered by <a href={NOMICS_LINK} target="blank">Nomics APIs.</a></Link>
      )).toEqual(true);
    });
  });

  describe('The Nomics API link', () => {
    it('should be correct', () => {
      expect(NOMICS_LINK).toEqual("https://nomics.com/");
    });
  });
});
