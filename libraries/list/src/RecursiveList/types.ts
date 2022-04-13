import type { ReactNode } from 'react';
import type { FullTree } from '@matti-kit/tree';
import type { Assign } from 'utility-types';
import type { Meta } from '@matti-kit/drag';
import type { Direction, ListPayload } from '~/types';

export type RecursiveListTree<
  ParentValue extends Record<string, any> = {},
  ChildValue extends Record<string, any> = ParentValue,
> = FullTree<
  Assign<
    ChildValue,
    {
      listProps: {
        direction: Direction;
        meta: Meta;
        spacing: number;
      };
    }
  >,
  Assign<
    ParentValue,
    {
      listProps: {
        direction: Direction;
        meta: Meta;
        spacing: number;
      };
    }
  >
>;

export type OnListChange = (payload: ListPayload) => void;

export type GetKeyFromMeta = (
  meta: Meta,
  indexInParent: number,
) => string | number;

export type RenderChild = (meta: Meta) => ReactNode;
