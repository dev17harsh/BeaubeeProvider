
import React from 'react';
import Routes from './src/routes/Routes';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import configureStore from './src/redux/store';



function App() {
  const { persistor, store } = configureStore();
  return (
    <Provider store={store}>
        <PersistGate persistor={persistor}>
   <Routes/>
   </PersistGate>
   </Provider>
  );
}

export default App;
