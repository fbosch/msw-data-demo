import React from 'react';
import ReactDOM from 'react-dom/client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './queryClient';
import BookList from './components/BookList';

import './styles.css';

if (import.meta.env.DEV) {
  const { worker } = await import('./api/mocks/browser');
  worker.start({
    onUnhandledRequest: () => {
      return false;
    },
  });
}

const App = () => {
  return (
    <main className='bg-gray-100 min-h-screen'>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BookList />
      </QueryClientProvider>
    </main>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
