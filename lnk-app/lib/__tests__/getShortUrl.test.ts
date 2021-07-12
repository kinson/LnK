import { formatShortLink } from '../formatShortUrl';
import { getShortUrl } from '../getShortUrl';

const fixture = {
  id: 1,
  long_url: 'http://google.com/long_url',
  path_slug: 'AD2JD',
  inserted_at: '2021-07-11T12:00:00.000Z',
};

const fetchMock = jest.fn();
(global.fetch as jest.Mock) = fetchMock;

describe('getShortUrl() tests', () => {
  beforeEach(fetchMock.mockClear);

  it('should return the corresponding long url if it exists', async () => {
    fetchMock.mockResolvedValue({
      status: 200,
      json: () => Promise.resolve(fixture),
    });

    expect(await getShortUrl(fixture.long_url)).toEqual(
      formatShortLink(fixture.path_slug)
    );
  });

  it('should throw an error if the long url cannot be found', async () => {
    fetchMock.mockResolvedValue({
      status: 404,
    });

    await expect(getShortUrl(fixture.long_url)).rejects.toHaveProperty(
      'message',
      'Could not find short URL'
    );
  });

  it('should throw a generic error if there is some other error fetching the long url', async () => {
    fetchMock.mockResolvedValue({
      status: 500,
    });

    await expect(getShortUrl(fixture.long_url)).rejects.toHaveProperty(
      'message',
      'Failed to fetch URL'
    );
  });
});
