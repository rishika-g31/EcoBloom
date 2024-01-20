import React from "react";
import About from "../Components/About";
import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import Parallax from "../Components/Parallax";
import UserSignup from "./UserSignup";
import PastCampaigns from "../Components/PastCampaigns";
import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import SignIn from "../SignIn";
import SignupInitial from "./SignupInitial";
import JoinUs from "../Components/JoinUs";
import CreateCampaigns from "../Components/CreateCampaigns";
import Footer from "../Components/Footer";
import UserDashboard from "./UserDashboard";
import OrgSignup from "./OrgSignup";
import Store from "./Store";
import CommunityChat from "./CommunityChat";
import { useAuthState } from "react-firebase-hooks/auth";
import { HashLoader } from "react-spinners";
import { auth } from "../firebase.js";

export default function Home() {
    const [user, loading, error] = useAuthState(auth);
    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <HashLoader color="#36d7b7" size={100} />
            </div>
        );
    }
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            <>
                                <Navbar />
                                {/* <Hero /> */}
                                <Parallax />
                                <About />
                                <PastCampaigns />
                                <JoinUs />
                                <CreateCampaigns />
                                <Footer />
                            </>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignupInitial />} />
                    <Route path="/signup/user" element={<UserSignup />} />
                    <Route path="/user/dashboard" element={<UserDashboard />} />
                    <Route path="/signup/org" element={<OrgSignup />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/chat" element={<CommunityChat />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
