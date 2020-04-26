import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from "gatsby-image"
import { Layout, SEO } from '../components/common'
import { Header } from 'Theme'

import './style.css'
import Footer from '../components/theme/Footer'
import CustomImg from './CustomImg'

export default function Template({ data }) {
	const post = data.markdownRemark
	const articleClass = "article-post" + (post.frontmatter.firstLetter == true ? ' first-capital' : '')
	let coverImage = null

	if (post.frontmatter.coverImage) {
		coverImage = post.frontmatter.coverImage.childImageSharp.fluid
	}

	return (
		<Layout>
			<SEO 
				title={post.frontmatter.title} 
				location={post.frontmatter.slug}
				description={post.frontmatter.description}
				thumbImage={coverImage ? coverImage.src : undefined}
			/>
			<Header />

			<div
				className="container mb-10"
				style={{ maxWidth: '760px' }}
			>
				<div className="h-100 tofront">
					<div className="row">
						<div className="col-md-12 pt-3 pb-10">
							<p className="text-uppercase font-weight-bold" />
							<h1 className="display-10 secondfont mb-3 font-weight-bold post-title">
								{post.frontmatter.title}
							</h1>
							<p className="mb-3">{post.frontmatter.subtitle}</p>
							<div className="d-flex align-items-center">
								<h4
									style={{
										fontSize: '.8em',
										color: '#9fa7a7',
										fontWeight: '400',
									}}
								>
									Posted by {post.frontmatter.author} on {post.frontmatter.date}
								</h4>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="container pt-4 pb-4" style={{ maxWidth: '760px' }}>
				<div className="row justify-content-center">
					<div className="col-md-8 col-lg-12">
						{coverImage && <CustomImg 
							fluid={coverImage} 
							alt={post.frontmatter.title}
							title={post.frontmatter.title}
							style={{'marginBottom': '7px'}}
							caption={post.frontmatter.coverImageTitle}
						/>}
						<article
							className={articleClass}
							dangerouslySetInnerHTML={{ __html: post.html }}
						/>
					</div>
				</div>
			</div>
			<Footer/>
		</Layout>
	)
}

export const postQuery = graphql`
	query BlogPostBySlug($slug: String!) {
		markdownRemark(frontmatter: { slug: { eq: $slug } }) {
			html
			frontmatter {
				slug
				title
				author
				date
				firstLetter
				description
				coverImage {
					childImageSharp {
						fluid(maxWidth: 800) {
							...GatsbyImageSharpFluid
						}
					}
				}
				coverImageTitle
			}
		}
	}
`
