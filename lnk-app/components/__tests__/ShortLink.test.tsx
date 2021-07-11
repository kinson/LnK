import React from 'react';
import renderer from 'react-test-renderer';
import ShortLink from '../ShortLink';

describe('ShortLink component tests', () => {
  it('should render the ShortLink component when it is not hidden', () => {
    const component = renderer.create(
      <ShortLink link="https://google.com" hidden={false} />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should hide the ShortLink component when it is hidden', () => {
    const component = renderer.create(<ShortLink link={null} hidden />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
