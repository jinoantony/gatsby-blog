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
				{`${getFormattedDate(props.date)}・${props.readTime}`}
			</Link>
		</li>
	</ul>
)

const getFormattedDate = date => {
	let formatOption = {
		day: "numeric",
		month: "short",
		year: "2-digit"
	}

	let formattedDate = new Date(date)
		.toLocaleDateString("en-US", formatOption);

	return formattedDate;
}

export default ArticleMeta
