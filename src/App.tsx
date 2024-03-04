import { RouterProvider} from 'react-router-dom';
import './App.css'
import { router } from './router/routes';
import { useAuth } from './hooks/useAuth';

function App() {
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn)
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
