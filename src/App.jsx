import { Routes, Route } from 'react-router-dom';
import './App.css';
import Website from './routes/website.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Website />} />
    </Routes>
  );
}

export default App;