import ReduxProvider from '@/store/redux-provider';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <Component {...pageProps} />
    </ReduxProvider>
  );
}
