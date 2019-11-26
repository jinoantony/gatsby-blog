import React from 'react'
import me from '../../../../static/images/me.jpg'
import SocialLinks from '../SocialLinks'
import './Home.css'

const Home = () => (
  <div className="box">
    <img src={me} />
    <h4>Hello, I am</h4>
    <h1>Jino Antony</h1>
    <p>
      I'am a backend developer based in Kerala, India. I love all things related
      to web development. I'm mostly experienced in PHP, Javascript and other
      web related technologies.
    </p>

    <p>
      You can find me on
    </p>
    <SocialLinks/>
  </div>
)

export default Home
