const path = require('path')
const siteConfig = require('./data/config')
// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
	const { createPage } = actions

	// Query for markdown nodes to use in creating pages.
	const result = await graphql(
		`
			{
				allMarkdownRemark(limit: 1000) {
					edges {
						node {
							frontmatter {
								path
							}
						}
					}
				}
			}
		`
	)

	// Handle errors
	if (result.errors) {
		reporter.panicOnBuild(`Error while running GraphQL query.`)
		return
	}

	// Create pages for each markdown file.
	const blogPostTemplate = path.resolve(`src/templates/blogPost.js`)
	result.data.allMarkdownRemark.edges.forEach(({ node }) => {
		const { path } = node.frontmatter
		createPage({
			path,
			component: blogPostTemplate,
			// In your blog post template's graphql query, you can use path
			// as a GraphQL variable to query for data from the markdown file.
			context: {
				path,
			},
		})
	})

	const posts = result.data.allMarkdownRemark.edges
	const { postsPerPage } = siteConfig
	const numPages = Math.ceil(posts.length / postsPerPage)
	Array.from({ length: numPages }).forEach((_, i) => {
		createPage({
			path: i === 0 ? `/blog` : `/blog/${i + 1}`,
			component: path.resolve('./src/templates/blog.js'),
			context: {
				limit: postsPerPage,
				skip: i * postsPerPage,
				numPages,
				currentPage: i + 1,
				prevPagePath: i <= 1 ? '/blog' : `/blog/${i - 2}`,
				nextPagePath: `/blog/${i + 2}`,
				hasPrevPage: i !== 0,
				hasNextPage: i !== numPages - 1,
			},
		})
	})
}
