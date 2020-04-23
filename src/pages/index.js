import React from 'react'
import { Layout, SEO } from 'Common'
import { Header } from 'Theme'
import Home from '../components/landing/Home'

export default () => (
	<Layout>
		<SEO/>
		<Header/>
		<Home/>
	</Layout>
)
