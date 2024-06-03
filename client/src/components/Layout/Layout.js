import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from "react-helmet"

const Layout = ({children, title, desc, keywords, author}) => {
  return (
    <div>
        <Helmet>
          <meta charSet='utf-8'/>
          <meta name='description' content={desc} />
          <meta name='keywords' content={keywords} />
          <meta name='author' content={author} />
          <title>{title}</title>
        </Helmet>
        <Header />
        <main className='font-semibold min-h-screen'>
            {children}
        </main>
        <Footer />
    </div>
  )
};

Layout.defaultProps = {
  title:"DNS",
  desc:"Ecommerce Application",
  keywords:"Reactjs,mongodb,nodejs,expressjs",
  author:"CuriousDev1010"
}

export default Layout