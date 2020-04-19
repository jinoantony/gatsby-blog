import React from 'react'
import '../assets/css/tag.css'
import { Link } from 'gatsby'

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
			<Link className="time" to={props.link}>
				{props.readTime}
			</Link>
		</li>
	</ul>
)

export default ArticleMeta
