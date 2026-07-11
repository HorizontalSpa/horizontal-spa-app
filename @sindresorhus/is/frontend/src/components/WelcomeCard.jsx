import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import coinImg from "../assets/coin.webp";

export default function WelcomeCard({ content }) {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const tg = window.Telegram?.WebApp;
      if (tg) {
        tg.ready();
        tg.expand();
        console.log("Telegram WebApp инициализирован");
      } else {
        console.log("Telegram WebApp не доступен");
      }
    } catch (error) {
      console.warn("Ошибка инициализации Telegram:", error);
    }
  }, []);

  const handleStart = () => {
    window.history.pushState({}, "", "/home");
    navigate("/home");
  };

  return (
    <div className="welcome-container" style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <div className="card-content">
        <motion.img
          src={coinImg}
          alt="Coin"
          className="welcome-coin"
          initial={{ scale: 0 }}
          animate={{ scale: 1, y: [0, -20, 0] }}
          transition={{
            scale: { type: "spring", stiffness: 100 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{ width: "80px", height: "80px", display: "block", margin: "0 auto" }}
        />

        <h1 className="welcome-header" style={{ textAlign: "center", fontSize: "28px", color: "#2C3E50" }}>
          {content.headerStart}{" "}
          <span className="highlight" style={{ color: "#1ABC9C" }}>{content.highlight}</span>{" "}
          {content.headerEnd}
        </h1>
        <p className="subtext" style={{ textAlign: "center", color: "#7F8C8D", marginBottom: "24px" }}>
          {content.subtext}
        </p>

        <div className="info-list">
          {content.infoList && content.infoList.map((item, index) => (
            <div className="info-item" key={index} style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px",
              marginBottom: "8px",
              background: "#FFFFFF",
              borderRadius: "8px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
            }}>
              <span className="icon" style={{ fontSize: "24px" }}>{item.icon}</span>
              <div>
                <p className="info-title" style={{ margin: "0", fontWeight: "500", color: "#2C3E50" }}>{item.title}</p>
                <p className="info-desc" style={{ margin: "0", fontSize: "14px", color: "#7F8C8D" }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button 
          className="start-button" 
          onClick={handleStart}
          style={{
            width: "100%",
            padding: "16px",
            background: "#1ABC9C",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "8px",
            fontSize: "18px",
            fontWeight: "bold",
            marginTop: "16px",
            cursor: "pointer"
          }}
        >
          {content.buttonText}
        </button>
      </div>
    </div>
  );
}
