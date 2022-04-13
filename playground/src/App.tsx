import React from 'react';
import { css, Global } from '@emotion/react';

import DnD from './scenes/DnD';

const App: React.VFC = () => {
  return (
    <>
      <Global
        styles={css`
          body,
          html {
            margin: 0;
            padding: 20px;
          }
        `}
      />
      <DnD />
    </>
  );
};

export default App;
