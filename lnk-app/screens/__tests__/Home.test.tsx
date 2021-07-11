import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../Home';

describe('Home screen tests', () => {
  it('should render the Home screen', () => {
    const component = renderer.create(<Home />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should display an error message when the long url cannot be found', () => {
    const component = renderer.create(<Home redirectError />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
