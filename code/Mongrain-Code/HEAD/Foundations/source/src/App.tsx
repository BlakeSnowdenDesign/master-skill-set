import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import Assembly2D from '@/pages/assembly-2d';
import Assembly3D from '@/pages/assembly-3d';
import EmbedCodes from '@/pages/embed-codes';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';
import { memoryLocation } from 'wouter/memory-location';

const queryClient = new QueryClient();

// Set at build time for the standalone single-file HTML export (see
// scripts in package.json). Routing then runs in memory, since a pasted
// HTML file has no real URL path to route on.
const EMBED_START = import.meta.env.VITE_EMBED_START as string | undefined;

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Assembly2D} />
        <Route path="/3d" component={Assembly3D} />
        <Route path="/embed" component={EmbedCodes} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {EMBED_START ? (
          <WouterRouter hook={memoryLocation({ path: EMBED_START === '3d' ? '/3d' : '/' }).hook}>
            <Router />
          </WouterRouter>
        ) : (
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
        )}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
