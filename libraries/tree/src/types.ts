type WithValue<Tree extends Record<string, any>, Value> = Tree &
  (Value extends void | never
    ? {
        value?: never;
      }
    : {
        value: Value;
      });

// TODO: Readonly trees? use DeepReadOnly from utility-types? or recursive mapped types?
//    https://stackoverflow.com/questions/42999983/typescript-removing-readonly-modifier

type WithBrandedValues<BottomValue, ParentValue, Tree> = Omit<
  Tree,
  '_TreeIsBrandedWithValues' | '_BottomValue' | '_ParentValue'
> & {
  _TreeIsBranded?: true;
  _BottomValue?: BottomValue;
  _ParentValue?: ParentValue;
};

export type BottomTreeValueFromTree<Tree extends AnyTree> = NonNullable<
  Tree['_BottomValue']
>;

export type ParentTreeValueFromTree<Tree extends AnyTree> = NonNullable<
  Tree['_ParentValue']
>;

export type FullTreeChild<BottomValue = unknown, ParentValue = BottomValue> =
  | FullTreeAtBottom<BottomValue, ParentValue>
  | FullTreeAtMiddle<BottomValue, ParentValue>;

export type FullTreeChildFromTree<Tree extends AnyTree> = FullTreeChild<
  BottomTreeValueFromTree<Tree>,
  ParentTreeValueFromTree<Tree>
>;

export type FullTreeParent<BottomValue = unknown, ParentValue = BottomValue> =
  | FullTreeAtMiddle<BottomValue, ParentValue>
  | FullTreeAtTop<BottomValue, ParentValue>;

export type FullTreeParentFromTree<Tree extends AnyTree> = FullTreeParent<
  BottomTreeValueFromTree<Tree>,
  ParentTreeValueFromTree<Tree>
>;

export type FullTreeAtBottom<
  BottomValue = unknown,
  ParentValue = BottomValue
> = WithBrandedValues<
  BottomValue,
  ParentValue,
  WithValue<
    {
      parent: FullTreeAtMiddle<BottomValue, ParentValue>;
      indexInParent: number;
      location: Array<number>;
      children: null;
    },
    BottomValue
  >
>;

export type FullTreeAtBottomFromTree<Tree extends AnyTree> = FullTreeAtBottom<
  BottomTreeValueFromTree<Tree>,
  ParentTreeValueFromTree<Tree>
>;

export type FullTreeAtMiddle<
  BottomValue = unknown,
  ParentValue = BottomValue
> = WithBrandedValues<
  BottomValue,
  ParentValue,
  WithValue<
    {
      parent: FullTreeAtMiddle<BottomValue, ParentValue>;
      indexInParent: number;
      location: Array<number>;
      children: Array<FullTreeChild<BottomValue, ParentValue>>;
    },
    ParentValue
  >
>;

export type FullTreeAtMiddleFromTree<Tree extends AnyTree> = FullTreeAtMiddle<
  BottomTreeValueFromTree<Tree>,
  ParentTreeValueFromTree<Tree>
>;

export type FullTreeAtTop<
  BottomValue = unknown,
  ParentValue = BottomValue
> = WithBrandedValues<
  BottomValue,
  ParentValue,
  {
    parent: null;
    indexInParent: -1;
    location: [];
  } & (
    | WithValue<
        {
          children: Array<FullTreeChild<BottomValue, ParentValue>>;
        },
        ParentValue
      >
    | WithValue<
        {
          children: null;
          value: BottomValue;
        },
        BottomValue
      >
  )
>;

export type FullTreeAtTopFromTree<Tree extends AnyTree> = FullTreeAtTop<
  BottomTreeValueFromTree<Tree>,
  ParentTreeValueFromTree<Tree>
>;

export type FullTree<BottomValue = unknown, ParentValue = BottomValue> =
  | FullTreeAtTop<BottomValue, ParentValue>
  | FullTreeAtMiddle<BottomValue, ParentValue>
  | FullTreeAtBottom<BottomValue, ParentValue>;

export type FullTreeFromTree<Tree extends AnyTree> = FullTree<
  BottomTreeValueFromTree<Tree>,
  ParentTreeValueFromTree<Tree>
>;

export type SimpleTreeChild<
  BottomValue = unknown,
  ParentValue = BottomValue
> = WithBrandedValues<
  BottomValue,
  ParentValue,
  WithValue<
    {
      children?: never;
    },
    BottomValue
  >
>;

export type SimpleTreeChildFromTree<Tree extends SimpleTree> = SimpleTreeChild<
  BottomTreeValueFromTree<Tree>,
  ParentTreeValueFromTree<Tree>
>;

export type SimpleTreeParent<
  BottomValue = unknown,
  ParentValue = BottomValue
> = WithBrandedValues<
  BottomValue,
  ParentValue,
  WithValue<
    {
      children: Array<
        | SimpleTreeParent<BottomValue, ParentValue>
        | SimpleTreeChild<BottomValue, ParentValue>
      >;
    },
    BottomValue
  >
>;

export type SimpleTreeParentFromTree<
  Tree extends SimpleTree
> = SimpleTreeParent<
  BottomTreeValueFromTree<Tree>,
  ParentTreeValueFromTree<Tree>
>;

export type SimpleTree<BottomValue = unknown, ParentValue = BottomValue> =
  | SimpleTreeParent<BottomValue, ParentValue>
  | SimpleTreeChild<BottomValue, ParentValue>;

export type SimpleTreeFromTree<Tree extends AnyTree> = SimpleTree<
  BottomTreeValueFromTree<Tree>,
  ParentTreeValueFromTree<Tree>
>;

export type AnyTree<BottomValue = unknown, ParentValue = BottomValue> =
  | FullTree<BottomValue, ParentValue>
  | SimpleTree<BottomValue, ParentValue>;

export type AnyTreeFromTree<Tree extends AnyTree> = AnyTree<
  BottomTreeValueFromTree<Tree>,
  ParentTreeValueFromTree<Tree>
>;

export type TreeParent<BottomValue = unknown, ParentValue = BottomValue> =
  | FullTreeParent<BottomValue, ParentValue>
  | SimpleTreeParent<BottomValue, ParentValue>;

export type TreeParentFromTree<Tree extends AnyTree> = Tree extends FullTree
  ? FullTreeParentFromTree<Tree>
  : Tree extends SimpleTree
  ? SimpleTreeParentFromTree<Tree>
  : never;

export type TreeChild<BottomValue = unknown, ParentValue = BottomValue> =
  | FullTreeChild<BottomValue, ParentValue>
  | SimpleTreeChild<BottomValue, ParentValue>;

export type TreeChildFromTree<Tree extends AnyTree> = Tree extends FullTree
  ? FullTreeChildFromTree<Tree>
  : Tree extends SimpleTree
  ? SimpleTreeChildFromTree<Tree>
  : never;

// TODO: TreeChildFromTree | TreeParentFromTree? What to call it? This might be silly.
