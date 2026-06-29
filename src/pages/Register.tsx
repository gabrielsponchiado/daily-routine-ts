import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../api/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setError("");

    try {
      await auth.register(email, password);
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error creating account");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-8 font-sans">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-zinc-200/60">
        <h2 className="text-2xl font-bold text-zinc-900 mb-6 text-center">Create Account</h2>
        
        {error && <p className="text-red-500 text-xs font-medium mb-4 text-center">{error}</p>}

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-zinc-500 block mb-1.5">Email address</label>
            <input
              type="email"
              className="w-full bg-zinc-50 px-3 py-2.5 text-sm rounded-xl border border-zinc-200 outline-none focus:border-zinc-300 transition-all text-zinc-700"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-500 block mb-1.5">Password</label>
            <input
              type="password"
              className="w-full bg-zinc-50 px-3 py-2.5 text-sm rounded-xl border border-zinc-200 outline-none focus:border-zinc-300 transition-all text-zinc-700"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            disabled={loading}
            className="w-full bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-medium py-3 rounded-xl transition-all disabled:opacity-50 mt-2 cursor-pointer"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="text-zinc-500 text-xs text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-zinc-900 font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}