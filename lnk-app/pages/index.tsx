import { getLongUrl } from '../lib/getLongUrl';
import HomeScreen from '../screen/home';

interface Props {
  redirectError?: boolean
}

export default function Home(props: Props) {
  return <HomeScreen {...props} />;
}

Home.getInitialProps = async ({ query, res }: any) => {
  if (!query.path) {
    return {};
  }

  try {
    const longUrl = await getLongUrl(query.path);

    res.writeHead(302, {
      Location: longUrl
    });
    res.end();
  } catch (err) {
    return { redirectError: true };
  }
};
