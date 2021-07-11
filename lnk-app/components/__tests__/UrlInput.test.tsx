import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react';
import UrlInput from '../UrlInput';

describe('UrlInput component tests', () => {
  it('should render the UrlInput component when it not hidden', () => {
    const component = renderer.create(
      <UrlInput hidden={false} url="https://..." updateUrl={jest.fn()} />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should hide the UrlInput component when it is hidden', () => {
    const component = renderer.create(
      <UrlInput hidden url="https://..." updateUrl={jest.fn()} />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should call the updateUrl prop when changed', async () => {
    const updateUrlMock = jest.fn();
    const component = render(
      <UrlInput hidden={false} url="https://..." updateUrl={updateUrlMock} />
    );

    const inputElement = await component.findByPlaceholderText(
      'https://google.com/?q=A+Long+Query+You+Want+To+Share+With...'
    );

    fireEvent.change(inputElement, { target: { value: 'a' } });

    expect(updateUrlMock).toHaveBeenCalled();
  });
});
