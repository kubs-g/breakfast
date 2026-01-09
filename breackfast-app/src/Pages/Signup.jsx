import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";



function Signup() {
const [name, setName] = useState("");
 const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

 const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.warn("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        throw new Error("User already exists.Please login.");
      }

      const data = await res.json();

      toast.success("Signup successful 👋");
        setName("");
        setEmail("");
        setPassword("");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
    return (
        <div className="signup-page">
            <div className="signup-card">
                <h1 className="signup-title">Create your account</h1>

                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="field">
                        <label>Username</label>
                        <input type="text" placeholder="Enter username" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="field">
                        <label>Email</label>
                        <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="field">
                        <label>Password</label>
                        <input type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button className="btn" type="submit">Sign Up</button>
                </form>

                <p className="signup-note">By creating an account you agree to our Terms.</p>
            </div>
        </div>
    );
}

export default Signup;