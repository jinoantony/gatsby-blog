import React from 'react'
import { graphql, Link } from 'gatsby'
import { Layout } from '../components/common/Layout'
import { SEO } from '../components/common/SEO'
import { Header } from '../components/theme/Header'
import BlogList from './BlogList'

import '../assets/css/blog.css'

const Blog = ({ data, pageContext }) => (
	<Layout>
		<SEO title="Jino Antony | Blog" />
		<Header />
		<BlogList posts={data.allMarkdownRemark.edges} />
		<div className= "navigator">
			{pageContext.hasPrevPage && (
				<Link className= "previous" to={pageContext.prevPagePath}>{'<< Previous'}</Link>
			)}
			{pageContext.hasNextPage && (
				<Link className= "next" to={pageContext.nextPagePath} style={{ float: 'right' }}>
					Next >>
				</Link>
			)}
		</div>
	</Layout>
)

export const pageQuery = graphql`
	query BlogIndexQuery($skip: Int!, $limit: Int!) {
		allMarkdownRemark(
			sort: { fields: [frontmatter___date], order: DESC }
			limit: $limit
			skip: $skip
		) {
			edges {
				node {
					id
					frontmatter {
						path
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
