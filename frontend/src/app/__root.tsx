import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { Affix, Button, Transition } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { FaArrowUp } from 'react-icons/fa';

import SessionProvider from '~/components/provider/session';

import type { ISession } from '~/stores/use-session';
import type { QueryClient } from '@tanstack/react-query';

interface RouterContext {
  session: ISession;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootRouteComponent,
});

function RootRouteComponent() {
  const [scroll, scrollTo] = useWindowScroll();
  return (
    <SessionProvider>
      <Outlet />
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button style={transitionStyles} bdrs={'xl'} onClick={() => scrollTo({ y: 0 })}>
              <FaArrowUp size={16} />
            </Button>
          )}
        </Transition>
      </Affix>
    </SessionProvider>
  );
}
