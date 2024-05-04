import React from "react";
import UserSignup from "./UserSignup";
import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import SignIn from "../SignIn";
import SignupInitial from "./SignupInitial";
import UserDashboard from "./UserDashboard";
import OrgSignup from "./OrgSignup";
import Communities from "./Communities";
import Store from "./Store";
import UserProfile from "./UserProfile";
import CommunityChat from "./CommunityChat";
import HomePage from "./HomePage.js";
import Video from "../Components/Video.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { HashLoader } from "react-spinners";
import { auth } from "../firebase.js";
import ForgetPassword from "./ForgetPassword.js";
import { ProfileContextProvider } from "../Components/ProfileContextProvider.js";
import Orgdashboard from "./Orgdashboard.js";
import Orgprofile from "./Orgprofile.js";
import CreateCampaign from "./CreateCampaign.js";
import logo from "../assets/images/logo.png";
import CampaignProfile from "./CampaignProfile.js";
import Badha_Campaigns from "./Badha_Campaigns.js";
import Activity_log from "./Activity_log.js";
import OrgCampaignProfile from "./OrgCampaignProfile.js";
import VerifyUsers from "./VerifyUsers.js";
import Delhivery from "./Delhivery.js";
import Edit_Profile_Org from "./Edit_Profile_Org.js";
import UserAuth from "../UserAuth.js";
import Admin from "./Admin.js";
import VerifyDummy from "./VerifyDummy.js";
import Quiz from "./Quiz.js";
import FreshUserSignUp from "./FreshUserSignUp.js";
import Loader from "../assets/images/Animation.gif";
import { ChatContextProvider } from "../Components/ChatContextProvider.js";
import New_User_Dashboard from "../Components/New_User_Dashboard.js";

export default function Home() {
    const [user, loading, error] = useAuthState(auth);
    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <img src={Loader} height={200} width={200}></img>
            </div>
        );
    }
    return (
      <div>
        <ProfileContextProvider>
          <ChatContextProvider>
            <BrowserRouter>
              <Routes>
                <Route
                  exact
                  path="/"
                  element={
                    <>
                      <HomePage />
                    </>
                  }
                />
                <Route
                  exact
                  path="/signup/user"
                  element={
                    <>
                      <FreshUserSignUp />
                    </>
                  }
                />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<SignupInitial />} />
                {/* <Route
                            exact
                            path="/signup/user"
                            element={<UserSignup />}
                        /> */}

                {/* <Route
                            exact
                            path="/signup/user"
                            element={<UserAuth />}
                        /> */}
                <Route
                  exact
                  path="/user/dashboard"
                  element={<UserDashboard />}
                />
                <Route exact path="/user/join" element={<Communities />} />
                <Route exact path="/user/profile" element={<UserProfile />} />
                <Route
                  exact
                  path="/org/edit/profile"
                  element={<Edit_Profile_Org />}
                />
                <Route exact path="/signup/org" element={<OrgSignup />} />

                <Route exact path="/org/dashboard" element={<Orgdashboard />} />
                <Route
                  exact
                  path="/org/profile/:orgId"
                  element={<Orgprofile />}
                />
                <Route exact path="/video" element={<Video />} />

                <Route exact path="/store" element={<Store />} />
                <Route exact path="/quiz" element={<Quiz />} />
                <Route exact path="/chat" element={<CommunityChat />} />
                <Route
                  exact
                  path="/login/forgetpassword"
                  element={<ForgetPassword />}
                />
                <Route
                  exact
                  path="/campaign/create"
                  element={<CreateCampaign />}
                />
                <Route
                  exact
                  path="/campaign/:campaignId"
                  element={<CampaignProfile />}
                />
                <Route
                  exact
                  path="/org/campaign/:campaignId"
                  element={<OrgCampaignProfile />}
                />
                <Route exact path="/log" element={<Activity_log />} />
                <Route exact path="/campaigns" element={<Badha_Campaigns />} />
                <Route
                  exact
                  path="/campaign/:campaignId/verify"
                  element={<VerifyDummy />}
                />

                <Route exact path="/admin" element={<Admin />} />

                <Route exact path="/store/order" element={<Delhivery />} />
                <Route exact path="/newuser" element={<New_User_Dashboard/>} />
              </Routes>
            </BrowserRouter>
          </ChatContextProvider>
        </ProfileContextProvider>
      </div>
    );
}
