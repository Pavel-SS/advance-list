import React from 'react';
import {Routes, Route} from 'react-router-dom'
import { Navigation } from './components/Navigation';
import { FavoritPage } from './pages/FavoritePage/FavoritPage';
import { HomePage } from './pages/HomePage/HomePage';
function App() {
  return (
    <>
      <Navigation/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/favourites' element={<FavoritPage/>}/>
      </Routes>
    </>
  );
}

export default App;
