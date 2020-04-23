import React from 'react'
import { graphql, Link } from 'gatsby'
import { Layout } from '../components/common/Layout'
import { SEO } from '../components/common/SEO'
import { Header } from '../components/theme/Header'
import BlogList from './BlogList'

import '../assets/css/blog.css'
import Paginator from './Paginator'
import Footer from '../components/theme/Footer'

const Blog = ({ data, pageContext }) => (
	<Layout>
		<SEO title="Jino Antony | Blog" />
		<Header />
		<BlogList posts={data.allMarkdownRemark.edges} />
		<hr/>
		<Paginator 
			pages={pageContext.numPages} 
			currentPage={pageContext.currentPage}
			maxLength={pageContext.maxLength} 
		/>
		<Footer/>
	</Layout>
)

export const pageQuery = graphql`
	query BlogIndexQuery($skip: Int!, $limit: Int!) {
		allMarkdownRemark(
			sort: { fields: [frontmatter___date], order: DESC }
			limit: $limit
			skip: $skip
			filter: { frontmatter: { draft: {eq: false} }}
		) {
			edges {
				node {
					id
					frontmatter {
						slug
						title
						author
						date
						tag
						description
					}
					fields {
						readingTime {
							text
						}
					}
				}
			}
		}
	}
`

export default Blog

