import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'

const RecentArticles = () => {
    const data = getData()

    return (
        <div className="latest-articles">
            <h3>Latest Articles</h3>
            <ul>
                {data.allMarkdownRemark.edges.map((article, index) => (
                    <li key={index}>
                        <Link to={article.node.frontmatter.slug}>
                            { article.node.frontmatter.title }
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const getData = () => useStaticQuery(graphql`
    query RecentQuery {
        allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            limit: 5
            filter: { frontmatter: { draft: {eq: false} }}
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        slug
                        title
                        date
                    }
                }
            }
        }
    }
`)

export default RecentArticles