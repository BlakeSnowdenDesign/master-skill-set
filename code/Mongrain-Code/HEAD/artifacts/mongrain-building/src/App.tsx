import { lazy, Suspense } from 'react';
import { Route, Switch } from 'wouter';
import Explorer from '@/components/Explorer';
import { Skeleton } from '@/components/ui/skeleton';

declare const __FOUNDATION_PAGE__: boolean | undefined;
const FoundationSystemsPage = lazy(() => import('@/components/foundation/FoundationSystemsPage'));

function App() {
  const forcedFoundation = typeof __FOUNDATION_PAGE__ !== 'undefined' && __FOUNDATION_PAGE__;
  if (forcedFoundation) return <Suspense fallback={<div className="fixed inset-0 grid place-items-center bg-[#e6eceb]"><Skeleton className="h-12 w-52" /></div>}><FoundationSystemsPage /></Suspense>;
  return <Switch>
    <Route path="/foundation-systems"><Suspense fallback={<div className="fixed inset-0 grid place-items-center bg-[#e6eceb]"><Skeleton className="h-12 w-52" /></div>}><FoundationSystemsPage /></Suspense></Route>
    <Route><Explorer /></Route>
  </Switch>;
}

export default App;
