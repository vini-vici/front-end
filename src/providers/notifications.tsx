import React, { createContext, ReactNode, useContext, PropsWithChildren } from 'react';

interface NotificationsContext {
  add(noti: { type: string; content: ReactNode }): void;
}

const notificationsContext = createContext<NotificationsContext | undefined>(undefined);

export function useNotification(): NotificationsContext {
  return useContext(notificationsContext);
}

export default function NotificationsProvider({
  children
}: PropsWithChildren<unknown>): JSX.Element {
  return (
    <notificationsContext.Provider value={{
      add(n) {
        console.info(n);
      }
    }}>
      {children}
    </notificationsContext.Provider>
  );
}
