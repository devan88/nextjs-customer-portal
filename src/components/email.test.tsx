import { User } from '@/types/user.type';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import Email from './email';

beforeEach(() => {
  fetchMock.resetMocks();
});

test('When the user clicks a masked email show unmasked email', async () => {
  fetchMock.mockResponseOnce(
    JSON.stringify({
      email: 'user@test.com',
    } as User),
  );
  render(<Email id="id1" maskedEmail="****@test.com" />);
  const maskedEmail = screen.getByText('****@test.com');
  await act(async () => {
    fireEvent.click(maskedEmail);
  });
  await waitFor(() => {
    const email = screen.getByText('user@test.com');
    expect(email).toBeInTheDocument();
  });
});

test('When the user clicks a unmasked email show masked email', async () => {
  fetchMock.mockResponseOnce(
    JSON.stringify({
      email: 'user@test.com',
    } as User),
  );
  render(<Email id="id1" maskedEmail="****@test.com" />);
  const maskedEmail = screen.getByText('****@test.com');
  await act(async () => {
    fireEvent.click(maskedEmail);
  });
  await act(async () => {
    const email = screen.getByText('user@test.com');
    fireEvent.click(email);
  });
  await waitFor(() => {
    const email = screen.getByText('****@test.com');
    expect(email).toBeInTheDocument();
  });
});
