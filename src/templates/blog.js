import React from 'react'
import { graphql, Link } from 'gatsby'
import { Layout } from '../components/common/Layout'
import { Header } from '../components/theme/Header'
import BlogList from './BlogList'

import '../assets/css/blog.css'

const Blog = ({ data, pageContext }) => (
	<Layout>
		<Header />
		<BlogList posts={data.allMarkdownRemark.edges} />
		<div className="wrapper">
			{pageContext.hasPrevPage && (
				<Link to={pageContext.prevPagePath}>{'<< Previous'}</Link>
			)}
			{pageContext.hasNextPage && (
				<Link to={pageContext.nextPagePath} style={{ float: 'right' }}>
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
