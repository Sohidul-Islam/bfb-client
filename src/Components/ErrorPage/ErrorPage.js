import React from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import PreLoader from '../PreLoader/PreLoader'

const ErrorPage = () => {
    return (

        <div>
            <Header />
            <PreLoader size={80} />
            <h1 className="text-[32px] font-bold text-center">404 Page</h1>
        </div>
    )
}

export default ErrorPage