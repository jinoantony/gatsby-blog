import React from 'react'
import {Layout, SEO} from '../components/common'
import { Header } from "../components/theme";
import "../assets/css/projects.css";

export default () => (
    <Layout>
        <SEO />
        <Header />
        <div className="projects-container">
            <h1>Projects</h1>
            <hr/>
            <div>
                <a href="https://marketplace.visualstudio.com/items?itemName=JinoAntony.vscode-case-shifter">
                    <h2># VS Code Case Shifter</h2>
                </a>
                <img 
                    alt="VsCode case shifter"
                    src="https://github.com/jinoantony/vscode-case-shifter/blob/master/images/vscode-case-shifter.gif?raw=true" 
                />
                <p className="project-description">VsCode Case Shifter is an extension for VsCode which allows you to easily convert text between snake_case, camelCase, StudlyCaps and more.</p>
            </div>
        </div>
    </Layout>
)