import React from 'react';
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BookList from './components/BookList';

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
    <div>
      <QueryClientProvider client={queryClient}>
        Books:
        <BookList />
      </QueryClientProvider>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
