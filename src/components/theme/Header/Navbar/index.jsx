import React from 'react'
import { Link } from 'gatsby'
import { Container } from 'Common'
import NavbarLinks from '../NavbarLinks'
import { Wrapper } from './styles'
import logo from '../../../../assets/images/jino-antony-logo.svg'
import Logo from '../../Logo'

const Navbar = () => (
	<Wrapper as={Container}>
		<div className="logo-container">
			<Link to="/" id="my-logo">
				<Logo />
			</Link>
			<Link to="/" id="home-link">Jino Antony</Link>
		</div>
		<NavbarLinks desktop />
	</Wrapper>
)

export default Navbar
