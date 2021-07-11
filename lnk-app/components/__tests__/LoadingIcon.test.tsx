import React from 'react';
import renderer from 'react-test-renderer';
import LoadingIcon from '../LoadingIcon';

describe('LoadingIcon component tests', () => {
  it('should render the LoadingIcon component when it is shown', () => {
    const component = renderer.create(<LoadingIcon show />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render the LoadingIcon component when it is hidden', () => {
    const component = renderer.create(<LoadingIcon show={false} />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
