//- npm create vite@latest
//- in the root, you can either <></> and let the items fragment or <div></div> to have a parent
//- not auto closing, you need to always close (ie, <br> needs to be <br /> or related)
//- reserved keywords still exist, in the root, you cant use class or for, instead use className and htmlFor
//- in {} you can use js and some. {/* is how you comment in the root */}
//- pink {} is "im going to send some js", blue {} is the object
//- use camal case when doing css in js (background-color is backgroundColor)
//- TAILWIND css for jsx (if I want to use it)

import App from './App.jsx'
import './style.css'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.querySelector('#root'))

const item = "var"
const test = ""
//inside the app is a render for 

root.render(
<>
   <App>
    <h1>   this    </h1>
    <h2>   is it   </h2>
   </App> 

</>
)

//Can even send children as <App children={<> <h1>Top Text </h1> <h2>Bottom Text </h2>  </>} />