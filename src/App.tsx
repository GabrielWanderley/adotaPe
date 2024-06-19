import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home';
import { Animal } from './pages/Animal';
import { Send } from './pages/send';

function App() {
  return (
    <div className="App">
          <BrowserRouter>
          <Routes>
          <Route path="/" element={<Home />}/>     
          <Route path='/send/' element={<Send/>}/>
           <Route path='/animal/:id' element={<Animal/>}/>     
           </Routes>
          </BrowserRouter>    
    </div>
  );
}

export default App;
