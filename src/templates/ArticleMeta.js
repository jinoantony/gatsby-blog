import React from 'react'

const ArticleMeta = props => (
	<ul className="meta">
		<li className="category">
			<a style={{ background: '#635CFF' }} href="#">
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
