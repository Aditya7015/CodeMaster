import React from "react";
import {useNavigate} from "react-router";
import { useState } from "react";
import AuthModal from "../components/authModal";
import { NavLink } from "react-router";
import {
  Terminal,
  Code2,
  Rocket,
  ChevronRight,
  CheckCircle,
  Menu,
  X,
  Hash,
  Braces,
  Link,
  TreePine,
  Cpu,
} from "lucide-react";

const Homepage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  // const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  // const [authMode, setAuthMode] = useState('signup'); // 'signup' or 'signin'

  // const openSignup = () => {
  //   setAuthMode('signup');
  //   setIsAuthModalOpen(true);
  // };

  // const openSignin = () => {
  //   setAuthMode('signin');
  //   setIsAuthModalOpen(true);
  // };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-700 selection:bg-green-100 selection:text-green-900">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
          {/* Left column */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              New: 100+ problems added
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
              Master the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                Code
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 mb-8">
              Practice coding challenges, prepare for interviews, and join a community of 1M+ developers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <NavLink to="/problems" className="btn btn-primary bg-green-600 hover:bg-green-700 text-white border-none rounded-full px-8 py-3 text-base shadow-md">
                Start Coding
                <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" size={18} />
              </NavLink>
              <NavLink to="/problems" className="btn btn-outline border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full px-8 py-3 text-base">
                View Problems
              </NavLink>
            </div>
            <div className="flex items-center gap-6 mt-8 text-sm text-gray-500 justify-center lg:justify-start">
              <span className="flex items-center gap-1">
                <CheckCircle size={18} className="text-green-600" />
                2,500+ problems
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle size={18} className="text-green-600" />
                Free forever
              </span>
            </div>
          </div>

          {/* Right column - Light code mockup */}
          <div className="flex-1 w-full max-w-xl">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="ml-2 text-xs text-gray-500 font-mono">two-sum.js</span>
              </div>
              <div className="p-4 font-mono text-sm bg-white">
                <div className="text-gray-400 flex gap-4">
                  <span>1</span> <span className="text-gray-800">function twoSum(nums, target) {'{'}</span>
                </div>
                <div className="text-gray-400 flex gap-4">
                  <span>2</span> <span className="text-gray-600 ml-4">const map = new Map();</span>
                </div>
                <div className="text-gray-400 flex gap-4 bg-green-50">
                  <span className="text-green-600">3</span> <span className="text-gray-800 ml-4">for (let i = 0; i {'<'} nums.length; i++) {'{'}</span>
                </div>
                <div className="text-gray-400 flex gap-4 pl-8">
                  <span>4</span> <span className="text-gray-600">const complement = target - nums[i];</span>
                </div>
                <div className="text-gray-400 flex gap-4 pl-8">
                  <span>5</span> <span className="text-gray-600">if (map.has(complement))</span>
                </div>
                <div className="text-gray-400 flex gap-4 pl-12">
                  <span>6</span> <span className="text-gray-800">return [map.get(complement), i];</span>
                </div>
                <div className="text-gray-400 flex gap-4 pl-8">
                  <span>7</span> <span className="text-gray-600">map.set(nums[i], i);</span>
                </div>
                <div className="text-gray-400 flex gap-4">
                  <span>8</span> <span className="text-gray-600 ml-4">{'}'}</span>
                </div>
                <div className="text-gray-400 flex gap-4">
                  <span>9</span> <span className="text-gray-800">{'}'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Why developers love CodeMaster
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16">
            Everything you need to go from beginner to interview-ready.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Terminal className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Code in any language</h3>
              <p className="text-gray-600">JavaScript, Python, Java, C++ and 10+ languages with syntax highlighting.</p>
            </div>
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Rocket className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant feedback</h3>
              <p className="text-gray-600">Run your code against test cases and get results in milliseconds.</p>
            </div>
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Track progress</h3>
              <p className="text-gray-600">Monitor your improvement with heatmaps and performance graphs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TOPICS SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Explore by topic
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            From arrays to dynamic programming, find the right problems to practice.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { name: "Arrays", icon: Hash },
              { name: "Strings", icon: Braces },
              { name: "Linked Lists", icon: Link },
              { name: "Trees", icon: TreePine },
              { name: "Dynamic Prog.", icon: Cpu },
              { name: "Graphs", icon: TreePine },
            ].map((topic) => (
              <div key={topic.name} className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition cursor-pointer border border-gray-100">
                <topic.icon className="mx-auto text-green-600 mb-2" size={24} />
                <span className="text-sm font-medium text-gray-800">{topic.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUSTED BY SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-wider text-gray-500 mb-6">Trusted by developers from</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 text-gray-400">
            <span className="text-xl font-semibold text-gray-700">Google</span>
            <span className="text-xl font-semibold text-gray-700">Meta</span>
            <span className="text-xl font-semibold text-gray-700">Amazon</span>
            <span className="text-xl font-semibold text-gray-700">Microsoft</span>
            <span className="text-xl font-semibold text-gray-700">Netflix</span>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Start your coding journey today</h2>
          <p className="text-lg text-white/90 mb-8">Join millions of developers and land your dream job.</p>
          <button className="btn bg-white text-green-600 hover:bg-gray-100 border-none rounded-full px-8 py-3 text-base shadow-lg">
            Create free account
          </button>
        </div>
      </section>

      {/* Auth Modal */}
      {/* <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        setMode={setAuthMode}
      /> */}

      {/* FOOTER */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-green-600">Problems</a></li>
                <li><a href="#" className="hover:text-green-600">Contests</a></li>
                <li><a href="#" className="hover:text-green-600">Discuss</a></li>
                <li><a href="#" className="hover:text-green-600">Leaderboard</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-green-600">About</a></li>
                <li><a href="#" className="hover:text-green-600">Careers</a></li>
                <li><a href="#" className="hover:text-green-600">Blog</a></li>
                <li><a href="#" className="hover:text-green-600">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-green-600">Help center</a></li>
                <li><a href="#" className="hover:text-green-600">Documentation</a></li>
                <li><a href="#" className="hover:text-green-600">FAQ</a></li>
                <li><a href="#" className="hover:text-green-600">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-green-600">Privacy</a></li>
                <li><a href="#" className="hover:text-green-600">Terms</a></li>
                <li><a href="#" className="hover:text-green-600">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-sm text-gray-500">
            © 2026 CodeMaster. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;