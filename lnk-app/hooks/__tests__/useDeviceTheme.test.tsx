import React from 'react';
import { render } from '@testing-library/react';
import { useDeviceTheme } from '../useDeviceTheme';
import { Theme } from '../../contexts/ThemeContext';

function SampleComponent({ setThemeFn }: { setThemeFn: jest.Mock }) {
  useDeviceTheme(setThemeFn);

  return <div />;
}

describe('useDeviceTheme hook tests', () => {
  it('should set the initial theme to dark mode if it is set in localStorage', () => {
    const setDarkModeMock = jest.fn();

    global.localStorage.theme = Theme.DARK;

    render(<SampleComponent setThemeFn={setDarkModeMock} />);

    expect(setDarkModeMock).toHaveBeenCalledWith(true);
  });

  it('should set the initial theme to light mode if it is not set in localStorage', () => {
    const setDarkModeMock = jest.fn();

    global.localStorage.theme = undefined;

    render(<SampleComponent setThemeFn={setDarkModeMock} />);

    expect(setDarkModeMock).toHaveBeenCalledWith(false);
  });
});
