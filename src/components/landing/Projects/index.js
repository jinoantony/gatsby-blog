import React from 'react'
import GithubLogo from './GithubLogo.js'
import Image from 'gatsby-image'
import kanban from '../../../../static/images/projects/kanban.png'
import './Projects.css'

const Projects = () => (
    <div className="project-container">
        <h1>Projects</h1>
        <div className="project">
            <div className="project-image">
                <img src={kanban} />
            </div>
            <div className="description">
                <div className="project-title">Laravel Kanban</div>
                <div className="breif">
                    Laravel kanban is a composer package which hepls to create beautiful kanban boards
                    in your laravel application
                </div>
                <a className="github" href="#">
                    <GithubLogo width="25px" height="25px" /> 
                    View on github
                </a>
            </div>
        </div>
    </div>
)

export default Projects