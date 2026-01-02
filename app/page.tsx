'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  Building2,
  FileText,
  Scale,
  MapPin,
  Phone,
  Mail,
  Menu,
  X,
  ShieldAlert,
  CheckCircle,
  BookOpen,
  Printer,
  ChevronRight,
  Gavel,
  ArrowRight,
  Copy,
  Clock,
  Calendar,
  ExternalLink,
  ChevronDown,
  MessageCircle
} from 'lucide-react';

/**
 * MODERN GOVT OFFICE PORTAL - BADURIA PS
 * Updated with user provided Logo.jpg in Top Navbar, Bottom Navbar, and Mobile Menu
 */

// --- Configuration & Data ---

const OFFICE_DETAILS = {
  nameEn: "Office of the Muhammadan Marriage & Divorce Registrar & Kazi",
  nameBn: "মুসলিম বিবাহ ও তালাক রেজিস্ট্রার এবং কাজী অফিস",
  shortName: "Govt. MMR Office, Baduria",
  jurisdiction: "Baduria Police Station Jurisdiction",
  district: "Baduria, North 24 Parganas, West Bengal",
  registrar: "Md Bajlur Rahaman",
  designation: "Govt. Appointed Marriage Registrar & Kazi",
  contact: "+91 9732040786",
  seccontact: "+91 9153640405",
  email: "support@mmrbaduria.in",
  pin: "743401",
  addressLine: "Vill.: Narayanpur, PO: Rudrapur, PS: Baduria, Dist: North 24 Parganas",
  areas: "Baduria, Narayanpur, Rudrapur & Surrounding Rural Areas",
  whatsapp: "https://wa.me/message/VQWDOKTFMXSSJ1"
};

const SERVICES = [
  {
    id: 'nikah',
    titleEn: "Nikah Registration",
    titleBn: "নিকাহ রেজিস্ট্রেশন",
    desc: "Solemnization and state-recognized registration of Muslim marriages. Essential for passports and legal rights.",
    icon: <BookOpen className="w-6 h-6 text-white" />,
    color: "bg-emerald-500"
  },
  {
    id: 'divorce',
    titleEn: "Divorce Registration",
    titleBn: "তালাক রেজিস্ট্রেশন",
    desc: "Legal documentation for Talaq, Khula, and Faskh. Official recording in Volume Registers.",
    icon: <Scale className="w-6 h-6 text-white" />,
    color: "bg-rose-500"
  },
  {
    id: 'cert',
    titleEn: "Certificate Issuance",
    titleBn: "সার্টিফিকেট প্রদান",
    desc: "Issuance of certified copies of Nikahnama and Divorce Certificates (English & Bengali).",
    icon: <FileText className="w-6 h-6 text-white" />,
    color: "bg-blue-500"
  },
  {
    id: 'verify',
    titleEn: "Verification",
    titleBn: "নথিপত্র যাচাইকরণ",
    desc: "Background verification of marriage records for foreign visas, passport authorities, and courts.",
    icon: <ShieldAlert className="w-6 h-6 text-white" />,
    color: "bg-amber-500"
  },
  {
    id: 'correction',
    titleEn: "Corrections",
    titleBn: "সংশোধন সেবা",
    desc: "Correction of clerical errors (names, dates) in the official register as per Govt rules.",
    icon: <Printer className="w-6 h-6 text-white" />,
    color: "bg-indigo-500"
  },
  {
    id: 'consult',
    titleEn: "Legal Consult",
    titleBn: "আইনি পরামর্শ",
    desc: "Expert guidance on Muslim Personal Law (Shariat) and Indian Registration acts.",
    icon: <Gavel className="w-6 h-6 text-white" />,
    color: "bg-slate-600"
  }
];

const DOCUMENTS = [
  {
    title: "Marriage (Nikah)",
    items: ["Aadhar Card (Bride & Groom)", "Age Proof (Birth Cert/PAN)", "4 Passport Photos Each", "2 Adult Witnesses (with ID)", "Guardian (Wali) Presence"]
  },
  {
    title: "Divorce (Talaq)",
    items: ["Original Nikahnama", "Aadhar Cards", "Divorce Application Form", "2 Witnesses (with ID)", "Affidavit (if required)"]
  }
];

const REGISTRAR_INFO = {
  name: OFFICE_DETAILS.registrar,
  title: OFFICE_DETAILS.designation,
  tenure: 'Serving Baduria since 2004',
  motto: 'Ensuring lawful, transparent, and community-first registration.',
  credentials: [
    'Government Appointed under the Bengal Muhammadan Marriage & Divorce Registration Act - 1876',
    'Certified to maintain Volume Registers A, B, C',
    'Authorized to issue Nikahnama and Divorce Certificates',
  ],
  phones: [OFFICE_DETAILS.contact, OFFICE_DETAILS.seccontact],
  email: OFFICE_DETAILS.email
};

// --- Animation Hook ---

const useOnScreen = (options: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect(); // Only animate once
      }
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.disconnect(); };
  }, [options]);

  return [ref, visible] as const;
};

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

const Reveal = ({ children, delay = 0, className = "" }: RevealProps) => {
  const [ref, visible] = useOnScreen({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Sub-Components ---

type CopyButtonProps = { text: string; label?: string };

const CopyButton = ({ text, label }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-md transition-colors"
    >
      {copied ? <CheckCircle size={14} className="text-green-600" /> : <Copy size={14} />}
      {copied ? 'Copied' : label || 'Copy'}
    </button>
  );
};

const Header = ({ setPage, activePage, mobileMenuOpen, setMobileMenuOpen }: { setPage: (page: string) => void; activePage: string; mobileMenuOpen: boolean; setMobileMenuOpen: (open: boolean) => void }) => (
  <>
    {/* Top Utility Bar */}
    <div className="bg-slate-900 text-slate-300 text-xs py-2 hidden md:block">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <span className="flex items-center gap-2"><Building2 size={12} /> Govt. Registered Office: {OFFICE_DETAILS.district}</span>
        <span className="flex items-center gap-4">
          <span className="flex items-center gap-1"><Clock size={12} /> Mon-Sat: 10AM - 5PM</span>
          <a href={`tel:${OFFICE_DETAILS.contact}`} className="hover:text-white transition-colors flex items-center gap-1"><Phone size={12} /> Call Us</a>
        </span>
      </div>
    </div>

    {/* Main Header (Top Navbar) */}
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setPage('home')}
        >
          {/* Logo in Top Header */}
          <div className="relative w-12 h-12 bg-white rounded-lg flex items-center justify-center text-white shadow-lg overflow-hidden group-hover:scale-105 transition-transform border border-emerald-100">
            <img
              src="./images/logo.png"
              alt="Official Logo"
              className="w-full h-full object-cover"
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                const img = e.currentTarget;
                const parent = img.parentElement;
                img.style.display = 'none';
                if (parent) {
                  parent.classList.add('bg-emerald-700');
                  parent.innerHTML = '<span class="text-white font-bold">MMR</span>';
                }
              }}
            />
          </div>
          <div className="leading-tight">
            <h1 className="text-lg md:text-xl font-extrabold text-slate-800 tracking-tight group-hover:text-emerald-800 transition-colors">
              MMR & KAZI OFFICE
            </h1>
            <p className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-widest">Baduria Jurisdiction</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center bg-slate-100/50 p-1 rounded-full border border-slate-200">
          {['home', 'services', 'documents', 'about', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => setPage(item)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activePage === item
                  ? 'bg-white text-emerald-700 shadow-md transform scale-105'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
                }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={28} strokeWidth={1.5} />
        </button>
      </div>
    </header>

    {/* Mobile Drawer */}
    <div className={`fixed inset-0 z-[60] transform transition-transform duration-300 ease-in-out lg:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
      <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-white shadow-2xl flex flex-col">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="flex items-center gap-3">
            {/* Logo in Mobile Menu Drawer */}
            <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
              <img src="./images/logo.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-slate-800">Menu</h2>
              <p className="text-xs text-slate-500">MMR Office Baduria</p>
            </div>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-white rounded-full shadow-sm text-slate-500 hover:text-red-500">
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {['home', 'services', 'documents', 'about', 'contact'].map((item, idx) => (
            <button
              key={item}
              onClick={() => { setPage(item); setMobileMenuOpen(false); }}
              className="w-full text-left px-6 py-4 rounded-xl text-lg font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all flex items-center justify-between group"
              style={{ animation: `slideIn 0.3s ease-out forwards ${idx * 0.05}s`, opacity: 0 }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
              <ChevronRight size={18} className="text-slate-300 group-hover:text-emerald-500" />
            </button>
          ))}
        </div>
        <div className="p-6 bg-slate-50 border-t border-slate-100">
          <a href={OFFICE_DETAILS.whatsapp} target="_blank" rel="noreferrer" className="flex items-center justify-center w-full py-3 bg-[#25D366] text-white rounded-lg font-bold shadow-lg hover:bg-[#128C7E] transition-colors">
            <MessageCircle size={18} className="mr-2" /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  </>
);

const Footer = ({ setPage }: { setPage: (page: string) => void }) => (
  <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
    <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-3 mb-6 text-white">
          {/* Logo in Footer */}
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center overflow-hidden p-1">
            <img src="./images/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h3 className="font-bold leading-none">Office of The Muhammadan Registrar and Kazi</h3>
            <p className="text-xs font-normal text-emerald-400 uppercase tracking-widest mt-1">Baduria Office</p>
          </div>
        </div>
        <p className="mb-6 leading-relaxed max-w-md">
          The official office for Muhammadan Marriage & Divorce Registration in Baduria PS.
          Operating under the West Bengal Government Act to ensure legal protection and documentation for the community.
        </p>
      </div>

      <div>
        <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
        <ul className="space-y-3">
          {['home', 'about', 'services', 'documents'].map(item => (
            <li key={item}>
              <button onClick={() => setPage(item)} className="hover:text-emerald-400 transition-colors capitalize flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> {item}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-white font-bold mb-6 text-lg">Contact</h4>
        <div className="space-y-4 text-sm">
          <p className="flex items-start gap-3">
            <MapPin className="mt-1 text-emerald-500 shrink-0" size={16} />
            {OFFICE_DETAILS.addressLine}, {OFFICE_DETAILS.pin}
          </p>
          <p className="flex items-center gap-3">
            <Phone className="text-emerald-500 shrink-0" size={16} />
            {OFFICE_DETAILS.contact}<br />{OFFICE_DETAILS.seccontact}
          </p>
          <p className="flex items-center gap-3">
            <Mail className="text-emerald-500 shrink-0" size={16} />
            {OFFICE_DETAILS.email}
          </p>
        </div>
      </div>
    </div>
    <div className="container mx-auto px-6 mt-16 pt-8 border-t border-slate-800 text-center text-xs">
      <p>&copy; {new Date().getFullYear()} {OFFICE_DETAILS.shortName}. All Rights Reserved.</p>
      <p className="mt-2 text-slate-600">This is an informational website for a Govt. Appointed Official.</p>
    </div>
  </footer>
);

// --- Page Components ---

const Home = ({ setPage }: { setPage: (page: string) => void }) => (
  <>
    {/* Hero Section */}
    <div className="relative bg-slate-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
      </div>

      <div className="container mx-auto px-4 pt-20 pb-32 relative z-10 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Govt. of West Bengal Authorized
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
            Office of the <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">Muhammadan Marriage and Divorce </span>
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">Registrar & Kazi</span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Serving the Baduria Police Station Jurisdiction with integrity, legal compliance, and digitization of Muslim marriage records.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => setPage('contact')}
              className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Book Appointment <ArrowRight size={18} />
            </button>
            <button
              onClick={() => setPage('services')}
              className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              View Services <ChevronDown size={18} />
            </button>
          </div>
        </Reveal>
      </div>

      {/* Stats/Ticker */}
      <div className="absolute bottom-0 w-full bg-white/50 backdrop-blur-md border-t border-slate-200 py-4 hidden md:block">
        <div className="container mx-auto px-4 flex justify-center gap-12 text-sm font-medium text-slate-500">
          <span className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-500" /> Verified Registrar</span>
          <span className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-500" /> Govt. Rates Apply</span>
          <span className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-500" /> Digital Records</span>
        </div>
      </div>
    </div>

    {/* Verification Notice
    <div className="container mx-auto px-4 -mt-16 relative z-20">
      <Reveal delay={400}>
        <div className="bg-amber-50 rounded-2xl p-6 md:p-8 border border-amber-100 shadow-xl flex flex-col md:flex-row gap-6 items-start">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-full shrink-0">
            <ShieldAlert size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-amber-900 mb-2">Public Verification Notice</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Before any registration, please verify the Kazi's credentials. Always check the 
              <strong> Government Appointment Letter</strong> and the <strong>Official Seal</strong>. 
              Unauthorized agents may mislead you. Our office is the only authorized entity for Baduria PS.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-bold px-3 py-1 bg-amber-100 text-amber-800 rounded-full">Check Sanad / License</span>
              <span className="text-xs font-bold px-3 py-1 bg-amber-100 text-amber-800 rounded-full">Verify Jurisdiction</span>
            </div>
          </div>
        </div>
      </Reveal>
    </div> */}

    {/* Intro Grid */}
    <div className="container mx-auto px-4 py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-100 to-transparent rounded-full opacity-50 blur-2xl"></div>
            <img
              src="./images/office-image.jpg"
              alt="Legal Documents"
              className="relative rounded-2xl shadow-2xl border-4 border-white transform hover:scale-[1.02] transition-transform duration-500"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border border-slate-100 max-w-xs hidden md:block">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">BR</div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">Md Bajlur Rahaman</p>
                  <p className="text-xs text-slate-500">Official Registrar</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 italic">"Ensuring every marriage is legally secured for the future."</p>
            </div>
          </div>
        </Reveal>

        <div className="space-y-8">
          <Reveal delay={200}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Why Official Registration Matters?</h2>
            <p className="text-slate-600 text-lg leading-relaxed mt-4">
              A Nikah without government registration may lead to legal complications in the future.
              Registration secures the rights of both parties regarding inheritance, visa applications,
              and marital disputes.
            </p>

            <div className="grid grid-cols-1 gap-4 mt-8">
              {[
                "Valid Proof for Passport & Visa",
                "Essential for Banking & Claims",
                "Legal Safety for Women's Rights",
                "Avoidance of Fraudulent Marriages"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-lg shadow-sm">
                  <CheckCircle className="text-emerald-500 shrink-0" size={20} />
                  <span className="font-medium text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </>
);

const Services = () => (
  <div className="container mx-auto px-4 py-20">
    <div className="text-center max-w-3xl mx-auto mb-16">
      <Reveal>
        <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-2">Our Responsibilities</h2>
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Public Services</h1>
        <p className="text-slate-600 text-lg">
          We provide a full range of documentation services compliant with both the West Bengal Govt. Act and Muslim Personal Law.
        </p>
      </Reveal>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {SERVICES.map((service, idx) => (
        <Reveal key={service.id} delay={idx * 100}>
          <div className="group bg-white p-8 rounded-2xl border border-slate-100 shadow-lg hover:shadow-2xl hover:border-emerald-100 transition-all duration-300 h-full flex flex-col relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color.replace('bg-', 'from-')}/10 to-transparent rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700`}></div>

            <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
              {service.icon}
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2 relative z-10">{service.titleEn}</h3>
            <h4 className="text-emerald-700 font-medium font-bengali mb-4 relative z-10">{service.titleBn}</h4>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow relative z-10">
              {service.desc}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  </div>
);

const Documents = () => (
  <div className="container mx-auto px-4 py-20 max-w-5xl">
    <Reveal>
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Required Documents</h1>
        <p className="text-slate-600">Please prepare these documents (Original + Photocopy) before visiting.</p>
      </div>
    </Reveal>

    <div className="grid md:grid-cols-2 gap-8">
      {DOCUMENTS.map((doc, idx) => (
        <Reveal key={idx} delay={idx * 200}>
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="bg-slate-900 p-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">{doc.title}</h3>
              <div className="p-2 bg-white/10 rounded-lg text-white">
                {idx === 0 ? <BookOpen size={20} /> : <FileText size={20} />}
              </div>
            </div>
            <div className="p-8">
              <ul className="space-y-4">
                {doc.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-500 text-center">
                * All photocopies must be self-attested.
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  </div>
);

const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    // Simulate network request
    setTimeout(() => {
      setStatus('success');
      formRef.current?.reset();
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">

        {/* Contact Info */}
        <div className="space-y-8">
          <Reveal>
            <h1 className="text-4xl font-bold text-slate-900 mb-6">Get in Touch</h1>
            <p className="text-slate-600 text-lg mb-8">
              Visit our office for registration or consultations. Appointments are recommended for Nikah ceremonies.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl"><MapPin size={24} /></div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Office Location</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-3">
                    {OFFICE_DETAILS.addressLine} WB - {OFFICE_DETAILS.pin}
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(OFFICE_DETAILS.nameEn + " " + OFFICE_DETAILS.district)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-600 text-sm font-bold flex items-center gap-1 hover:underline"
                  >
                    Open in Maps <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t border-slate-100 pt-6">
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl"><Phone size={24} /></div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 mb-1">Phone Number</h3>
                  <p className="text-slate-600 text-sm mb-2">{OFFICE_DETAILS.contact}</p>
                  <CopyButton text={OFFICE_DETAILS.contact} />
                </div>
              </div>

              <div className="flex items-start gap-4 border-t border-slate-100 pt-6">
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl"><Mail size={24} /></div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 mb-1">Email Address</h3>
                  <p className="text-slate-600 text-sm mb-2">{OFFICE_DETAILS.email}</p>
                  <CopyButton text={OFFICE_DETAILS.email} />
                </div>
              </div>

              {/* Added WhatsApp Button to Contact Card */}
              <div className="flex items-start gap-4 border-t border-slate-100 pt-6">
                <div className="p-3 bg-[#25D366]/10 text-[#25D366] rounded-xl"><MessageCircle size={24} /></div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 mb-1">WhatsApp Support</h3>
                  <p className="text-slate-600 text-sm mb-3">Chat directly with the office for quick queries.</p>
                  <a
                    href={OFFICE_DETAILS.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg text-sm font-bold hover:bg-[#128C7E] transition-colors shadow-sm"
                  >
                    Start Chat <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Contact Form */}
        <Reveal delay={200}>
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-inner">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Send Enquiry</h2>

            {status === 'success' ? (
              <div className="bg-emerald-100 border border-emerald-200 text-emerald-800 p-8 rounded-xl text-center animate-pulse-once">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 shadow-sm">
                  <CheckCircle size={32} />
                </div>
                <h3 className="font-bold text-xl mb-2">Message Sent!</h3>
                <p className="text-sm">We will get back to you within 24 hours.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-sm font-bold underline hover:text-emerald-600"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Name</label>
                    <input required type="text" className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all shadow-sm" placeholder="Your Name" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Phone</label>
                    <input required type="tel" className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all shadow-sm" placeholder="Mobile Number" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Service Type</label>
                  <select className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all shadow-sm cursor-pointer">
                    <option>Nikah Registration (New)</option>
                    <option>Divorce / Khula Registration</option>
                    <option>Duplicate Certificate Request</option>
                    <option>Document Verification</option>
                    <option>Other Enquiry</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Message</label>
                  <textarea required rows={4} className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all shadow-sm resize-none" placeholder="How can we help you?"></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold shadow-xl hover:bg-emerald-600 hover:shadow-2xl transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                >
                  {status === 'loading' ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>

      {/* Map Embed (Simulated) */}
      <Reveal delay={300}>
        <div className="mt-16 bg-slate-200 rounded-2xl h-80 w-full overflow-hidden relative shadow-inner">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14717.207434720972!2d88.7844!3d22.7441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f8a8c43916298d%3A0xe534607185360980!2sBaduria%2C%20West%20Bengal%20743401!5e0!3m2!1sen!2sin!4v1708453483259!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Office Map"
            className="grayscale hover:grayscale-0 transition-all duration-700"
          ></iframe>
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg text-xs font-bold shadow-md">
            Govt MMR Office, Baduria
          </div>
        </div>
      </Reveal>
    </div>
  );
};

const About = () => (
  <div className="container mx-auto px-4 py-20 max-w-4xl">
    <Reveal>
      <h1 className="text-4xl font-bold text-slate-900 mb-8 border-l-8 border-emerald-500 pl-6">About the Office</h1>
    </Reveal>

    <Reveal delay={100}>
      <div className="prose prose-lg prose-slate text-slate-600 leading-relaxed">
        <p className="mb-6">
          The <strong>Office of the Muhammadan Marriage & Divorce Registrar</strong> at Baduria PS is a statutory body empowered by the
          Government of West Bengal. Our primary mandate is to register Muslim marriages and divorces under the
          <em> Bengal Muhammadan Marriage and Divorce Registration Act</em>, ensuring that every social contract
          within the community has legal backing.
        </p>
      </div>
    </Reveal>

    <Reveal delay={150}>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-8 mb-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-400 text-white flex items-center justify-center text-2xl font-extrabold shadow-lg">
              {REGISTRAR_INFO.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-600">Registrar & Kazi</p>
              <h2 className="text-2xl font-bold text-slate-900 leading-tight">{REGISTRAR_INFO.name}</h2>
              <p className="text-sm text-slate-500">{REGISTRAR_INFO.title}</p>
            </div>
          </div>
          <div className="text-sm text-slate-600 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 font-semibold">
            {REGISTRAR_INFO.tenure}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="space-y-3">
            <p className="text-slate-700 leading-relaxed">{REGISTRAR_INFO.motto}</p>
            <ul className="space-y-2">
              {REGISTRAR_INFO.credentials.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle size={16} className="text-emerald-500 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-900 text-slate-100 rounded-xl p-6 flex flex-col gap-3 shadow-lg">
            <div className="flex items-center gap-2 text-sm">
              <Phone size={16} className="text-emerald-300" />
              <div className="flex flex-col">
                {REGISTRAR_INFO.phones.map((phone) => (
                  <span key={phone}>{phone}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail size={16} className="text-emerald-300" />
              <span>{REGISTRAR_INFO.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ShieldAlert size={16} className="text-amber-300" />
              <span>Serves only within Baduria Police Station jurisdiction.</span>
            </div>
          </div>
        </div>
      </div>
    </Reveal>

    <Reveal delay={200}>
      <div className="grid md:grid-cols-2 gap-6 my-10">
        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
          <h3 className="font-bold text-emerald-800 mb-2 flex items-center gap-2"><Gavel size={20} /> Legal Validity</h3>
          <p className="text-sm text-emerald-900/70">Our certificates are recognized by all Courts of Law, Passport Seva Kendras, and Foreign Embassies.</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
          <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2"><Calendar size={20} /> Record Keeping</h3>
          <p className="text-sm text-blue-900/70">We maintain permanent Volume Registers (A, B, C) dating back decades for lineage and legal verification.</p>
        </div>
      </div>
    </Reveal>

    <Reveal delay={300}>
      <div className="bg-slate-900 text-slate-300 p-8 rounded-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-white font-bold text-xl mb-4">Jurisdiction Warning</h3>
          <p className="mb-4">
            Under the Act, a Marriage Registrar is authorized to register events <strong>ONLY</strong> within their designated area.
            Our jurisdiction is strictly limited to <strong>Baduria Police Station</strong> areas.
          </p>
          <p className="text-sm italic opacity-70">
            * Attempting to register a marriage outside of the jurisdiction where it occurred or where the parties reside is a violation of the Act.
          </p>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <MapPin size={120} />
        </div>
      </div>
    </Reveal>
  </div>
);

// --- Main App Shell ---

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  }, [currentPage]);

  // CSS for slide-in animations
  const styles = `
    @keyframes slideIn {
      from { transform: translateX(20px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    .animate-pulse-once {
      animation: pulse 0.5s ease-in-out;
    }
  `;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-200 selection:text-emerald-900">
      <style>{styles}</style>
      <Header
        setPage={setCurrentPage}
        activePage={currentPage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="min-h-[80vh]">
        {currentPage === 'home' && <Home setPage={setCurrentPage} />}
        {currentPage === 'services' && <Services />}
        {currentPage === 'documents' && <Documents />}
        {currentPage === 'about' && <About />}
        {currentPage === 'contact' && <Contact />}
      </main>

      <Footer setPage={setCurrentPage} />

      {/* Mobile Bottom Quick Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-2 flex lg:hidden z-40 pb-safe shadow-[0_-5px_20px_rgba(0,0,0,0.1)]">
        <a href={`tel:${OFFICE_DETAILS.contact}`} className="flex-1 flex flex-col items-center justify-center p-2 text-slate-600 hover:text-emerald-600">
          <Phone size={20} />
          <span className="text-[10px] font-bold mt-1">Call</span>
        </a>
        <button onClick={() => setCurrentPage('contact')} className="flex-1 flex flex-col items-center justify-center p-2 text-slate-600 hover:text-emerald-600">
          <Calendar size={20} />
          <span className="text-[10px] font-bold mt-1">Book</span>
        </button>
        {/* Logo in Bottom Mobile Navbar */}
        <button onClick={() => setCurrentPage('about')} className="flex-1 -mt-8">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-slate-50 overflow-hidden">
            <img src="./images/logo.png" alt="About" className="w-full h-full object-cover" />
          </div>
        </button>
        <a href={OFFICE_DETAILS.whatsapp} target="_blank" rel="noreferrer" className="flex-1 flex flex-col items-center justify-center p-2 text-slate-600 hover:text-emerald-600">
          <div className="relative">
            <div className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center text-[10px] font-bold">WA</div>
          </div>
          <span className="text-[10px] font-bold mt-1">Chat</span>
        </a>
        <button onClick={() => setMobileMenuOpen(true)} className="flex-1 flex flex-col items-center justify-center p-2 text-slate-600 hover:text-emerald-600">
          <Menu size={20} />
          <span className="text-[10px] font-bold mt-1">Menu</span>
        </button>
      </div>
    </div>
  );
};

export default App;