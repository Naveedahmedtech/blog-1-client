import { RouterProvider } from 'react-router-dom';
import './App.css'
import { router } from './router/routes';
import './assets/styles/button.global.css'
import './assets/styles/link.global.css'
import 'react-quill/dist/quill.snow.css';
import 'highlight.js/styles/github.css';

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
