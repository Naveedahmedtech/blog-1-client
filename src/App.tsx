import React from 'react';
import { RouterProvider} from 'react-router-dom';
import './App.css'
import { router } from './router/routes';

interface Props {
  children: React.ReactNode;
}


function App({ children }: Props) {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
