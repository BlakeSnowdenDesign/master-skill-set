import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

import Home from '@/pages/home';
import Review from '@/pages/review';
import HeroReview from '@/pages/hero-review';
import HeaderReview from '@/pages/header-review';
import AboutMotionReview from '@/pages/about-motion-review';
import WorkReview from '@/pages/work-review';
import InteriorPage from '@/pages/interior';
import MediaPortfolioSample from '@/pages/media-portfolio-sample';

const INTERIOR_SLUGS = ['work', 'services', '3d-interactive', 'seo-geo', 'website-growth', 'drone-photograph-video', 'about', 'contact'];

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/review" component={Review} />
        <Route path="/review/hero" component={() => <HeroReview />} />
        <Route path="/review/header" component={HeaderReview} />
        <Route path="/review/about-motion" component={AboutMotionReview} />
        <Route path="/review/work" component={WorkReview} />
        <Route path="/media-portfolio-sample" component={MediaPortfolioSample} />
        {INTERIOR_SLUGS.map(slug => (
          <Route key={slug} path={`/${slug}`} component={() => <InteriorPage slug={slug} />} />
        ))}
        <Route path="/review/photography" component={() => <HeroReview kind="photography" />} />
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
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
