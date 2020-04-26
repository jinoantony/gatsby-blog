import React from 'react'
import ArticleMeta from './ArticleMeta'
import { Link } from 'gatsby'

const Article = props => (
	<article className="postitem">
		<div className="wrapper">
			<ArticleMeta
				link={props.link}
				tag={props.tag}
				readTime={props.readTime}
				date={props.date}
			/>
			<h2 className="title">
				<Link to={props.link}>{props.title}</Link>
			</h2>
			<p className="excerpt">
				{props.description}
			</p>
			{/* <p className="author">
				Jino Antony
			</p> */}
		</div>
	</article>
)

export default Article
