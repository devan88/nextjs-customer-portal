import UserList from '@/pages/users';
import { IUsersState } from '@/store/users.slice';
import { renderWithProviders } from '@/utils/test-utils';
import '@testing-library/jest-dom';
import { act } from '@testing-library/react';
import { Session } from 'next-auth';

const session = {
  user: {
    name: 'test',
  },
} as Session;

function getUserState() {
  const userState: IUsersState = {
    users: [
      {
        id: '1',
        avatar: '/next.svg',
        email: 'test@domain.com',
        firstName: 'testFirstName',
        lastName: 'testLastName',
      },
    ],
    pagination: { currentPage: 0, totalPages: 0 },
  };
  return userState;
}

beforeEach(() => {
  fetchMock.resetMocks();
});

test('When there are no users return from api do not display user list', async () => {
  const emptyUserState: IUsersState = { users: [], pagination: { currentPage: 0, totalPages: 0 } };
  fetchMock.mockResponseOnce(JSON.stringify(emptyUserState));
  const component = renderWithProviders(<UserList session={session} />);
  await act(async () => {
    await Promise.resolve(component);
  });
  const emails = component.queryAllByText('test@domain.com');
  expect(emails).toHaveLength(0);
});

test('When there are users return from api display user list', async () => {
  const userState = getUserState();
  fetchMock.mockResponseOnce(JSON.stringify(userState));
  const component = renderWithProviders(<UserList session={session} />);
  await act(async () => {
    await Promise.resolve(component);
  });
  const emails = component.queryAllByText('test@domain.com');
  expect(emails).toHaveLength(1);
});
