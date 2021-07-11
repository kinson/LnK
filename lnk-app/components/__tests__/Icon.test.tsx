import React from 'react';
import renderer from 'react-test-renderer';
import Icon from '../Icon';

describe('Icon component tests', () => {
  it('should render the Icon component', () => {
    const component = renderer.create(<Icon size="large" />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
