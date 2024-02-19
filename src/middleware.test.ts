import * as jwt from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import middleware from './middleware';

const redirectSpy = jest.spyOn(NextResponse, 'redirect');
const nextSpy = jest.spyOn(NextResponse, 'next');

afterEach(() => {
  redirectSpy.mockReset();
});

test('Middleware should redirect to error page when not signed in', async () => {
  jest.spyOn(jwt, 'getToken').mockResolvedValueOnce(null);
  const req = new NextRequest(new Request('https://www.testnextjs.com/users'), {});
  await middleware(req);
  expect(redirectSpy).toHaveBeenCalledTimes(1);
  expect(req.nextUrl.pathname).toBe('/error');
});

test('Middleware should redirect to page when signed in', async () => {
  jest.spyOn(jwt, 'getToken').mockResolvedValueOnce('authToken');
  const req = new NextRequest(new Request('https://www.testnextjs.com/users'), {});
  await middleware(req);
  expect(nextSpy).toHaveBeenCalledTimes(1);
  expect(req.nextUrl.pathname).toBe('/users');
});
