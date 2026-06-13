import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const router = useNavigate();

    const createMeeting = () => {
        const roomId = Math.random().toString(36).substring(2, 10);
        router(`/${roomId}`);
    };

    return (
        <div className="landingPageContainer">
            <nav>
                <div className="navHeader">
                    <h2>VideoConnect</h2>
                </div>

                <div className="navlist">
                    <p onClick={createMeeting}>Create Meeting</p>

                    <p
                        onClick={() => {
                            router("/auth");
                        }}
                    >
                        Register
                    </p>

                    <div
                        onClick={() => {
                            router("/auth");
                        }}
                        role="button"
                    >
                        <p>Login</p>
                    </div>
                </div>
            </nav>

            <div className="landingMainContainer">
                <div className="heroContent">
                    <h1>
                        Connect, Collaborate & Meet
                        <span style={{ color: "#FF9839" }}> Instantly</span>
                    </h1>

                    <p>
                        Secure video meetings, real-time chat, and screen
                        sharing — all from your browser.
                    </p>

                    <div className="heroButtons">
                        <button
                            className="primaryBtn"
                            onClick={createMeeting}
                        >
                            Create Meeting
                        </button>

                        <button
                            className="secondaryBtn"
                            onClick={() => router("/auth")}
                        >
                            Get Started
                        </button>
                    </div>

                    <div className="featureList">
                        <span>🎥 HD Video Calls</span>
                        <span>💬 Real-Time Chat</span>
                        <span>🖥 Screen Sharing</span>
                        <span>🔒 Secure Access</span>
                    </div>
                </div>

                <div className="heroImage">
                    <img src="/mobile.png" alt="Video Meeting" />
                </div>
            </div>
        </div>
    );
}
