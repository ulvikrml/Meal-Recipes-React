import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from './pages/Home';
import Meals from "./pages/Meals";
import SavedMeals from './pages/SavedMeals';
import RecipeCard from './components/RecipeCard';
import './styles/Responsive/Responsive.css'

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/meals" element={<Meals></Meals>} />
        <Route path="/meals/recipe/:id" element={<RecipeCard></RecipeCard>} />
        <Route path="/savedMeals" element={<SavedMeals></SavedMeals>} />
      </Routes>
    </div>
  );
}

export default App;
