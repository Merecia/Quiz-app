import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import ResultsState from './context/Results/ResultsState'
import QuizState from './context/Quiz/QuizState'
import CreatorState from './context/Creator/CreatorState'
import MenuState from './context/Menu/MenuState'

ReactDOM.render(
  <BrowserRouter>
    <MenuState>
      <CreatorState>
        <QuizState>
          <ResultsState>
            <App />
          </ResultsState>
        </QuizState>
      </CreatorState>
    </MenuState>
  </BrowserRouter>,
  document.getElementById('root')
)