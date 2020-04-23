import React from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { Link } from 'gatsby'
import { Wrapper } from './styles'

const NavbarLinks = ({ desktop }) => (
	<Wrapper desktop={desktop}>
		<div className="navbar-links">
			<AnchorLink href="#about">About</AnchorLink>
			<AnchorLink href="#projects">Projects</AnchorLink>
			<AnchorLink href="#contact">Contact</AnchorLink>
			<Link to="/blog">Blog</Link>
		</div>
	</Wrapper>
)

export default NavbarLinks
