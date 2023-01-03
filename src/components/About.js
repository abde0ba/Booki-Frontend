import React from 'react'
import './styles/About.css'

const About = () => {
  return (
    <div className='About-section'>
        <h1>About Booki</h1>
        <div>
        <p>Booki is a book library application that provides you with some books with the ability to read them, also it provides you with their main genres and summaries, in addition to the ability to save them in your favorite section.</p>
        <p>This application was developed and designed by the developer Abdelhakim Baraka.</p>
        
        <div className='social-links'>
        <h5>
            Social media links of Abdelhakim Baraka :
        </h5>
        <a href='https://github.com/abde0ba'><i class="fa-brands fa-github"></i></a>
        <a href='https://twitter.com/AbdelhakimBara2'><i class="fa-brands fa-twitter"></i></a>
        </div>
        </div>
        

    </div>
  )
}

export default About