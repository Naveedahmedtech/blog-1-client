import { RouterProvider} from 'react-router-dom';
import './App.css'
import { router } from './router/routes';
import { useAuth } from './hooks/useAuth';

function App() {
  const { userData } = useAuth();
  console.log(userData)
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
