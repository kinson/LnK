import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Theme, ThemeContext } from '../ThemeContext';

describe('ThemeContext tests', () => {
  it('should create a ThemeContext for dark mode and handle toggleTheme', () => {
    const toggleThemeMock = jest.fn();

    const component = render(
      <ThemeContext.Provider
        value={{ theme: Theme.DARK, toggleTheme: toggleThemeMock }}
      >
        <ThemeContext.Consumer>
          {(value) => (
            <button type="button" onClick={value.toggleTheme}>
              {value.theme}
            </button>
          )}
        </ThemeContext.Consumer>
      </ThemeContext.Provider>
    );

    const button = component.getByText(/dark/i);
    expect(button).toBeTruthy();

    fireEvent.click(button);
    expect(toggleThemeMock).toHaveBeenCalled();
  });

  it('should create a ThemeContext for light mode', () => {
    const component = render(
      <ThemeContext.Provider
        value={{ theme: Theme.LIGHT, toggleTheme: jest.fn() }}
      >
        <ThemeContext.Consumer>
          {(value) => <button type="button">{value.theme}</button>}
        </ThemeContext.Consumer>
      </ThemeContext.Provider>
    );

    const button = component.getByText(/light/i);
    expect(button).toBeTruthy();
  });
});
