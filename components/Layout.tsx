import { AppShell, useMantineTheme } from '@mantine/core';
import { ReactNode } from 'react';
import { AppFooter } from './AppFooter';
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
      footer={<AppFooter />}
      header={<AppHeader />}
    >
      {children}
    </AppShell>
  );
}
