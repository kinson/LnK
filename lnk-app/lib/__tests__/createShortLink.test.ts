import { createShortLink } from '../createShortLink';

const fixture = {
  id: 1,
  long_url: 'http://google.com/long_url',
  path_slug: 'AD2JD',
  inserted_at: '2021-07-11T12:00:00.000Z',
};

const host = 'http://localhost:8080';

const fetchMock = jest.fn();
(global.fetch as jest.Mock) = fetchMock;

describe('createShortLink() tests', () => {
  beforeEach(fetchMock.mockClear);

  it('should create a new link and return the shortened url', async () => {
    fetchMock.mockResolvedValue({
      status: 201,
      json: () => Promise.resolve(fixture),
    });

    expect(await createShortLink(fixture.long_url)).toEqual(
      `${host}/${fixture.path_slug}`
    );
  });

  it('should throw an error if the URL does not have a protocol', async () => {
    const badUrl = 'google.com';

    await expect(createShortLink(badUrl)).rejects.toHaveProperty(
      'message',
      'URL must have format http(s)://site.com'
    );
  });

  it('should throw an error if the URL does not have a domain extension', async () => {
    const badUrl = 'http://google.';

    await expect(createShortLink(badUrl)).rejects.toHaveProperty(
      'message',
      'URL must have format http(s)://site.com'
    );
  });

  it('should throw an error with the server message if the status is 400', async () => {
    const messageObject = { message: 'URL is too long' };
    fetchMock.mockResolvedValue({
      status: 400,
      json: () => Promise.resolve(messageObject),
    });

    await expect(createShortLink(fixture.long_url)).rejects.toMatchObject(
      messageObject
    );
  });

  it('should re query the backend if the particular URL has already been shortened', async () => {
    const messageObject = { message: 'URL already exists' };
    fetchMock
      .mockResolvedValueOnce({
        status: 409,
        json: () => Promise.resolve(messageObject),
      })
      .mockResolvedValueOnce({
        status: 200,
        json: () => Promise.resolve(fixture),
      });

    expect(await createShortLink(fixture.long_url)).toEqual(
      `${host}/${fixture.path_slug}`
    );
  });

  it('should throw an error a generic error if the status is not a 201', async () => {
    const messageObject = { message: 'Server error' };
    fetchMock.mockResolvedValue({
      status: 500,
      json: () => Promise.resolve(messageObject),
    });

    await expect(createShortLink(fixture.long_url)).rejects.toHaveProperty(
      'message',
      'Could not shorten URL'
    );
  });
});
