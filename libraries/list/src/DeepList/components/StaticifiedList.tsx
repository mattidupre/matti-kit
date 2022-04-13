import React from 'react';
import { StaticList } from '~/StaticList';
import { swapChildrenComponents } from '../lib/componentRegistry';

type Props = React.ComponentProps<typeof StaticList>;

const StaticifiedList: React.FC<Props> = ({ direction, spacing, children }) => {
  return (
    <StaticList direction={direction} spacing={spacing}>
      {swapChildrenComponents(children, { direction, spacing })}
    </StaticList>
  );
};

export default StaticifiedList;
