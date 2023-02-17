import react from '@vitejs/plugin-react'


export default {
  plugins: [react()],
  optimizeDeps: {
    include: ['react', 'react-dom', 'msw', 'clsx', '@tanstack/react-query'],
  },
}
