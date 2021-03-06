import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import up from '../../../assets/images/up-icon.svg'

const scrollToTop = () => window.scroll({ top: 0, left: 0, behavior: 'smooth' })

const ScrollToTop = props => {
  const [opacity, setOpacity] = useState(0)

  const handleScroll = () => {
    let scrollTop = window.scrollY
    let pageHeight = document.body.scrollHeight
    let scrollPercentage = (scrollTop / pageHeight) * 100

    setOpacity(scrollPercentage > 10 ? 1 : 0)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  return <ScrollButton style={{ opacity }} onClick={scrollToTop}></ScrollButton>
}

const ScrollButton = styled.button`
  position: fixed;
  right: 10px;
  bottom: 40px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-family: monospace;
  color: #000000cc;
  background-color: white;
  cursor: pointer;
  font-size: 38px;
  z-index: 1000;
  border: 1px solid #c2bebe;
  transition: opacity 300ms ease-in-out;
  :hover {
    border-color: rgb(186, 186, 186);
  }
  :active {
    border-color: rgba(84, 84, 84, 0.94);
  }
  ::after {
    content: '';
    background-image: url('${up}');
    /* font-family: monospace; */
    position: absolute;
    top: 6px;
    text-align: center;
    left: 7px;
    width: 35px;
    height: 35px;
  }
`

export default ScrollToTop
