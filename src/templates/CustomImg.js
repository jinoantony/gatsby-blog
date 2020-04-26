import React from 'react'
import Img from "gatsby-image"

const CustomImg = (props) => (
    <figure>
        <Img {...props} />
        {props.caption && 
            <figcaption>{ props.caption }</figcaption>
        }
    </figure>
)

export default CustomImg