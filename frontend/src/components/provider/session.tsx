import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { EMessage, type TResponse } from '~/common/types/response';
import { api } from '~/lib/axios/api';
import { useSessionStore } from '~/stores/use-session';

const SessionProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const session = useSessionStore((s) => s.session);
  const setStatus = useSessionStore((s) => s.setStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      navigate({ to: '/auth/login' });
      return;
    }
  }, [session.status, navigate]);

  useEffect(() => {
    console.log('session', session.status);
  }, [session.status, session]);

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        const response = error.response?.data as TResponse;
        console.log({ originalRequest });
        console.log({ response });

        if (!response) return Promise.reject(error);

        if (response.error === EMessage.TOKEN_EXPIRED && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            setStatus('authenticating');
            const refreshResponse = await api.post('/auth/refresh');
            console.log({ refreshResponse });
            if (refreshResponse.status === 200) {
              setStatus('authenticated');
              return api(originalRequest);
            } else {
              setStatus('unauthenticated');
              navigate({ to: '/auth/login' });
            }
          } catch (err) {
            console.log('Refresh token failed', err);
            setStatus('unauthenticated');
            navigate({ to: '/auth/login' });
            return Promise.reject(err);
          }
        } else if (
          response.message === EMessage.TOKEN_NOT_FOUND ||
          response.message === EMessage.TOKEN_INVALID ||
          response.message === EMessage.TOKEN_MALFORMED ||
          response.message === EMessage.TOKEN_NOT_BEFORE ||
          response.message === EMessage.REFRESH_TOKEN_EXPIRED
        ) {
          setStatus('unauthenticated');
          navigate({ to: '/auth/login' });
          return;
        } else if (response.statusCode === 403 || response.statusCode === 401) {
          setStatus('unauthenticated');
          navigate({ to: '/auth/login' });
          return;
        }

        return Promise.reject(error);
      },
    );

    return () => api.interceptors.response.eject(interceptor);
  }, [navigate, setStatus]);

  return children;
};

export default SessionProvider;
