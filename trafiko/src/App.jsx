import { useState } from 'react'
import NavBar from './components/navbar/navbar'
import Button from './components/button/button'
import Footer from './components/footer/footer'
import Form from './components/form/form'
import CameraList from './components/cameras/cameras'


export default function App() {
    return (
        <div>
            <NavBar />
            <CameraList />
            <Footer />


        </div>
    )
}



