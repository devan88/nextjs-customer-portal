// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User, UsersViewModel } from '@/types/user.type';
import type { NextApiRequest, NextApiResponse } from 'next';

interface UserModel {
  id: string;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
}

const API_URL = process.env.USERS_URL;
const FIRST_NAME = 'G';
const LAST_NAME = 'W';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UsersViewModel | User>,
) {
  // https://reqres.in/api/users
  const userId = req.query['id'] as string;
  if (userId) {
    await getUser(userId)?.then((data) => res.status(200).json(data));
  } else {
    await getAllUsers()?.then((data) => res.status(200).json(data!));
  }
}

const getAllUsers = async (page: number = 1) => {
  let userViewModel: UsersViewModel = {
    pagination: {
      currentPage: 0,
      totalPages: 0,
    },
    users: [],
  };
  while (true) {
    const data = await getUsers(page);
    if (!data) {
      return userViewModel;
    }
    userViewModel.users = [...userViewModel.users, ...data.users];
    userViewModel.pagination = data.pagination;
    page++;
    if (data.pagination.currentPage >= data.pagination.totalPages) {
      return userViewModel;
    }
  }
};

const getUsers = (page: number) => {
  try {
    return fetch(`${API_URL}users?page=${page}`)
      .then((res) => res.json())
      .then((res) => mapDataToUsersViewModel(res));
  } catch (err) {
    console.error(err);
  }
};

const getUser = (id: string) => {
  try {
    return fetch(`${API_URL}users/${id}`)
      .then((res) => res.json())
      .then((res) => mapDataToUserModel(res.data, false));
  } catch (err) {
    console.error(err);
  }
};

const mapDataToUserModel = (user: UserModel, maskEmail = true) => {
  return {
    id: user.id,
    avatar: user.avatar,
    firstName: user.first_name,
    lastName: user.last_name,
    email: maskEmail ? '***@reqres.in' : user.email,
  } as User;
};

const mapDataToUsersViewModel = (responseJson: {
  page: number;
  total_pages: number;
  data: UserModel[];
}) => {
  return {
    pagination: {
      currentPage: responseJson.page,
      totalPages: responseJson.total_pages,
    },
    users: responseJson.data.filter(filterUser).map((user: UserModel) => {
      return mapDataToUserModel(user);
    }),
  } as UsersViewModel;
};

const filterUser = (user: UserModel): boolean => {
  return user.first_name.startsWith(FIRST_NAME) || user.last_name.startsWith(LAST_NAME);
};
