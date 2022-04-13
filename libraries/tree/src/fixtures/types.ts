import type { SimpleTree, FullTree } from '../types';

export type BuildOptions = {
  seed?: string;
  prefix?: string;
};

export type MockTreeValue = {
  name: string;
};

export type MockSimpleTree = SimpleTree<MockTreeValue, MockTreeValue>;

export type MockFullTree = FullTree<MockTreeValue, MockTreeValue>;

export type MockAnyTree = MockSimpleTree | MockFullTree;
