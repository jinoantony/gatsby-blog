import React from 'react'
import { Layout, SEO } from 'Common'
import { Header } from 'Theme'
import Projects from '../components/landing/Projects'

export default () => (
	<Layout>
		<SEO />
		<Header />
		<Projects />
	</Layout>
)
