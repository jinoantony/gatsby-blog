import React from 'react'
import Article from './Article'

import '../assets/css/blog.css'

const BlogList = props =>
	props.posts.map(post => (
		<Article
			link={post.node.frontmatter.slug}
			tag={post.node.frontmatter.tag}
			readTime={post.node.fields.readingTime.text}
			title={post.node.frontmatter.title}
			description={post.node.frontmatter.description}
			key={post.node.id}
		/>
	))

export default BlogList
