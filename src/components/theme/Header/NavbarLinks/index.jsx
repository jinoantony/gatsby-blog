import React from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { Link } from 'gatsby'
import { Wrapper } from './styles'

const NavbarLinks = ({ desktop }) => (
	<Wrapper desktop={desktop}>
		<AnchorLink href="#about">About</AnchorLink>
		<Link to="/projects">Projects</Link>
		<AnchorLink href="#contact">Contact</AnchorLink>
		<Link to="/blog">Blog</Link>
	</Wrapper>
)

export default NavbarLinks
