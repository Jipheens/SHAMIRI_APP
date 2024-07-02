import React from 'react';
import { registerRootComponent } from 'expo';

import { AuthProvider } from './src/AuthContext'
import Navigator from './src/Navigator';

function App() {
  return (  
    <AuthProvider>
      <Navigator />
    </AuthProvider>  
    
  );
}

registerRootComponent(() => App);

export default App;