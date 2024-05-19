
import React from 'react'
import ReactDOM from 'react-dom/client'
import { labs } from './labs'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <h1>Stride Labs</h1>
    <p>
      This app merely exists for me to conduct Stride-related experiments in a nice, isolated environment.
      I put no effort into making these publicly consumable or impressive, so many of these are half-implemented or broken.
    </p>
    <ul>
      {labs.map((lab) => {
        return (
          <li
            key={lab}
          >
            <a href={`/lab/${lab}/`}>{lab}</a>
          </li>
        )
      })}
    </ul>
  </React.StrictMode>,
)
