import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home_page';
import ViewMorePage from './pages/view_more_page';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/viewMorePage' element={<ViewMorePage />} />
      </Routes>
    </Router>
  );
}

export default App;
