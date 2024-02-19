import { AppDispatch } from '@/store/store';
import { setPaginationState, setUsersState } from '@/store/users.slice';
import { User } from '@/types/user.type';

export const getFetcher = (url: string) =>
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

export const GetAllUsers = async (dispatch: AppDispatch) => {
  await getFetcher('/api/users').then((response) => {
    dispatch(setUsersState(response?.users), setPaginationState(response?.pagination));
  });
};

export const GetUser = async (id: string) => {
  return await getFetcher(`/api/users?id=${id}`).then((user: User) => user?.email);
};
