import React from 'react'
import { Layout, SEO } from 'Common'
import { Header } from 'Theme'
import Projects from '../components/landing/Projects'
import Footer from '../components/theme/Footer'

export default () => (
	<Layout>
		<SEO />
		<Header />
		<Projects />
		<Footer />
	</Layout>
)
