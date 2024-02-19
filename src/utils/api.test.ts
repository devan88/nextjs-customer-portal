import fetchMock from 'jest-fetch-mock';
import { GetUser } from './api';

beforeEach(() => {
  fetchMock.resetMocks();
});

test('GetUser should return email when api returns data', async () => {
  fetchMock.mockResponseOnce(JSON.stringify({ email: 'user@email.com' }));
  const response = await GetUser('1');
  expect(response).toBe('user@email.com');
});
