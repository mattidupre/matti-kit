import React, { useState, useCallback } from 'react';
import { RecursiveList } from '@matti-kit/list';
import { DragProvider } from '@matti-kit/drag';
import { mapDownTree } from '@matti-kit/tree';
// eslint-disable-next-line import/no-extraneous-dependencies
import Chance from 'chance';

import type { SimpleTree } from '@matti-kit/tree';
import type { RecursiveListTree } from '@matti-kit/list';

type ListState = RecursiveListTree<
  { meta: { name: never; key: string } },
  { meta: { name: string; key?: string } }
>;

const chance = new Chance(1);

const getDirection = (topDirection: 'ROW' | 'COLUMN', depth: number) => {
  if (topDirection === 'ROW') {
    return depth % 2 === 0 ? 'row' : 'column';
  }
  return depth % 2 === 0 ? 'column' : 'row';
};

const getParentValue = (key: string) => ({ value: { key } });
const getChildValue = () => ({ value: { name: chance.name() as string } });

const buildMockTree = (topDirection: 'ROW' | 'COLUMN') => {
  const tree: SimpleTree<{ name: string }, { key: string }> = {
    ...getParentValue('list_1'),
    children: [
      {
        ...getParentValue('list_2'),
        children: [
          { ...getChildValue() },
          { ...getChildValue() },
          { ...getChildValue() },
          { ...getChildValue() },
          { ...getChildValue() },
        ],
      },
      {
        ...getParentValue('list_3'),
        children: [
          { ...getChildValue() },
          { ...getChildValue() },
          { ...getChildValue() },
        ],
      },
      {
        ...getParentValue('list_4'),
        children: [
          { ...getChildValue() },
          { ...getChildValue() },
          {
            ...getParentValue('list_5'),
            children: [
              { ...getChildValue() },
              { ...getChildValue() },
              { ...getChildValue() },
              { ...getChildValue() },
              { ...getChildValue() },
            ],
          },
          { ...getChildValue() },
          { ...getChildValue() },
          { ...getChildValue() },
        ],
      },
      {
        ...getParentValue('list_6'),
        children: [
          { ...getChildValue() },
          { ...getChildValue() },
          { ...getChildValue() },
          { ...getChildValue() },
          { ...getChildValue() },
        ],
      },
    ],
  };

  return mapDownTree(tree, {
    callback: (thisTree, location) => {
      return {
        listProps: {
          meta: { ...thisTree.value },
          direction: getDirection(topDirection, location.length),
        },
      };
    },
  }) as ListState;
};

const FullDragList: React.VFC = () => {
  const [tree1State] = useState(buildMockTree('COLUMN'));
  // const [tree2State] = useState(buildMockTree('ROW'));

  const renderChild = useCallback(({ name, key }) => key ?? name, []);

  return (
    <div
      style={{
        width: 1000,
      }}
    >
      <h1>Recursive List 1</h1>
      <RecursiveList
        tree={tree1State}
        renderChild={renderChild}
        getKeyFromMeta={renderChild}
      />
      {/* <h1>Recursive List 2</h1>
      <RecursiveList
        tree={tree2State}
        renderChild={renderChild}
        getKeyFromMeta={renderChild}
      /> */}
    </div>
  );
};

const DnD: React.VFC = () => {
  return (
    <DragProvider>
      <FullDragList />
    </DragProvider>
  );
};

export default DnD;
