import React from 'react'

import Header from './../header/header.component'
import MainContent from './../main-container/main-container.component'

function Layout() {
    return (
        <div className='c19layout'>
            <Header />
            <MainContent />
            {/* <MainContent />
            <Footer /> */}
        </div>
    )
}

export default Layout
