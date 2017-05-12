import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import BlockBox from '../BlockBox';

const props = {
  content: 'foo',
  align: 'start',
  colorIndex: 'brand',
};

describe('<BlockBox />', () => {
  describe('when shallow rendered', () => {
    it('should create a snapshot with default props', () => {
      const wrapper = shallow(
        <BlockBox />,
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should create a snapshot with custom props', () => {
      const wrapper = shallow(
        <BlockBox {...props} />,
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should create a snapshot with borderColor prop', () => {
      const final = {
        ...props,
        borderColor: '#fff',
      };
      const wrapper = shallow(
        <BlockBox {...final} />,
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
