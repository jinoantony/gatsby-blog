import React from 'react'
import { Layout, SEO } from 'Common'
import { Header } from 'Theme'
import Home from '../components/landing/Home'
import { Script } from "gatsby"

const IndexPage = () => (
	<Layout>
		<SEO/>
		<Header/>
		<Home/>
		<Script>{`
			if (window.netlifyIdentity) {
				window.netlifyIdentity.on("init", user => {
				if (!user) {
					window.netlifyIdentity.on("login", () => {
					document.location.href = "/admin/";
					});
				}
				})
			}`
		}</Script>
	</Layout>
)

export default IndexPage