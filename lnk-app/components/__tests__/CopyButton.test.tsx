import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react';
import CopyButton from '../CopyButton';

describe('CopyButton component tests', () => {
  it('should render the CopyButton component when it is not disabled', () => {
    const component = renderer.create(
      <CopyButton disabled={false} onClick={jest.fn()} />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render the CopyButton component when it is disabled', () => {
    const component = renderer.create(
      <CopyButton disabled onClick={jest.fn()} />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should call the onClick function when it is pressed', () => {
    const onClickMock = jest.fn();
    const component = render(
      <CopyButton disabled={false} onClick={onClickMock} />
    );

    fireEvent.click(component.queryAllByText(/& Copy/i)[0]);

    expect(onClickMock).toHaveBeenCalled();
  });
});
