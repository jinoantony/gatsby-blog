import React from 'react'
import GithubLogo from './GithubLogo.js'
import Image from 'gatsby-image'
import { graphql, useStaticQuery } from 'gatsby'
import './Projects.css'

const Projects = () => {
    const data = getData()

    return (
        <div className="project-container">
            <h1>Projects</h1>
            <div className="projects">
                { data.allMarkdownRemark.edges.map((article, index) => (
                    <div className="project" key={index}>
                        <div className="project-image">
                            <Image
                                fluid={article.node.frontmatter.icon.childImageSharp.fluid} 
                            />
                        </div>
                        <div className="description">
                            <div className="project-title">{ article.node.frontmatter.name }</div>
                            <div className="breif">
                                { article.node.frontmatter.description }
                            </div>
                            <a className="github" href={ article.node.frontmatter.url }>
                                <GithubLogo width="25px" height="25px" /> 
                                View on github
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const getData = () => useStaticQuery(graphql`
    query getProjects {
        allMarkdownRemark(
            sort: { fields: [frontmatter___order], order: ASC }
            filter: { frontmatter: { type: {eq: "project"} }}
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        name
                        description
                        url
                        icon {
                            childImageSharp {
                                fluid(maxWidth: 340) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`)

export default Projects