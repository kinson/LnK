import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react';
import ShortenButton from '../ShortenButton';

describe('ShortenButton component tests', () => {
  it('should render the ShortenButton component when it not disabled', () => {
    const component = renderer.create(
      <ShortenButton disabled={false} onClick={jest.fn()} />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render the ShortenButton component when it is disabled', () => {
    const component = renderer.create(
      <ShortenButton disabled onClick={jest.fn()} />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should call the onClick prop when clicked', () => {
    const onClickMock = jest.fn();
    const component = render(
      <ShortenButton disabled={false} onClick={onClickMock} />
    );

    fireEvent.click(component.queryAllByText(/Shorten/i)[0]);

    expect(onClickMock).toHaveBeenCalled();
  });
});
