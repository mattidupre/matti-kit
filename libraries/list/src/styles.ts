import { useMemo } from 'react';
import fromDirection from '~/lib/fromDirection';

import type { CSSProperties } from 'react';
import type { Direction } from '@matti-kit/drag';
import type { Spacing, Handle } from './types';

type Options = {
  direction: Direction;
  spacing: Spacing;
  handle: Handle;
};

export const useListStyle = ({
  direction,
  spacing,
  handle,
}: Pick<Options, 'direction' | 'spacing' | 'handle'>) =>
  useMemo<CSSProperties>(
    () => ({
      position: 'relative' as 'relative',
      display: 'flex',
      flexDirection: direction,
      alignItems: 'flex-start',
      [fromDirection(direction, 'rowGap', 'columnGap')]: spacing,
      [fromDirection(direction, 'paddingTop', 'paddingLeft')]: handle ? 10 : 0,
      backgroundColor: 'rgba(0,255,0,0.1)',
      width: fromDirection(
        direction,
        '100%',
        handle ? 'calc(100% - 10px)' : 'calc(100% - 10px)',
      ),
    }),
    [direction, handle, spacing],
  );

export const useListChildStyle = ({
  direction,
  handle,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  spacing,
}: Pick<Options, 'direction' | 'handle' | 'spacing'>) =>
  useMemo<CSSProperties>(
    () => ({
      position: 'relative' as 'relative',
      [fromDirection(direction, 'paddingTop', 'paddingLeft')]: handle ? 10 : 0,
      backgroundColor: 'rgba(255,0,0,0.1)',
      width: fromDirection(
        direction,
        '100%',
        handle ? 'calc(100% - 10px)' : 'calc(100% - 10px)',
      ),
    }),
    [direction, handle],
  );

export const useListDragHandleStyle = ({
  direction,
}: Pick<Options, 'direction'>) =>
  useMemo<CSSProperties>(
    () => ({
      cursor: 'pointer',
      color: 'white',
      backgroundColor: 'black',
      position: 'absolute',
      top: 0,
      left: 0,
      ...fromDirection(
        direction,
        {
          width: '100%',
          height: 10,
        },
        {
          height: '100%',
          width: 10,
        },
      ),
    }),
    [direction],
  );
