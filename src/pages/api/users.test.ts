import { NextApiRequest, NextApiResponse } from 'next';
import userApi from './users';

interface UserModel {
  id: string;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
}

const defaultUserModel = () => {
  return {
    page: 1,
    total_pages: 2,
    data: [
      {
        id: '1',
        avatar: 'image1',
        first_name: 'Gfirst1',
        last_name: 'Wlast1',
        email: 'email1@.domain.com',
      },
    ],
  };
};

const res: jest.Mocked<NextApiResponse> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
} as unknown as jest.Mocked<NextApiResponse>;

beforeEach(() => {
  fetchMock.resetMocks();
});

test('When calling api/users, user list has more than 1 page combine all to single list', async () => {
  const firstModel = defaultUserModel();
  const secondModel = defaultUserModel();
  secondModel.data[0].id = '2';
  secondModel.page = 2;
  const expectedResponseModel = {
    pagination: {
      currentPage: 2,
      totalPages: 2,
    },
    users: [
      {
        avatar: 'image1',
        email: '***@reqres.in',
        firstName: 'Gfirst1',
        id: '1',
        lastName: 'Wlast1',
      },
      {
        avatar: 'image1',
        email: '***@reqres.in',
        firstName: 'Gfirst1',
        id: '2',
        lastName: 'Wlast1',
      },
    ],
  };
  fetchMock
    .mockReturnValueOnce(Promise.resolve({ json: () => Promise.resolve(firstModel) } as Response))
    .mockReturnValueOnce(Promise.resolve({ json: () => Promise.resolve(secondModel) } as Response));
  const req: NextApiRequest = {
    url: '/api/users',
    query: {
      id: '',
    },
  } as unknown as NextApiRequest;
  await userApi(req, res);
  expect(res.json).toHaveBeenCalledWith(expectedResponseModel);
});

test('When calling api/users with id param should return user with unmasked email ', async () => {
  const model = {
    data: {
      id: '1',
      avatar: 'image1',
      first_name: 'Gfirst1',
      last_name: 'Wlast1',
      email: 'email1@.domain.com',
    },
  };
  const expectedResponseModel = {
    id: '1',
    avatar: 'image1',
    firstName: 'Gfirst1',
    lastName: 'Wlast1',
    email: 'email1@.domain.com',
  };
  fetchMock.mockReturnValueOnce(
    Promise.resolve({ json: () => Promise.resolve(model) } as Response),
  );
  const req: NextApiRequest = {
    url: '/api/users',
    query: {
      id: '1',
    },
  } as unknown as NextApiRequest;
  await userApi(req, res);
  expect(res.json).toHaveBeenCalledWith(expectedResponseModel);
});
