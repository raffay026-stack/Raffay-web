import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import StyleQuizModal from '../components/ScentQuizModal';
import { Crown, Lock, Mail, User as UserIcon, ArrowRight, Eye, EyeOff } from "lucide-react";
import { AUTH } from "../constants/testIds";

export default function AuthView() {
  const { loginUser } = useApp();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [email, setEmail] = useState("alexander@lixirnoir.com");
  const [password, setPassword] = useState("â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢");
  const [name, setName] = useState("Alexander Wright");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(email, name);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-100 font-serif selection:bg-[#080809] selection:text-[#0A0A0A]">
      <Navbar onOpenCart={() => setIsCartOpen(true)} onOpenQuiz={() => setIsQuizOpen(true)} />

      <div className="max-w-md mx-auto px-4 py-20">
        
        <div className="bg-gradient-to-b from-[#14110C] to-[#0A0A0A] border border-[#080809]/40 rounded-lg p-8 shadow-2xl space-y-6 relative overflow-hidden">
          
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#080809]/10 blur-3xl rounded-full pointer-events-none" />

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-[#080809] to-[#177A69] flex items-center justify-center text-[#0A0A0A] shadow-lg">
              <Crown className="w-7 h-7 fill-current" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-[#F3EFE6]">
              {isLogin ? "Private Salon Sign In" : "Register Connoisseur VIP"}
            </h1>
            <p className="text-xs text-neutral-400 font-serif">
              {isLogin ? "Enter your credentials to access your private salon." : "Join our inner circle for exclusive Perfume releases."}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-serif">
            
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-neutral-300 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#080809]/30 px-3 py-2.5 text-neutral-100 focus:outline-none focus:border-[#080809] rounded pl-9"
                    data-testid={AUTH.nameInput}
                  />
                  <UserIcon className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-neutral-300 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#080809]/30 px-3 py-2.5 text-neutral-100 focus:outline-none focus:border-[#080809] rounded pl-9"
                  data-testid={AUTH.emailInput}
                />
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-300 uppercase tracking-wider">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#080809]/30 px-3.5 py-2.5 text-neutral-100 focus:outline-none focus:border-[#080809] rounded pl-9 pr-9"
                  data-testid={AUTH.passwordInput}
                />
                <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-neutral-400 hover:text-[#080809]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-[#080809]" />
                <span>Remember this device</span>
              </label>
              <span className="text-[#080809] hover:underline cursor-pointer">Forgot password?</span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#F4F1E9] via-[#080809] to-[#46CDB3] text-[#0A0A0A] font-serif text-xs font-bold uppercase tracking-widest rounded shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-2 mt-6"
              data-testid={isLogin ? AUTH.loginBtn : AUTH.signupBtn}
            >
              <span>{isLogin ? "Sign In to Salon" : "Create VIP Account"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          {/* Toggle login/signup */}
          <div className="text-center pt-4 border-t border-neutral-800 text-xs font-serif">
            <span className="text-neutral-400">
              {isLogin ? "New to ð“¢ð“¬ð“®ð“·ð“½ð“¸ð“»ð“ª?" : "Already a connoisseur?"}
            </span>{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#080809] font-bold hover:underline ml-1"
            >
              {isLogin ? "Create an account" : "Sign In"}
            </button>
          </div>

        </div>

      </div>

      <Footer />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <StyleQuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </div>
  );
}















