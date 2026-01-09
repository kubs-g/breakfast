import { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [mood, setMood] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!mood.trim()) return alert("Please type how you feel");

    setLoading(true);
    setResult("");

    try {
      const res = await fetch("http://localhost:4000/api/meal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setResult(data.mealPlan);
      setMood("");
    } catch (err) {
      setResult("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="auth-buttons">
        <button onClick={() => navigate("/Signup")}>Signup</button>
        <button onClick={() => navigate("/Login")}>Login</button>
      </div>

      <div className="container">
        <h1 className="logo">MoodMunch</h1>
        <p className="subtitle">Personalized breakfast for your current vibe.</p>

        <div className="card">
          <h2>How are you feeling today?</h2>
          <p className="card-sub">We'll find the perfect fuel for your mood.</p>

          <input
            type="text"
            className="input"
            placeholder="e.g. tired, excited, stressed..."
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            disabled={loading}
          />

          <button className="button" onClick={handleSubmit} disabled={loading}>
            {loading ? "🤔 Thinking..." : "🍴 Get My Breakfast"}
          </button>

          {result && <div className="result">{result}</div>}
        </div>

        <p className="footer">Freshly prepared for your 2026 morning.</p>
      </div>
    </>
  );
}

export default Home;
