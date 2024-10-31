import React from 'react';
import RepositoryList from './components/RepositoryList';
import { MantineProvider } from '@mantine/core';

const App: React.FC = () => {
  return (
    <MantineProvider>

      <RepositoryList />
    </MantineProvider>
  );
};

export default App;
