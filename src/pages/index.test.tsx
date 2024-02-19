import Home from '@/pages';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { Session } from 'next-auth';
import * as nextAuth from 'next-auth/react';

// jest.mock('next-auth');
//const mockUseSession = getServerSession as jest.Mock;

jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react');
  return {
    __esModule: true,
    ...originalModule,
    signIn: jest.fn(() => {}),
    signOut: jest.fn(() => {}),
  };
});

describe('When user is not signed in', () => {
  test('Sign In button should be visible', () => {
    //getServerSession.mockReturnValueOnce(() => Promise.resolve({} as Session));
    const component = render(<Home session={null} />);
    const button = component.getByRole('button', { name: 'Sign In' });
    expect(button).toBeInTheDocument();
  });

  test('Sign In button should call SignIn method when clicked', () => {
    const component = render(<Home session={null} />);
    const button = component.getByRole('button', { name: 'Sign In' });
    fireEvent.click(button);
    expect(nextAuth.signIn).toHaveBeenCalled();
  });
});

describe('When user is signed in', () => {
  const session = {
    user: {
      name: 'test',
    },
  } as Session;

  test('Sign Out button should be visible', () => {
    const component = render(<Home session={session} />);
    const button = component.getByRole('button', { name: 'Sign Out' });
    expect(button).toBeInTheDocument();
  });

  test('Sign Out button should call SignOut method when clicked', () => {
    const component = render(<Home session={session} />);
    const button = component.getByRole('button', { name: 'Sign Out' });
    fireEvent.click(button);
    expect(nextAuth.signOut).toHaveBeenCalled();
  });
});
