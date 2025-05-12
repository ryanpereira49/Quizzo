import { Routes, Route } from "react-router-dom";
import Create from './pages/Create';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import Quiz from './pages/Quiz';
import Category from './pages/Category';
import Result from './pages/Result';


function App() {

  return (
    <>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<Create />} />
          <Route path='/category' element={<Category />} />
          <Route path='/leaderboard' element={<Leaderboard />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/result' element={<Result/>}/>
        </Routes>
    </>
  )
}

export default App
