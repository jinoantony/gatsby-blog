import React from 'react'
import me from '../../../../static/images/me.jpg'
import SocialLinks from '../SocialLinks'
import './Home.css'
import RecentArticles from '../RecentArticles'
import { Link } from 'gatsby'

const Home = () => (
  <div className="box">
    <div className="my-info">
      <div className="my-image">
        <img src={me} />
      </div>
      <div className="intro">
        <h4>Hi, I'm</h4>
        <h1>Jino Antony</h1>
      </div>
    </div>
    <div className="content">
      <p className="about">
        I am a backend developer based in Kerala, India. I love all things related
        to web development. I'm mostly experienced in PHP, Javascript and other
        web related technologies. I usually write articles related to web development.
      </p>
      <RecentArticles/>
      <Link to="/blog">Read More</Link>
    </div>
    {/* <p>You can find me on</p>
    <SocialLinks /> */}
  </div>
)

export default Home
