import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import BlockBox from '../BlockBox';

const props = {
  content: 'foo',
};

describe('<BlockBox />', () => {
  describe('when shallow rendered', () => {
    const wrapper = shallow(
      <BlockBox {...props} />,
    );
    it('should create a snapshot', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
