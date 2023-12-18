import HomePage from './pages/home';
import { ThemeProvider } from './providers/theme-provider';
import { QueryProvider } from './providers/query-provider';
import { StoreProvider } from './providers/store-provider';

export const App = () => {
  return (
    <StoreProvider>
      <ThemeProvider>
        <QueryProvider>
          <HomePage />
        </QueryProvider>
      </ThemeProvider>
    </StoreProvider>
  );
};

export default App;
