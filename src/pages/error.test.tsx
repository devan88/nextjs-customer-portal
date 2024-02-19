import Error from '@/pages/error';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import * as nextAuth from 'next-auth/react';

jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react');
  return {
    __esModule: true,
    ...originalModule,
    signIn: jest.fn(() => {}),
  };
});

test('Sign In button should call SignIn method when clicked', () => {
  const component = render(<Error />);
  const button = component.getByRole('button', { name: 'Sign In' });
  fireEvent.click(button);
  expect(nextAuth.signIn).toHaveBeenCalled();
});
