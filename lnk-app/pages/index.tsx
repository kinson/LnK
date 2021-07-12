/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement } from 'react';
import { NextPageContext } from 'next';
import { getLongUrl } from '../lib/getLongUrl';
import HomeScreen from '../screens/Home';

interface Props {
  redirectError?: boolean;
}

export default function Home(props: Props): ReactElement {
  return <HomeScreen {...props} />;
}

Home.getInitialProps = async ({ query, res }: NextPageContext) => {
  if (!query.path) {
    return { redirectError: false };
  }

  try {
    // query[x] can be a string or array of strings, so use the first
    // element if it is an array
    const path = query.path instanceof Array ? query.path[0] : query.path;
    const longUrl = await getLongUrl(path);

    if (!res) return { redirectError: true };

    res.writeHead(302, {
      Location: longUrl,
    });
    res.end();
  } catch (err) {
    return { redirectError: true };
  }
};
