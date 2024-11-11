import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SectionHome from './SectionHome'
import Categories from '../Categories/Categories'
import Profile from '../Profile/Profile'
import Aide from '../Aide/Aide'
import Settings from '../Settings/Settings'
import SignUp from '../Login/SignUp'
import SignIn from '../Login/SignIn'
import Reservation from '../Reservation/Reservation'
import Payment from '../Payment/Payment'
import AdminDashboard from '../Admin/AdminDashboard'


function Home() {
    
    return (
        <>
            <BrowserRouter>
                <Header></Header>
                <Routes>
                    <Route path="/" element={<SectionHome />}/>
                    <Route path="/categories" element={<Categories />}/>
                    <Route path="/profile" element={<Profile />}/>
                    <Route path="/aide" element={<Aide />}/>
                    <Route path="/settings" element={<Settings />}/>
                    <Route path="/signUp" element={<SignUp />}/>
                    <Route path="/signIn" element={<SignIn />}/>
                    <Route path="/reservation" element={<Reservation />}/>
                    <Route path="/payment" element={<Payment />}/>
                    <Route path="/administration" element={<AdminDashboard />}/>
                </Routes>
                <Footer></Footer>
            </BrowserRouter>
        </>
    )
}

export default Home
