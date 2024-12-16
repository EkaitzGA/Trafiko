import { useState } from 'react'
import NavBar from './components/navbar/navbar'
import Button from './components/button/button'
import Footer from './components/footer/footer'
import Form from './components/form/form'
import CameraMap from './components/cameras/cameras'
import Incidencias from "./components/incidences/Incidences"
import './App.css'

export default function App() {
    return (
        <div>
            <CameraMap />
        </div>
    )
}



