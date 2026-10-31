import { lazy, Suspense } from 'react';
import { Route, Switch } from 'wouter';
import { Skeleton } from '@/components/ui/skeleton';

declare const __FOUNDATION_PAGE__: boolean;
const FoundationSystemsPage = lazy(() => import('@/components/foundation/FoundationSystemsPage'));
// Lazy so Foundation-only Wix builds leave the hospital explorer (and its assets) out.
const Explorer = __FOUNDATION_PAGE__ ? () => null : lazy(() => import('@/components/Explorer'));

function App() {
  if (__FOUNDATION_PAGE__) return <Suspense fallback={<div className="fixed inset-0 grid place-items-center bg-[#e6eceb]"><Skeleton className="h-12 w-52" /></div>}><FoundationSystemsPage /></Suspense>;
  return <Switch>
    <Route path="/foundation-systems"><Suspense fallback={<div className="fixed inset-0 grid place-items-center bg-[#e6eceb]"><Skeleton className="h-12 w-52" /></div>}><FoundationSystemsPage /></Suspense></Route>
    <Route><Suspense fallback={null}><Explorer /></Suspense></Route>
  </Switch>;
}

export default App;
