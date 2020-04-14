import React from 'react'
import '../assets/css/tag.css'

const ArticleMeta = props => (
	<ul className="meta">
		<li className="category">
			<a className={props.tag.toLowerCase()} href="#">
				{props.tag}
			</a>
		</li>
		<li className="issticky">
			<i className="fa fa-thumb-tack" />
		</li>
		<li className="readtime">
			<a className="time" href={props.link}>
				{props.readTime}
			</a>
		</li>
	</ul>
)

export default ArticleMeta
