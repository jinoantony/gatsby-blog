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
				{props.description}
			</p>
			<p className="author">
				Jino Antony
			</p>
		</div>
	</article>
)

export default Article
