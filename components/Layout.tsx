import { AppShell, Footer, useMantineTheme } from '@mantine/core';
import { ReactNode } from 'react';
import { AppHeader } from './AppHeader';

export function Layout({ children }: { children: ReactNode }) {
  const theme = useMantineTheme();
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      footer={
        <Footer height={60} p="md">
          Made with ❤️
        </Footer>
      }
      header={<AppHeader />}
    >
      {children}
    </AppShell>
  );
}
