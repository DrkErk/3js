//- npm create vite@latest
//-in the root, you can either <></> and let the items fragment or <div></div> to have a parent
//-not auto closing, you need to always close (ie, <br> needs to be <br /> or related)
//- reserved keywords still exist, in the root, you cant use class or for, instead use className and htmlFor
// - in {} you can use js and some. {/* is how you comment in the root */}

import './style.css'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.querySelector('#root'))

const item = "var"

root.render(
<>
    <h1 className='title'>
        Hello {item}
        </h1>
    <p>Content the content the <br></br> content </p>


</>
)