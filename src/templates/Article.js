import React from 'react'
import ArticleMeta from './ArticleMeta'

const Article = props => (
	<article className="postitem">
		<div className="wrapper">
			<ArticleMeta
				link={props.link}
				tag={props.tag}
				readTime={props.readTime}
			/>
			<h2 className="title">
				<a href={props.link}>{props.title}</a>
			</h2>
			<p className="excerpt">
				Add Shades of Purple theme-based syntax highlighting to your WordPress
				blog with the help of Prism.js syntax highlighter and enjoy high-quality
				code coloring that improves your blog readability.
			</p>
			<a href="https://ahmadawais.com/author/ahmad-awais/" className="author">
				Jino Antony
			</a>
		</div>
	</article>
)

export default Article
