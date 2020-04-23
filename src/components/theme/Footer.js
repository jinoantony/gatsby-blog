import React from 'react'
import SocialLinks from '../../components/landing/SocialLinks'
import '../../assets/css/footer.css'

const Footer = () => (
    <div id="footer">
        <SocialLinks/>
        <div id="info">Jino Antony ©{new Date().getFullYear()} | All rights are reserved | Built with <a href="https://www.gatsbyjs.org">Gatsby</a></div>
    </div>
)

export default Footer