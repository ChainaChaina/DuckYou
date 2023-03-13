import React from 'react'
import Ducks from './Duck'
import './index.css'
import github from '../public/githubLogo.png';


export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }} >
      <Ducks />
      <div className='front'>
        <h1 className='title'>Duck you</h1>
        <p  className='subTitle'>You can say <b>  'duck you too' </b> in my github</p>
        <p  className='smallText'>Quack.</p>

        <img onClick={()=>{window.open('https://github.com/ChainaChaina')}} className='githubImage' src={github} alt="My Image" />
      </div>
    </div>
  )
}
