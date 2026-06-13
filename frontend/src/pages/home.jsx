import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import "../App.css";
import {
  Button,
  IconButton,
  TextField,
  Paper,
} from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { AuthContext } from "../contexts/AuthContext";

function HomeComponent() {
  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");

  const { addToUserHistory } = useContext(AuthContext);

  const handleJoinVideoCall = async () => {
    if (!meetingCode.trim()) return;

    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  const createMeeting = async () => {
    const roomId = Math.random().toString(36).substring(2, 10);

    await addToUserHistory(roomId);
    navigate(`/${roomId}`);
  };

  const copyMeetingCode = async () => {
    if (!meetingCode) return;

    await navigator.clipboard.writeText(meetingCode);
    alert("Meeting code copied!");
  };

  return (
    <>
      <div className="navBar">
        <div>
          <h2 style={{ color: "#ff9839" }}>VideoConnect</h2>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <IconButton
            onClick={() => {
              navigate("/history");
            }}
          >
            <RestoreIcon />
          </IconButton>

          <p>History</p>

          <Button
            variant="outlined"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="meetContainer">
        <div className="leftPanel">
          <Paper
            elevation={5}
            sx={{
              padding: "30px",
              borderRadius: "20px",
              maxWidth: "550px",
            }}
          >
            <h1>Start or Join a Meeting</h1>

            <p>
              Connect instantly with HD video calls, live chat and screen
              sharing.
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <TextField
                fullWidth
                label="Meeting Code"
                value={meetingCode}
                onChange={(e) => setMeetingCode(e.target.value)}
              />

              <IconButton onClick={copyMeetingCode}>
                <ContentCopyIcon />
              </IconButton>
            </div>

            <div
              style={{
                display: "flex",
                gap: "15px",
                marginTop: "20px",
              }}
            >
              <Button
                variant="contained"
                startIcon={<VideoCallIcon />}
                onClick={handleJoinVideoCall}
              >
                Join Meeting
              </Button>

              <Button
                variant="outlined"
                onClick={createMeeting}
              >
                Create Meeting
              </Button>
            </div>
          </Paper>
        </div>

        <div className="rightPanel">
          <img src="/logo3.png" alt="Video Meeting" />
        </div>
      </div>
    </>
  );
}

export default withAuth(HomeComponent);
