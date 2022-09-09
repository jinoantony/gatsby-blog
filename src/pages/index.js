import React from 'react'
import { Layout, SEO } from 'Common'
import { Header } from 'Theme'
import Home from '../components/landing/Home'

const IndexPage = () => (
	<Layout>
		<SEO/>
		<Header/>
		<Home/>
	</Layout>
)

export default IndexPage