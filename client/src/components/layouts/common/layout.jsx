import React, { useEffect, useState } from 'react'
import Header from '../../pages/header/header'
import Breadcrumbs from '../../pages/breadcrumbs/breadcrumbs'

// Breakpoint 900px for phones and tablets portrait ($bp-small)
const BP_SMALL = 900

const Layout = ({children, ...rest}) => {
  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= BP_SMALL)

  const updateMedia = () => {
    setShowSidebar(window.innerWidth >= BP_SMALL)
  }

  useEffect(() => {
    window.addEventListener('resize', updateMedia)
    return () => window.removeEventListener('resize', updateMedia)
  })

  const [clonedSidebar, clonedPage] = React.Children.map(children, child => (
    React.cloneElement(child, {...child.props}))
  )

  const navSidebar = (hideSidebar) =>
    React.cloneElement(clonedSidebar, {
      ...clonedSidebar.props,
      isMobile: true,
      hideSidebar: hideSidebar
    })

  return (
    <div className="container">
      <Header navSidebar={navSidebar} {...rest}/>

      <Breadcrumbs/>

      {showSidebar &&
      <aside className="sidebar">
        {clonedSidebar}
      </aside>}

      <section className="main">
        {clonedPage}
      </section>
    </div>
  )
}

export default Layout
