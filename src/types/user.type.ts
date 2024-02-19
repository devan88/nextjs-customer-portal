import { Pagination } from './pagination.type';

export type User = {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type UsersViewModel = {
  users: User[];
  pagination: Pagination;
};
