import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@/components/icons/IconCheck';
import { IconX } from '../icons/IconX';

type NotificationProps = {
  id: string;
  title: string;
  message?: string;
};

export function showSuccessNotification({
  id,
  title,
  message = '',
}: NotificationProps) {
  showNotification({
    id,
    color: 'teal',
    title,
    message,
    icon: <IconCheck size={16} />,
    autoClose: 2000,
    styles: (theme) => ({
      root: {
        borderColor: theme.colors.teal[4],
      },
    }),
  });
}

export function showErrorNotification({
  id,
  title,
  message = '',
}: NotificationProps) {
  showNotification({
    id,
    title,
    message,
    autoClose: 2500,
    color: 'red',
    icon: <IconX size={16} />,
    styles: (theme) => ({
      root: {
        borderColor: theme.colors.red[4],
      },
    }),
  });
}
