import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from '../Home/Home'
import Categories from '../Categories/Categories'
import PopularCars from '../PopularCars/PopularCars'
import RecentCars from '../RecentCars/RecentsCar'
import Profile from '../Profile/Profile'
import Aide from '../Aide/Aide'
import Settings from '../Settings/Settings'
import SignUp from '../Login/SignUp'
import SignIn from '../Login/SignIn'
import Reservation from '../Reservation/Reservation'
import Payment from '../Payment/Payment'
import AdminDashboard from '../Admin/AdminDashboard'
import NotFound from '../NotFound/NotFound'

function Routers({ isLoggedIn, isGuest }) {
    const userRole = localStorage.getItem('userRole')
    const location = useLocation()
    const isNotFoundPage = location.pathname === '/404' ||
                            location.pathname !== '/' &&
                            location.pathname !== '/categories' &&
                            location.pathname !== '/popularCars' &&
                            location.pathname !== '/recentCars' &&
                            location.pathname !== '/profile' &&
                            location.pathname !== '/aide' &&
                            location.pathname !== '/settings' &&
                            location.pathname !== '/signUp' &&
                            location.pathname !== '/signIn' &&
                            !location.pathname.startsWith('/reservation/')
                            location.pathname !== '/payment' &&
                            location.pathname !== '/administration'

    return (
        <>
            {!isNotFoundPage && (<Header isLoggedIn={isLoggedIn} isGuest={isGuest}></Header>)}
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/categories" element={<Categories />}/>
                <Route path="/popularCars" element={<PopularCars />}/>
                <Route path="/recentCars" element={<RecentCars />}/>
                <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/" replace />}/>
                <Route path="/aide" element={<Aide />}/>
                <Route path="/settings" element={<Settings />}/>
                <Route path="/signUp" element={!isLoggedIn ? <SignUp /> : <Navigate to="/" replace />}/>
                <Route path="/signIn" element={!isLoggedIn ? <SignIn /> : <Navigate to="/" replace />}/>
                <Route path="/reservation/:car" element={<Reservation />}/>
                <Route path="/payment" element={<Payment />}/>

                <Route
                    path="/administration"
                    element={
                        userRole === 'Admin' ? (
                            <AdminDashboard />
                        ) : (
                            <Navigate to="/" replace />
                        )
                    }
                />

                <Route path="*" element={<NotFound />} />
            </Routes>
            {!isNotFoundPage && (<Footer></Footer>)}
        </>
    )
}

export default Routers
