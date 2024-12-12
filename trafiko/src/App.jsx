import { useState } from 'react'
import NavBar from './components/navbar/navbar'
import Button from './components/button/button'
import Footer from './components/footer/footer'
import Form from './components/form/form'
import CameraMap from './components/cameras/cameras'


export default function App() {
    return (
        <div>
            <NavBar />
            <CameraMap />
            <Footer />


        </div>
    )
}



