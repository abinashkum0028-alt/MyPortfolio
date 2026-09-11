import { useState, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Smartphone,
  Globe, 
  LayoutTemplate,
  ArrowRight, 
  Briefcase, 
  Mail, 
  ExternalLink,
  GraduationCap,
  ChevronLeft,
  Layout,
  Layers,
  Search,
  PenTool,
  Users,
  CreditCard,
  Wifi,
  MapPin,
  Heart,
  Calendar,
  PlayCircle,
  Star,
  Menu,
  Bell,
  Music
} from 'lucide-react';

type IconProps = {
  className?: string;
};

type PortfolioProject = {
  id: string;
  title: string;
  category: string;
  image: string;
  link: string;
  description: string;
  icon: ReactNode;
  span: string;
};

// Custom Behance Icon (Exact SVG Path)
const BehanceIcon = ({ className }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.363 14.947c0-1.848-.879-3.214-2.695-3.726 1.325-.631 2.016-1.587 2.016-3.074 0-2.932-2.192-3.647-4.721-3.647H0v14.721h7.158c2.684 0 5.205-1.283 5.205-4.274M3.246 7.013h3.046c1.171 0 2.225.328 2.225 1.682 0 1.25-.82 1.753-1.98 1.753H3.246zm-.001 9.708v-4.054h3.538c1.429 0 2.333.594 2.333 2.102 0 1.487-1.079 1.952-2.4 1.952zM18.796 19.5c2.554 0 4.208-1.147 5.004-3.585h-2.592c-.279.91-1.429 1.391-2.321 1.391-1.721 0-2.625-1.005-2.625-2.713h7.713c.244-3.418-1.66-6.331-5.18-6.331-3.259 0-5.471 2.442-5.471 5.641 0 3.32 2.096 5.597 5.472 5.597m-.092-9.026c1.475 0 2.217.864 2.341 2.277h-4.779c.097-1.401 1.03-2.277 2.438-2.277m-3.037-5.201h5.988v1.45h-5.988z"/>
  </svg>
);

// Custom LinkedIn Icon (Exact SVG Path)
const LinkedInIcon = ({ className }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 176 176">
    <path d="M152 0H24A24 24 0 0 0 0 24v128a24 24 0 0 0 24 24h128a24 24 0 0 0 24-24V24a24 24 0 0 0-24-24M60 139.28a3.71 3.71 0 0 1-3.71 3.72H40.48a3.71 3.71 0 0 1-3.72-3.72V73a3.72 3.72 0 0 1 3.72-3.72h15.81A3.72 3.72 0 0 1 60 73zM48.38 63a15 15 0 1 1 15-15 15 15 0 0 1-15 15m94.26 76.54a3.41 3.41 0 0 1-3.42 3.42h-17a3.41 3.41 0 0 1-3.42-3.42v-31.05c0-4.64 1.36-20.32-12.13-20.32-10.45 0-12.58 10.73-13 15.55v35.86A3.42 3.42 0 0 1 90.3 143H73.88a3.41 3.41 0 0 1-3.41-3.42V72.71a3.41 3.41 0 0 1 3.41-3.42H90.3a3.42 3.42 0 0 1 3.42 3.42v5.78c3.88-5.83 9.63-10.31 21.9-10.31 27.18 0 27 25.38 27 39.32z"/>
  </svg>
);

const PORTFOLIO_DATA = {
  name: "Abinash Kumar",
  title: "Interaction Designer | UI/UX Designer | Product Designer",
  phone: "(+91) 8147528659",
  email: "abinash.kum0028@gmail.com",
  location: "Bengaluru, India",
  links: {
    linkedin: "https://www.linkedin.com/in/abinash-kumar-a3ab04163/",
    behance: "https://www.behance.net/abinashkum007"
  },
  bio: "Results-driven UI/UX Designer with 5 years of experience crafting intuitive, visually compelling digital experiences. Proficient in Interaction Design, Usability Testing, and User Research. Holds a Master's in Interaction Design from Harbour.Space University, Barcelona. Proven track record of increasing user engagement, improving conversion rates, and ensuring brand consistency across web and mobile platforms through a user-centered design approach.",
  projects: [
    {
      id: "auto-renewal",
      title: "Auto-Renewal Management",
      category: "UX Case Study",
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=1200",
      link: "https://www.behance.net/gallery/246087055/UX-Case-Study-Auto-Renewal-Management",
      description: "Solved the issue of high customer support volume and user frustration in a telecom MVNO app by designing an intuitive, discoverable toggle for managing plan auto-renewals within the payment settings, giving users clear control over their subscriptions.",
      icon: <Activity className="w-6 h-6" strokeWidth={1.5} />,
      span: "md:col-span-2 md:row-span-2"
    },
    {
      id: "arogya-pal",
      title: "Health-care App",
      category: "Mobile Design",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
      link: "https://www.behance.net/gallery/184156649/Health-care-App",
      description: "Addressed the complexity of managing personal healthcare by designing a centralized mobile platform. The solution simplifies booking doctor appointments, tracking daily vitals, and organizing medical records for patients on the go.",
      icon: <Smartphone className="w-6 h-6" strokeWidth={1.5} />,
      span: "md:col-span-1 md:row-span-1"
    },
    {
      id: "wanderlust",
      title: "Travel App for Nomads",
      category: "Product Design",
      image: "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?auto=format&fit=crop&q=80&w=1200",
      link: "https://www.behance.net/gallery/147623177/A-travel-app-for-backpacker-and-digital-nomad-",
      description: "Tackled the challenge digital nomads face when finding reliable workspaces abroad. This product design focuses on curating and filtering travel destinations based on crucial remote-work amenities like fast Wi-Fi and co-working spaces.",
      icon: <Globe className="w-6 h-6" strokeWidth={1.5} />,
      span: "md:col-span-1 md:row-span-2"
    },
    {
      id: "beatdrop",
      title: "Music News Publishing",
      category: "Web Platform",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1200",
      link: "https://www.behance.net/gallery/147879569/Music-News-Publishing-Website",
      description: "Overcame the cluttered reading experience of traditional music blogs by architecting a clean, immersive editorial platform. The design prioritizes content readability and discovery, featuring a modern dark-mode interface and integrated track previews.",
      icon: <LayoutTemplate className="w-6 h-6" strokeWidth={1.5} />,
      span: "md:col-span-2 md:row-span-1"
    }
  ],
  experience: [
    {
      role: "Associate (UI/UX Designer)",
      company: "LycaDigital (Part of Lyca Group)",
      period: "March 2024 - March 2026",
      location: "Bengaluru, India",
      bullets: [
        "Contributed to the design and development of Lycamobile's website and mobile app, enhancing user satisfaction and engagement through intuitive interface design.",
        "Collaborated with cross-functional teams including product, engineering, and marketing to implement design solutions that increased conversions and reduced customer support costs.",
        "Ensured brand consistency across all digital platforms by developing and maintaining a unified design language and optimised user experiences.",
        "Conducted usability testing sessions and applied findings to iterate and improve interface designs."
      ]
    },
    {
      role: "UX /UI Designer",
      company: "Softiva IT Solutions",
      period: "October 2022 - February 2024",
      location: "Bengaluru, India",
      bullets: [
        "Designed user-centric digital experiences for Softiva's IT services and client-facing solutions, translating business requirements into intuitive, visually engaging web interfaces.",
        "Led UI/UX design for Lekha, a B2B SaaS accounts payable automation platform integrated with Tally Prime, simplifying complex financial workflows and improving usability.",
        "Created scalable design systems and reusable Figma components, establishing consistent visual language, responsive layouts, typography, spacing, and interaction patterns across projects.",
        "Collaborated with clients, product teams, and developers to understand requirements, conduct design iterations, address usability and accessibility considerations, and deliver designs aligned with both user needs and business objectives."
      ]
    },
    {
      role: "Designer",
      company: "Pee Gee Fabrics",
      period: "December 2018 - January 2020",
      location: "Ahmedabad, India",
      bullets: [
        "Developed innovative prints and colorways for seasonal collections, enhancing the aesthetic appeal of shirtings, suitings, and bottoms.",
        "Collaborated with cross-functional teams to ensure alignment on design concepts and seasonal trends.",
        "Conducted thorough market research to identify emerging trends and consumer preferences, informing design decisions.",
        "Enhanced brand identity by integrating current fashion trends into thoughtful design solutions, resulting in increased customer engagement."
      ]
    },
    {
      role: "Textile Designer",
      company: "Apsara Silks",
      period: "September 2018 - November 2018",
      location: "Bengaluru, India",
      bullets: [
        "Worked as a print designer specialising in textile patterns, focusing on fabric surface design and colour application.",
        "Designed intricate textile patterns, elevating the brand's aesthetic appeal and market competitiveness.",
        "Collaborated with the production team to ensure the feasibility and quality of print designs.",
        "Researched current trends in textile design to continuously refresh and innovate the product line.",
        "Streamlined the design process, improving efficiency and reducing turnaround time on project deliverables.",
        "Developed a keen eye for color theory and pattern composition, enhancing overall design quality."
      ]
    }
  ],
  education: [
    {
      degree: "M.A in Interaction Design (UI/UX)",
      school: "Harbour.Space University - Barcelona, Spain",
      period: "2021-2022"
    },
    {
      degree: "Bachelor of Design in Textile Design",
      school: "National Institute of Fashion Technology (NIFT) - Bengaluru, India",
      period: "2014-2018"
    }
  ],
  skills: [
    {
      category: "Design Tools",
      items: ["Figma", "Miro", "Adobe Photoshop", "Adobe Illustrator", "Canva", "Adobe Indesign"],
      icon: <PenTool className="w-5 h-5 mb-3 text-indigo-400" />
    },
    {
      category: "AI Tools",
      items: ["Gemini", "Claude", "ChatGPT", "Perplexity"],
      icon: <Activity className="w-5 h-5 mb-3 text-indigo-400" />
    },
    {
      category: "UX Methods",
      items: ["User-Centered Design", "User Stories", "User Research", "Interaction Design", "Usability Testing", "Information Architecture", "User Flows", "Competitive Analysis", "Survey Design", "Wireframing", "Prototyping", "Agile Methodology"],
      icon: <Search className="w-5 h-5 mb-3 text-indigo-400" />
    },
    {
      category: "UI Skills",
      items: ["UI Design", "Visual Design", "Mobile UI Design", "Web UI Design", "App Design", "User Interface Designing", "Design Systems", "Style Guides", "Typography", "Grid System"],
      icon: <Layout className="w-5 h-5 mb-3 text-indigo-400" />
    },
    {
      category: "Soft Skills",
      items: ["Adaptable", "Problem Solving", "Result-Oriented", "Cross-functional Collaboration", "Client Communication"],
      icon: <Users className="w-5 h-5 mb-3 text-indigo-400" />
    },
    {
      category: "Languages",
      items: ["English (Fluent)", "Hindi (Native)"],
      icon: <Globe className="w-5 h-5 mb-3 text-indigo-400" />
    }
  ],
  internships: [
    {
      role: "UX Internship - Startup Commons",
      duration: "60 Days",
      bullets: ["Contributed to UX research and design initiatives for an early-stage startup support platform."]
    },
    {
      role: "Graduation Project Arvind Mills (Tresca Brands)",
      duration: "120 Days",
      bullets: [
        "Developed prints, yarn-dyed, and dobby chambrays for Tresca Brands under Arvind Mills.",
        "Focused on designing and creating innovative textile patterns aligned with seasonal market trends."
      ]
    }
  ],
  certifications: [
    {
      title: "Claude 101",
      issuer: "Claude Code",
      date: "Aug 2026",
      id: "Link",
      link: "#" 
    },
    {
      title: "Generative AI Fundamentals",
      issuer: "Google Cloud Skill Badge",
      date: "Oct 2023",
      id: "5610369",
      link: "#" 
    },
    {
      title: "Introduction to Large Language Models",
      issuer: "Google Cloud Skill Badge",
      date: "Oct 2023",
      id: "5610160",
      link: "#" 
    },
    {
      title: "Introduction to Responsible AI",
      issuer: "Google Cloud Skill Badge",
      date: "Oct 2023",
      id: "5586463",
      link: "#" 
    },
    {
      title: "Introduction to Generative AI",
      issuer: "Google Cloud Skill Badge",
      date: "Oct 2023",
      id: "5574877",
      link: "#" 
    }
  ]
};


const AutoRenewalMockup = () => {
  const [isAutoRenewOn, setIsAutoRenewOn] = useState(true);

  return (
    <div className="w-full max-w-[340px] h-[650px] bg-[#f8fafc] rounded-[2.5rem] shadow-2xl border-[8px] border-gray-900 overflow-hidden relative font-sans mx-auto flex flex-col">
      <div className="h-6 w-full bg-[#f8fafc] flex justify-between items-center px-6 pt-2">
        <span className="text-[10px] font-medium text-gray-800">9:41</span>
        <div className="flex gap-1.5 items-center">
          <Activity className="w-3 h-3 text-gray-800" />
          <Wifi className="w-3 h-3 text-gray-800" />
          <div className="w-4 h-2 bg-gray-800 rounded-sm"></div>
        </div>
      </div>

      <div className="px-6 py-4 flex items-center justify-between bg-[#f8fafc]">
        <Menu className="w-5 h-5 text-gray-700" />
        <h3 className="font-semibold text-gray-900 text-sm">Manage Payment</h3>
        <Bell className="w-5 h-5 text-gray-700" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 space-y-6">
        <div className="bg-white p-5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Current Plan</p>
              <p className="font-bold text-gray-900 text-lg">Unlimited 5G Max</p>
            </div>
            <div className="text-right">
              <span className="text-indigo-600 font-bold text-xl">$45</span><span className="text-xs text-gray-400">/mo</span>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-gray-600">Data Usage</span>
              <span className="text-gray-900">42GB / ∞</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 w-[70%] rounded-full"></div>
            </div>
          </div>
          <p className="text-[11px] text-gray-400">Cycle ends in 12 days (Nov 24, 2026)</p>
        </div>

        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">Payment Settings</h4>
          <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 divide-y divide-gray-50">
            
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Payment Method</p>
                  <p className="text-xs text-gray-400">Visa ending in 4242</p>
                </div>
              </div>
              <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
            </div>

            <div className="p-4 flex items-center justify-between bg-indigo-50/30">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Auto-Renewal</p>
                  <p className="text-[10px] text-gray-500 max-w-[140px] leading-tight mt-0.5">Automatically renew plan at the end of billing cycle.</p>
                </div>
              </div>
              
              <button 
                onClick={() => setIsAutoRenewOn(!isAutoRenewOn)}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out flex ${isAutoRenewOn ? 'bg-indigo-600 justify-end' : 'bg-gray-300 justify-start'}`}
              >
                <motion.div 
                  layout
                  className="w-4 h-4 bg-white rounded-full shadow-sm"
                />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

const ArogyaPalMockup = () => {
  return (
    <div className="w-full max-w-[340px] h-[650px] bg-white rounded-[2.5rem] shadow-2xl border-[8px] border-gray-900 overflow-hidden relative font-sans mx-auto flex flex-col">
       <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-b-[2rem] z-0"></div>
       
       <div className="relative z-10 flex-1 flex flex-col px-5 pt-12 pb-6">
          <div className="flex justify-between items-center mb-8">
            <div className="text-white">
              <p className="text-sm opacity-80">Good Morning,</p>
              <h3 className="text-2xl font-bold">Jane Doe</h3>
            </div>
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white">
              <Bell className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-bl-full -z-10"></div>
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-bold text-gray-900">Upcoming Visit</h4>
              <span className="bg-teal-100 text-teal-700 text-xs font-bold px-2 py-1 rounded-md">Today</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=150" alt="Doctor" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Dr. Sarah Jenkins</p>
                <p className="text-xs text-gray-500">Cardiologist • City Hospital</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex gap-4 text-sm font-medium text-gray-600">
              <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-teal-500"/> 10:30 AM</div>
            </div>
          </div>

          <h4 className="font-bold text-gray-900 mb-3">Your Vitals</h4>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100">
              <Heart className="w-5 h-5 text-rose-500 mb-2" />
              <p className="text-xs text-gray-500 font-medium">Heart Rate</p>
              <p className="text-xl font-bold text-gray-900">72 <span className="text-xs font-normal">bpm</span></p>
            </div>
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
              <Activity className="w-5 h-5 text-blue-500 mb-2" />
              <p className="text-xs text-gray-500 font-medium">Blood Press.</p>
              <p className="text-xl font-bold text-gray-900">120/80</p>
            </div>
          </div>
       </div>
    </div>
  );
};

const WanderlustMockup = () => {
  return (
    <div className="w-full max-w-[340px] h-[650px] bg-[#FAFAFA] rounded-[2.5rem] shadow-2xl border-[8px] border-gray-900 overflow-hidden relative font-sans mx-auto flex flex-col">
      <div className="px-5 pt-12 pb-4 bg-white">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black text-gray-900 tracking-tight">Desk<span className="text-orange-500">overy.</span></h3>
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="Avatar" className="w-8 h-8 rounded-full" />
        </div>
        
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
          <input type="text" placeholder="Where to next?" className="w-full bg-gray-100 text-sm font-medium rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-orange-500/50 transition-all" />
        </div>

        <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
          <div className="px-4 py-1.5 bg-orange-500 text-white text-xs font-bold rounded-full whitespace-nowrap shadow-sm">Fast Wi-Fi</div>
          <div className="px-4 py-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-bold rounded-full whitespace-nowrap shadow-sm">Co-Working</div>
          <div className="px-4 py-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-bold rounded-full whitespace-nowrap shadow-sm">Beach</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        <h4 className="font-bold text-lg text-gray-900 mb-4">Top for Nomads</h4>
        
        <div className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer mb-4">
          <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800" alt="Bali" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          
          <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md rounded-full px-2 py-1 flex items-center gap-1 border border-white/30">
            <Wifi className="w-3 h-3 text-white" />
            <span className="text-white text-[10px] font-bold">120 Mbps</span>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <h5 className="text-white font-bold text-xl mb-1">Canggu, Bali</h5>
            <div className="flex items-center gap-3 text-gray-300 text-xs font-medium">
              <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400" fill="currentColor"/> 4.9</span>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/> Indonesia</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BPMMockup = () => {
  return (
    <div className="w-full max-w-[600px] h-[550px] bg-[#1E1E1E] rounded-3xl shadow-2xl border border-white/5 overflow-hidden relative font-sans mx-auto flex">
      {/* Sidebar (Desktop) */}
      <div className="flex w-48 p-8 flex-col shrink-0 border-r border-white/5 bg-[#222]">
        <div className="flex items-center gap-2 mb-10">
          <Music className="w-6 h-6 text-[#A78BFA]" />
          <h3 className="text-xl font-bold text-white tracking-tight">BPM.</h3>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-white font-medium flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl text-sm"><Activity className="w-4 h-4"/> Discover</div>
          <div className="text-gray-500 font-medium flex items-center gap-3 hover:text-white px-4 py-2 transition-colors cursor-pointer text-sm"><PlayCircle className="w-4 h-4"/> New Releases</div>
          <div className="text-gray-500 font-medium flex items-center gap-3 hover:text-white px-4 py-2 transition-colors cursor-pointer text-sm"><Star className="w-4 h-4"/> Editorials</div>
        </div>
      </div>

      {/* Main Content matching Screenshot layout */}
      <div className="flex-1 bg-[#1E1E1E] p-10 overflow-y-auto relative">
        {/* Purple highlight border overlay indicating selection as seen in user's image */}
        <div className="absolute inset-4 border border-indigo-500/50 rounded-2xl pointer-events-none shadow-[0_0_15px_rgba(99,102,241,0.1)]"></div>
        
        <div className="relative z-10 max-w-[300px]">
            {/* Hero Card as text container */}
            <div className="bg-[#1a1a1a] rounded-2xl p-6 mb-8 border border-white/5">
                <h4 className="text-[10px] font-bold text-[#A78BFA] tracking-[0.15em] uppercase mb-4">Exclusive Drop</h4>
                <h2 className="text-3xl font-bold text-white leading-[1.1] mb-6">
                    The Resurgence<br/>of Analog<br/>Synths in<br/>Modern<br/>Hip-Hop.
                </h2>
                <div className="flex items-center text-[10px] text-gray-400 font-medium gap-6">
                    <span className="leading-tight">By Marcus<br/>Reed</span>
                    <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                    <span className="leading-tight">4 min<br/>read</span>
                </div>
            </div>

            {/* Trending Tracks */}
            <div>
                <h4 className="text-[14px] font-bold text-white mb-5">Trending Tracks</h4>
                <div className="space-y-4">
                    {[1, 2].map((item) => (
                    <div key={item} className="flex items-center gap-4">
                        <div className="font-bold text-gray-600 text-sm w-4">{item}</div>
                        <div className="w-10 h-10 bg-[#333333] rounded-lg shrink-0"></div>
                        <div className="flex-1">
                            <p className="font-bold text-white text-[12px] leading-tight mb-1">Midnight<br/>City</p>
                            <p className="text-[10px] text-gray-500 leading-tight">Neon<br/>Dreams</p>
                        </div>
                        <div className="text-[11px] text-gray-600 font-medium">3:42</div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const ProjectShowcase = ({ project, onBack }: { project: PortfolioProject; onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderMockup = () => {
    switch(project.id) {
      case 'auto-renewal': return <AutoRenewalMockup />;
      case 'arogya-pal': return <ArogyaPalMockup />;
      case 'wanderlust': return <WanderlustMockup />;
      case 'beatdrop': return <BPMMockup />;
      default: return null;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#111111] text-white pt-32 pb-24 px-6 md:px-12 relative z-10"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-between">
        
        {/* Left Side: Info */}
        <div className="w-full lg:w-[45%] flex flex-col items-start lg:sticky top-32">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group text-sm"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-6">
            {project.category}
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-[1.1]">{project.title}</h1>
          
          <p className="text-gray-400 text-lg leading-relaxed mb-10">
            {project.description}
          </p>

          <a 
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold transition-all active:scale-95 flex items-center gap-2 shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:shadow-[0_0_40px_rgba(99,102,241,0.5)]"
          >
            Read Full Case Study on Behance
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Right Side: Mockup Component */}
        <div className="w-full lg:w-[55%] flex justify-center items-center py-10 lg:py-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="w-full flex justify-end"
          >
            {renderMockup()}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const ResumePage = ({ onBack }: { onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#030303] text-white pt-32 pb-24 px-6 md:px-12 relative z-20"
    >
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </button>

        <header className="mb-16 pb-8 border-b border-white/10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{PORTFOLIO_DATA.name}</h1>
          <h2 className="text-2xl text-indigo-400 font-medium mb-6">{PORTFOLIO_DATA.title}</h2>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-300">
            <span className="flex items-center gap-2"><Activity className="w-4 h-4" /> {PORTFOLIO_DATA.phone}</span>
            <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> {PORTFOLIO_DATA.email}</span>
            <span className="flex items-center gap-2"><Globe className="w-4 h-4" /> {PORTFOLIO_DATA.location}</span>
          </div>
        </header>

        <section className="mb-16">
          <h3 className="text-2xl font-bold mb-6 text-white/90 flex items-center gap-3">
            <Briefcase className="text-indigo-500 w-6 h-6" />
            Professional Summary
          </h3>
          <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/5 shadow-inner">
            <p className="text-gray-300 leading-relaxed text-lg">
              {PORTFOLIO_DATA.bio}
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-2xl font-bold mb-6 text-white/90 flex items-center gap-3">
            <Layers className="text-indigo-500 w-6 h-6" />
            Key Skills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PORTFOLIO_DATA.skills.map((skillGroup, idx) => (
              <div key={idx} className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-indigo-500/30 transition-colors">
                {skillGroup.icon}
                <h4 className="font-semibold text-white mb-4 tracking-wide">{skillGroup.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((item, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-white/90 flex items-center gap-3">
            <Activity className="text-indigo-500 w-6 h-6" />
            Work Experience
          </h3>
          <div className="space-y-12">
            {PORTFOLIO_DATA.experience.map((job, idx) => (
              <div key={idx} className="relative pl-8 md:pl-0">
                <div className="hidden md:block absolute left-[-24px] top-1.5 w-3 h-3 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                <div className="hidden md:block absolute left-[-19px] top-4 bottom-[-48px] w-0.5 bg-gradient-to-b from-indigo-500/50 to-transparent"></div>
                
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-white">{job.role}</h4>
                    <h5 className="text-lg text-indigo-400 font-medium">{job.company}</h5>
                  </div>
                  <div className="text-sm text-gray-400 mt-2 md:mt-0 md:text-right font-medium">
                    <p>{job.period}</p>
                    <p>{job.location}</p>
                  </div>
                </div>
                <ul className="space-y-3 mt-4">
                  {job.bullets.map((bullet, i) => (
                    <li key={i} className="text-gray-300 leading-relaxed flex items-start">
                      <span className="mr-3 text-indigo-500 mt-1.5">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-white/90 flex items-center gap-3">
            <Layout className="text-indigo-500 w-6 h-6" />
            Internships & Projects
          </h3>
          <div className="grid gap-6">
            {PORTFOLIO_DATA.internships.map((internship, idx) => (
              <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-bold text-white">{internship.role}</h4>
                  <span className="text-sm text-indigo-400 font-medium bg-indigo-500/10 px-3 py-1 rounded-full">{internship.duration}</span>
                </div>
                <ul className="space-y-2">
                  {internship.bullets.map((bullet, i) => (
                    <li key={i} className="text-gray-300 leading-relaxed flex items-start text-sm">
                      <span className="mr-2 text-indigo-500 mt-1">-</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <section>
            <h3 className="text-2xl font-bold mb-6 text-white/90 flex items-center gap-3">
              <GraduationCap className="text-indigo-500 w-6 h-6" />
              Education
            </h3>
            <div className="space-y-6">
              {PORTFOLIO_DATA.education.map((edu, idx) => (
                <div key={idx} className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
                  <h4 className="text-lg font-bold text-white mb-2 leading-snug">{edu.degree}</h4>
                  <p className="text-indigo-400 text-sm font-medium mb-2">{edu.school}</p>
                  <p className="text-gray-500 text-sm">{edu.period}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold mb-6 text-white/90 flex items-center gap-3">
              <Activity className="text-indigo-500 w-6 h-6" />
              Licenses & Certifications
            </h3>
            <div className="space-y-4">
              {PORTFOLIO_DATA.certifications.map((cert, idx) => (
                <a 
                  key={idx} 
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-indigo-500/30 rounded-2xl p-5 transition-all group"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-md font-bold text-white group-hover:text-indigo-300 transition-colors">{cert.title}</h4>
                      <p className="text-gray-400 text-sm mt-1">{cert.issuer}</p>
                      <div className="flex gap-4 mt-3 text-xs text-gray-500">
                        <span>Issued {cert.date}</span>
                        {cert.id !== "Link" && <span>ID: {cert.id}</span>}
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-indigo-400 transition-colors" />
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};


export default function App() {
  const [currentView, setCurrentView] = useState<'portfolio' | 'resume' | 'project'>('portfolio');
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);

  const openProject = (project: PortfolioProject) => {
    setActiveProject(project);
    setCurrentView('project');
  };

  return (
    <div className="min-h-screen bg-[#030303] text-gray-200 font-sans selection:bg-indigo-500/30">
      <AnimatePresence mode="wait">
        
        {currentView === 'resume' && (
          <ResumePage key="resume" onBack={() => setCurrentView('portfolio')} />
        )}

        {currentView === 'project' && activeProject && (
          <ProjectShowcase key="project" project={activeProject} onBack={() => setCurrentView('portfolio')} />
        )}

        {currentView === 'portfolio' && (
          <motion.div 
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            {/* Ambient Background Glows */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
              <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-900/20 rounded-full blur-[120px]" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-900/10 rounded-full blur-[150px]" />
            </div>

            {/* Floating Navigation */}
            <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-5xl z-50 bg-[#161616]/90 backdrop-blur-xl border border-indigo-500/30 shadow-[0_4px_30px_rgba(99,102,241,0.1)] rounded-[2rem]">
              <div className="px-8 py-4 flex justify-between items-center">
                <span 
                  className="text-xl font-bold tracking-tight text-white cursor-pointer" 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Abinash.<span className="text-indigo-500">Designs</span>
                </span>
                
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
                  <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">About</button>
                  <button onClick={() => document.getElementById('selected-work')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Work</button>
                  <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Contact</button>
                </div>

                <div className="flex gap-3">
                  <a href={PORTFOLIO_DATA.links.behance} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-white/5 hover:bg-white/10 rounded-full border border-white/10">
                    <BehanceIcon className="w-4 h-4" />
                  </a>
                  <a href={PORTFOLIO_DATA.links.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-white/5 hover:bg-white/10 rounded-full border border-white/10">
                    <LinkedInIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </nav>

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-24">
              
              <section className="mb-32 max-w-4xl pt-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-6">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                    Available for new opportunities
                  </div>
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-[1.1] mb-8">
                    The Architect of <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                      Interaction.
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-2xl font-light mb-10">
                    I specialize in designing for emerging technologies while maintaining a firm grounding in user research and system architecture. Based in Bengaluru, I bridge the gap between complex functionality and seamless user interfaces.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={() => {
                        const workSection = document.getElementById('selected-work');
                        workSection?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:scale-105 transition-transform active:scale-95 flex items-center gap-2"
                    >
                      View Selected Work
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setCurrentView('resume')}
                      className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
                    >
                      <Briefcase className="w-4 h-4" />
                      View Full Resume
                    </button>
                  </div>
                </motion.div>
              </section>

              <section id="selected-work" className="mb-32 scroll-mt-32">
                <div className="flex items-center gap-8 mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight shrink-0">Selected Work</h2>
                  <div className="h-px bg-gradient-to-r from-indigo-500/50 to-transparent flex-grow"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[280px] gap-5 grid-flow-dense">
                  {PORTFOLIO_DATA.projects.map((project, index) => (
                    <motion.div
                      onClick={() => openProject(project)}
                      key={project.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ delay: index * 0.1, duration: 0.7, ease: "easeOut" }}
                      className={`group relative rounded-[2.5rem] overflow-hidden block cursor-pointer ${project.span} bg-[#0a0a0a] border border-white/5 hover:border-indigo-500/40 transition-all duration-700 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)]`}
                    >
                      <div className="absolute inset-0 overflow-hidden rounded-[2.5rem]">
                        <div 
                          className="absolute inset-[-5%] bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105 opacity-70 group-hover:opacity-90 saturate-50 group-hover:saturate-100"
                          style={{ backgroundImage: `url(${project.image})` }}
                        />
                      </div>
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/50 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-80" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030303]/90 opacity-80" />
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay" />

                      <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between z-10">
                        <div className="flex justify-between items-start">
                          <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] text-white flex items-center justify-center group-hover:bg-indigo-500/80 group-hover:text-white group-hover:border-indigo-400 transition-all duration-500">
                            {project.icon}
                          </div>
                          <div className="h-12 px-5 rounded-full bg-white text-black flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out shadow-xl font-bold text-sm gap-2">
                            View UI <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                        
                        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-100 bg-white/10 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md shadow-sm">
                              {project.category}
                            </span>
                          </div>
                          <h3 className="text-3xl md:text-4xl lg:text-4xl font-bold text-white leading-tight tracking-tight drop-shadow-lg">
                            {project.title}
                          </h3>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              <section className="mb-32">
                <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 md:mb-0">Recent Experience</h2>
                  <button 
                    onClick={() => setCurrentView('resume')}
                    className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-2 group transition-colors"
                  >
                    View full details
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                
                <div className="grid gap-4">
                  {PORTFOLIO_DATA.experience.slice(0, 2).map((job, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 md:p-8 rounded-[2rem] bg-[#0a0a0a] border border-white/5 hover:bg-white/[0.02] transition-colors flex flex-col md:flex-row justify-between md:items-center gap-4"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                          <Briefcase className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{job.role}</h3>
                          <p className="text-gray-400">{job.company}</p>
                        </div>
                      </div>
                      <div className="text-left md:text-right text-sm font-medium text-gray-500">
                        {job.period}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              <section className="mb-32">
                <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 md:mb-0">Education</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {PORTFOLIO_DATA.education.map((edu, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="p-8 rounded-[2rem] bg-[#0a0a0a] border border-white/5 hover:border-indigo-500/30 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/50 transition-colors">
                        <GraduationCap className="w-6 h-6 text-indigo-400 group-hover:text-indigo-300" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 leading-snug">{edu.degree}</h3>
                      <p className="text-indigo-400 font-medium mb-3">{edu.school}</p>
                      <p className="text-gray-500 text-sm">{edu.period}</p>
                    </motion.div>
                  ))}
                </div>
              </section>

              <footer id="contact" className="pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 scroll-mt-32">
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold text-white mb-2">Let's build something great.</h2>
                  <a href={`mailto:${PORTFOLIO_DATA.email}`} className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
                    {PORTFOLIO_DATA.email}
                  </a>
                </div>
                
                <div className="flex gap-4">
                  <a href={PORTFOLIO_DATA.links.behance} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-indigo-500 hover:border-indigo-500 transition-all">
                    <BehanceIcon className="w-5 h-5" />
                  </a>
                  <a href={PORTFOLIO_DATA.links.linkedin} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-indigo-500 hover:border-indigo-500 transition-all">
                    <LinkedInIcon className="w-5 h-5" />
                  </a>
                </div>
              </footer>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}