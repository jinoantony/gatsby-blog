import React from 'react'
import { Link } from 'gatsby'
import { Wrapper } from './styles'
import ThemeToggler from '../../ThemeToggler'

const NavbarLinks = ({ desktop }) => (
	<Wrapper desktop={desktop}>
		<div className="navbar-links">
			<Link to="/projects">Projects</Link>
			<a href="#contact">Contact</a>
			<Link to="/blog">Blog</Link>
			<ThemeToggler />
		</div>
	</Wrapper>
)

export default NavbarLinks
