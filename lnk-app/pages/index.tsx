/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement } from 'react';
import { getLongUrl } from '../lib/getLongUrl';
import HomeScreen from '../screens/Home';

interface Props {
  redirectError?: boolean;
}

export default function Home(props: Props): ReactElement {
  return <HomeScreen {...props} />;
}

Home.getInitialProps = async ({ query, res }) => {
  if (!query.path) {
    return {};
  }

  try {
    const longUrl = await getLongUrl(query.path);

    res.writeHead(302, {
      Location: longUrl,
    });
    res.end();
  } catch (err) {
    return { redirectError: true };
  }
};
