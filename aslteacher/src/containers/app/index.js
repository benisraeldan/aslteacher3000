import React from 'react'
import { Route } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import Test from '../test'

const App = () => (
  <div>    
    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/level/:id" component={About} />
      <Route exact path="/test/:id" component={Test} />
    </main>
  </div>
)

export default App
