import { useState } from 'react'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
 <header>
        <Show when="signed-out">
          <SignInButton  mode="modal"/>
          <SignUpButton mode="modal" />
        </Show>
        <Show when="signed-in">
          <UserButton mode="modal" />
        </Show>
      </header>
    </>
  )
}

export default App
