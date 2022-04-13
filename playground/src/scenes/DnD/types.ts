import type { List } from '@matti-kit/dnd';

export type Item = {
  id: string;
  children?: Array<Item>;
};

export type OnListChange = React.ComponentProps<typeof List>['onChange'];
