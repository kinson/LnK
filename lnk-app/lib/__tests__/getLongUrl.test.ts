import { getLongUrl } from '../getLongUrl';

const fixture = {
  id: 1,
  long_url: 'http://google.com/long_url',
  path_slug: 'AD2JD',
  inserted_at: '2021-07-11T12:00:00.000Z',
};

const fetchMock = jest.fn();
(global.fetch as jest.Mock) = fetchMock;

describe('getLongUrlTest() tests', () => {
  beforeEach(fetchMock.mockClear);

  it('should return the corresponding long url if it exists', async () => {
    fetchMock.mockResolvedValue({
      status: 200,
      json: () => Promise.resolve(fixture),
    });

    expect(await getLongUrl(fixture.path_slug)).toEqual(fixture.long_url);
  });

  it('should throw an error if the long url cannot be found', async () => {
    fetchMock.mockResolvedValue({
      status: 404,
    });

    await expect(getLongUrl(fixture.path_slug)).rejects.toHaveProperty(
      'message',
      'Could not find URL for path'
    );
  });

  it('should throw a generic error if there is some other error fetching the long url', async () => {
    fetchMock.mockResolvedValue({
      status: 500,
    });

    await expect(getLongUrl(fixture.path_slug)).rejects.toHaveProperty(
      'message',
      'Failed to fetch URL'
    );
  });
});
