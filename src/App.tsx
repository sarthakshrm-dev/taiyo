import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Contacts from './Pages/Contacts/Index';
import ChartsAndMaps from './Pages/ChartsAndMaps/Index';
import store from './Redux/store';
import './App.css'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 p-4 overflow-x-hidden">
            <Routes>
              <Route path="/" element={<Contacts />} />
              <Route path="/charts-and-maps" element={<ChartsAndMaps />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;