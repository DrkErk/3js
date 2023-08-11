//-npm install <theDependency>@lastest
//-(set version for this: npm install react@18 react-dom@18.2 react-scripts@5.0)
//-in package.json, edited scripts of dev and build from "vite" and "vite build" to "react-scripts start" and "react-scripts build"
//- public folder is like the static
//- html:5 while creating a new html file to get it to
import './style.css'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.querySelector('#root'))

root.render(
    <h1>Hello React</h1>
)