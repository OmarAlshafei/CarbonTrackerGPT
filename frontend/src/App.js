import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import HomePage from './Pages/HomePage';


const router = createBrowserRouter([
  {path: '/', element: <LandingPage/>},
  {path: '/home', element: <HomePage/>}
]);

function App() {
    return <RouterProvider router={router}/>;
}

export default App;
