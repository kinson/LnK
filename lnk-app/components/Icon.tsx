import React, { ReactElement } from 'react';

type IconSize = 'small' | 'medium' | 'large';

interface Props {
  size: IconSize;
}

export default function Icon({ size }: Props): ReactElement {
  const sizes = {
    small: 'max-h-8',
    medium: 'max-h-12',
    large: 'w-8 md:w-12 lg:w-14 h-auto',
  };

  return (
    <svg
      className={sizes[size]}
      viewBox="0 0 202 211"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g
        transform="translate(6.000000, 6.000000)"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
      >
        <path
          d="M44.1456633,53.6451202 L44.0114514,48.4191476 C43.8554831,42.3460178 48.6522902,37.2963361 54.72542,37.1403677 C54.8195359,37.1379507 54.9136788,37.136742 55.0078257,37.136742 L174.7217,37.136742 C180.796832,37.136742 185.7217,42.0616098 185.7217,48.136742 L185.7217,90.136742 C185.7217,96.2118743 180.796832,101.136742 174.7217,101.136742 L54.4928782,101.136742 C48.507847,101.136742 43.6211034,96.3516523 43.4953082,90.3679432 L43.0445969,68.9289161 L43.0445969,68.9289161"
          id="Rectangle"
          transform="translate(114.383148, 69.136742) rotate(-38.000000) translate(-114.383148, -69.136742) "
        />
        <path
          d="M5.1400357,113.858202 L5.07884581,108.966168 C5.0028636,102.891511 9.86575039,97.9054323 15.9404075,97.8294501 C15.9862645,97.8288765 16.0321248,97.8285897 16.0779854,97.8285897 L135.939536,97.8285897 C142.014668,97.8285897 146.939536,102.753457 146.939536,108.82859 L146.939536,127.579032 L146.939536,127.579032 L146.939536,150.82859 C146.939536,156.903722 142.014668,161.82859 135.939536,161.82859 L15.829257,161.82859 C9.79736303,161.82859 4.89059053,156.971009 4.82981533,150.939422 L4.61559465,129.679257 L4.61559465,129.679257"
          id="Rectangle"
          transform="translate(75.777565, 129.828590) rotate(142.000000) translate(-75.777565, -129.828590) "
        />
      </g>
    </svg>
  );
}
