import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, queryByAttribute, render } from '@testing-library/react';
import DarkModeToggle from '../DarkModeToggle';

const getById = queryByAttribute.bind(null, 'id');

describe('DarkModeToggle component tests', () => {
  it('should render the DarkModeToggle component', () => {
    const component = renderer.create(<DarkModeToggle />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should toggle the darkMode when when the component is clicked', () => {
    const component = render(<DarkModeToggle />);

    const topLevelDiv = getById(
      component.container,
      'dark-mode-toggle-container'
    );

    expect(getById(component.container, 'moon-icon')).toBeTruthy();
    expect(getById(component.container, 'sun-icon')).toBeFalsy();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fireEvent.click(topLevelDiv!);

    expect(getById(component.container, 'sun-icon')).toBeTruthy();
    expect(getById(component.container, 'moon-icon')).toBeFalsy();
  });
});
