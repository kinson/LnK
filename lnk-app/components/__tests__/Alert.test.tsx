import React from 'react';
import renderer from 'react-test-renderer';
import Alert from '../Alert';

describe('Alert component tests', () => {
  it('should render the Alert component with a message', () => {
    const component = renderer.create(
      <Alert>Could not find the URL you are looking for.</Alert>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
