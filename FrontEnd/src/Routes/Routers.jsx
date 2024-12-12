import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from '../Home/Home'
import Categories from '../Categories/Categories'
import PopularCars from '../PopularCars/PopularCars'
import RecentCars from '../RecentCars/RecentsCar'
import Manager from '../Profile/Manager'
import Aide from '../Aide/Aide'
import Reservation from '../Reservation/Reservation'
import Payment from '../Payment/Payment'
import AdminDashboard from '../Admin/AdminDashboard'
import NotFound from '../NotFound/NotFound'
import AboutUs from '../AboutUs/AboutUs'
import Podcast from '../Community/Podcast'
import Events from '../Community/Events'
import Blogs from '../Community/Blogs'
import PrivacyPolicy from '../Terms-Privacy/PrivacyPolicy'
import TermsOfService from '../Terms-Privacy/TermsOfService'

function Routers({ isLoggedIn, setIsLoggedIn, isGuest }) {
    const userRole = localStorage.getItem('userRole')
    const location = useLocation()
    const isNotFoundPage = !['/', '/categories', '/popularCars', '/recentCars', '/profile', '/aboutus', '/terms', '/privacy', '/podcast', '/events', '/blogs', '/aide', '/administration'].includes(location.pathname) && !location.pathname.startsWith('/reservation/') && !location.pathname.startsWith('/payment/')

    return (
        <>
            {!isNotFoundPage && (<Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isGuest={isGuest}></Header>)}
            <div className="mt-10 pt-12">
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/categories" element={<Categories />}/>
                    <Route path="/popularCars" element={<PopularCars />}/>
                    <Route path="/recentCars" element={<RecentCars />}/>
                    <Route path="/profile" element={<Manager isLoggedIn={isLoggedIn} />}/>
                    <Route path="/aide" element={<Aide />}/>
                    <Route path='/aboutus' element={<AboutUs />}/>
                    <Route path='/events' element={<Events />}/>
                    <Route path='/blogs' element={<Blogs />}/>
                    <Route path='/podcast' element={<Podcast />}/>
                    <Route path='/terms' element={<TermsOfService />}/>
                    <Route path='/privacy' element={<PrivacyPolicy />}/>
                    <Route path="/reservation/:car" element={<Reservation />}/>
                    <Route path="/payment/:car" element={<Payment />}/>

                    <Route
                        path="/administration"
                        element={
                            isLoggedIn && userRole === 'Admin' ? (
                                <AdminDashboard />
                            ) : (
                                <Navigate to="/" replace />
                            )
                        }
                    />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            {!isNotFoundPage && (<Footer></Footer>)}
        </>
    )
}

export default Routers
