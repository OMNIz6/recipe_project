import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RecipeApp from './RecipeApp'
function App() {
  return (
    <BrowserRouter>
        <RecipeApp/>
    </BrowserRouter>
  );
}

export default App;
