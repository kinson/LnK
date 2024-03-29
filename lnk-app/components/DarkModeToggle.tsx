import React, { useState, ReactElement } from 'react';
import { ThemeContext, ThemeContextState } from '../contexts/ThemeContext';
import { useDeviceTheme } from '../hooks/useDeviceTheme';

export default function DarkModeToggle(): ReactElement {
  const [darkMode, setDarkMode] = useState(false);
  useDeviceTheme(setDarkMode);

  const toggleDarkMode = (value: ThemeContextState) => () => {
    value.toggleTheme();
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Consumer>
      {(value) => (
        <button
          type="button"
          id="dark-mode-toggle-container"
          onClick={toggleDarkMode(value)}
          className="ml-auto mr-2 flex items-center cursor-pointer"
        >
          <div className="relative">
            <input
              defaultChecked={darkMode}
              type="checkbox"
              id="dark-mode-toggle"
              className="sr-only"
              aria-label="Dark Mode Toggle"
            />
            <div className="block bg-gray-600 w-14 h-8 rounded-full" />
            <div
              className={`${
                darkMode && 'transform translate-x-full'
              } absolute left-1 top-1 bg-white dark:bg-purple w-6 h-6 rounded-full flex items-center justify-center transition-all`}
            >
              {darkMode ? (
                <svg
                  id="moon-icon"
                  viewBox="0 0 97 158"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 ml-1 text-white"
                >
                  <path d="M18,0.5 C39.6771764,0.5 59.3021764,9.28641179 73.5078823,23.4921177 C87.7135882,37.6978236 96.5,57.3228236 96.5,79 C96.5,100.677176 87.7135882,120.302176 73.5078823,134.507882 C59.3021764,148.713588 39.6771764,157.5 18,157.5 C12.5891637,157.5 7.30617797,156.952622 2.20396947,155.909667 C19.0949556,151.484612 33.7935641,141.64268 44.331072,128.351675 C55.0804392,114.793451 61.5,97.6464258 61.5,79 C61.5,60.3535766 55.0804409,43.2065533 44.3310574,29.6483015 C33.7928623,16.3564226 19.093019,6.51402742 2.20435475,2.0894815 C7.30689791,1.047303 12.5895324,0.5 18,0.5 Z" />
                </svg>
              ) : (
                <svg
                  id="sun-icon"
                  viewBox="0 0 170 170"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  fill="currentColor"
                  className="h-4 text-black"
                >
                  <g
                    id="Group-2"
                    transform="translate(80.000000, 79.000000) rotate(-4.000000) translate(-80.000000, -79.000000) translate(1.000000, -0.000000)"
                  >
                    <circle id="Oval" cx="79" cy="79" r="22.5" />
                    <g
                      id="Group"
                      strokeLinecap="square"
                      strokeWidth="5"
                      stroke="currentColor"
                    >
                      <line
                        x1="111.085701"
                        y1="51.5309469"
                        x2="139.247251"
                        y2="27.5243795"
                      />
                      <line
                        x1="121.11157"
                        y1="82.2644628"
                        x2="158"
                        y2="85.2024793"
                      />
                      <line
                        x1="104.160729"
                        y1="137.400592"
                        x2="132.783944"
                        y2="112.93236"
                        transform="translate(118.472337, 125.166476) rotate(90.000000) translate(-118.472337, -125.166476) "
                      />
                      <line
                        x1="75.7355372"
                        y1="121.11157"
                        x2="72.7975207"
                        y2="158"
                      />
                      <line
                        x1="18.7527491"
                        y1="130.475621"
                        x2="46.9142993"
                        y2="106.469053"
                        transform="translate(32.833524, 118.472337) rotate(180.000000) translate(-32.833524, -118.472337) "
                      />
                      <line
                        x1="36.8884298"
                        y1="75.7355372"
                        x2="0"
                        y2="72.7975207"
                      />
                      <line
                        x1="25.2160557"
                        y1="45.0676403"
                        x2="53.8392707"
                        y2="20.5994081"
                        transform="translate(39.527663, 32.833524) rotate(270.000000) translate(-39.527663, -32.833524) "
                      />
                      <line
                        x1="82.2644628"
                        y1="36.8884298"
                        x2="85.2024793"
                        y2="0"
                      />
                    </g>
                  </g>
                </svg>
              )}
            </div>
          </div>
        </button>
      )}
    </ThemeContext.Consumer>
  );
}
