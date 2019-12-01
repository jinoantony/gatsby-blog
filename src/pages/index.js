import React from 'react'
import { Layout, SEO } from 'Common'
import { Intro, Skills, Contact, Projects } from 'Components/landing'
import { Header } from 'Theme'
import Home from '../components/landing/Home'

export default () => (
	<Layout>
		<SEO />
		<Header/>
		<Home />
	</Layout>
)
