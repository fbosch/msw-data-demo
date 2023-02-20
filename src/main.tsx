import React from 'react';
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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

const queryClient = new QueryClient();

const App = () => {
  return (
    <main className='bg-gray-100 min-h-screen'>
      <QueryClientProvider client={queryClient}>
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
