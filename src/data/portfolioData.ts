import { Project, SkillCategory, ExperienceItem, ServiceItem, TestimonialItem, GalleryItem, CertificateItem } from '../types';
import julesPortrait from '../assets/images/jules_standing_portrait_1787308415487.jpg';
import julesAvatar from '../assets/images/jules_standing_avatar_1787308431629.jpg';

export const PERSONAL_INFO = {
  name: "MUHIRE JULES",
  shortName: "Jules",
  title: "Computer System Learner",
  tagline: "Dedicated Computer System learner developing practical hands-on skills in computer hardware, operating systems, networking, IT troubleshooting, and web fundamentals.",
  location: "Rusizi, Rwanda",
  country: "Rwanda",
  avatarUrl: julesAvatar,
  portraitUrl: julesPortrait,
  
  // Logo & Branding Settings
  logoUrl: "",
  customLogoUrl: "",
  logoType: "both" as const, // 'text' | 'image' | 'both'
  logoText: "MUHIRE",
  logoTextHighlight: ".",
  useImageLogo: false,

  // Home / Hero Customization
  heroGreeting: "Hello, It's Me",
  heroTypingPrefix: "And I'm a",
  heroRoles: [
    "Computer System Learner",
    "Hardware & IT Enthusiast",
    "Networking Learner",
    "Web Development Learner",
    "Operating Systems Student"
  ],
  heroIntro: "I am a serious, motivated learner passionate about computer systems, hardware assembly, operating systems, network troubleshooting, and developing practical technology skills.",
  heroCtaText: "Explore My Journey",
  heroCtaLink: "#about",

  // About Customization
  aboutHeading: "About Me",
  aboutSubheading: "Computer System Learner based in Rusizi, Rwanda.",
  aboutChecklist: [
    "Computer Hardware Assembly & Component Testing",
    "Operating Systems Setup (Linux & Windows)",
    "Local Network Configuration & Troubleshooting",
    "Computer Maintenance & Diagnostics",
    "Web Development Fundamentals (HTML, CSS, JS, React)",
    "System Administration & CLI Scripting Basics"
  ],
  learningGoals: [
    "Mastering deep operating system internals and Linux server administration",
    "Gaining hands-on expertise in network topology design and subnetting",
    "Refining practical PC hardware troubleshooting and component repair",
    "Building full-stack web applications and interactive system tools"
  ],
  aboutImageUrl: julesPortrait,

  // Resume / CV
  resumeUrl: "",
  cvUploaded: false,

  whatsappNumber: "+250794410997",
  whatsappDisplay: "0794410997",
  email: "mauricemjules@gmail.com",
  fieldOfStudy: "Computer Systems",
  status: "Actively Learning & Open for Practical Opportunities",
  bio: "I am MUHIRE JULES, a dedicated Computer System learner based in Rusizi, Rwanda. I am passionate about understanding how computers work from the inside out — spanning physical hardware assembly, BIOS/UEFI setup, operating systems management (Linux and Windows), network connectivity, computer maintenance, and web development fundamentals. I take a disciplined, hands-on approach to building practical technology skills and solving real-world IT problems.",
  stats: [
    { label: "Practical Projects", value: "6+", icon: "FolderCheck" },
    { label: "Lab & Study Hours", value: "600+", icon: "Cpu" },
    { label: "Core Skills Practiced", value: "15+", icon: "Layers" },
    { label: "Dedication & Focus", value: "100%", icon: "Star" }
  ],
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    whatsapp: "https://wa.me/250794410997",
    email: "mailto:mauricemjules@gmail.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    whatsappName: "+250 794 410 997",
    instagramName: "MUHIRE JULES",
    facebookName: "MUHIRE JULES",
    githubName: "Muhire Jules",
    linkedinName: "MUHIRE JULES"
  },
  technicalSkills: [
    { id: "tech-1", name: "Computer Hardware & Assembly", level: 88, iconColor: "text-emerald-400", iconText: "HW" },
    { id: "tech-2", name: "Operating Systems (Linux/Win)", level: 84, iconColor: "text-sky-400", iconText: "OS" },
    { id: "tech-3", name: "Computer Maintenance & Diagnostics", level: 86, iconColor: "text-cyan-400", iconText: "IT" },
    { id: "tech-4", name: "Networking & IP Configuration", level: 80, iconColor: "text-indigo-400", iconText: "NET" },
    { id: "tech-5", name: "Web Development (HTML, CSS, JS)", level: 82, iconColor: "text-yellow-400", iconText: "WEB" },
    { id: "tech-6", name: "Programming Basics (Python & C)", level: 78, iconColor: "text-orange-400", iconText: "CODE" },
    { id: "tech-7", name: "Database Fundamentals (SQL)", level: 75, iconColor: "text-purple-400", iconText: "DB" }
  ],
  professionalSkills: [
    { id: "prof-1", name: "Problem Solving & Troubleshooting", percentage: 88 },
    { id: "prof-2", name: "Fast Learner & Self-Motivated", percentage: 92 },
    { id: "prof-3", name: "Attention to Detail", percentage: 85 },
    { id: "prof-4", name: "Teamwork & Communication", percentage: 82 }
  ]
};

export const CERTIFICATES: CertificateItem[] = [
  {
    id: "cert-1",
    title: "Computer Hardware & IT Support Fundamentals",
    issuer: "Practical IT Systems Lab",
    date: "2024",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80",
    description: "Hands-on verification covering PC assembly, component diagnostics, motherboard connections, and thermal maintenance."
  },
  {
    id: "cert-2",
    title: "Linux Operating System & CLI Essentials",
    issuer: "Open Source Foundations",
    date: "2024",
    imageUrl: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=900&q=80",
    description: "Proficiency in Linux terminal commands, bash scripting fundamentals, file permissions, and process management."
  },
  {
    id: "cert-3",
    title: "Networking Principles & Connectivity Basics",
    issuer: "Digital Technology Academy",
    date: "2024",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=900&q=80",
    description: "Core networking concepts: TCP/IP stack, IP address subnetting, router setup, DNS/DHCP, and ping/traceroute diagnostics."
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "computer-systems",
    name: "Computer Systems",
    iconName: "Cpu",
    description: "Physical hardware components, motherboard architecture, BIOS/UEFI setup, and system diagnostics.",
    skills: [
      { name: "Computer Hardware & Assembly", level: 90, experienceYears: "Learner", tag: "Hardware", description: "Motherboard, CPU socketing, RAM installation, power supply wiring, and desktop building." },
      { name: "Operating Systems (Linux & Windows)", level: 86, experienceYears: "Learner", tag: "OS", description: "Installation, disk partitioning, dual-boot setups, user permissions, and registry/systemd configuration." },
      { name: "Computer Maintenance & Servicing", level: 88, experienceYears: "Learner", tag: "Maintenance", description: "Dust cleaning, thermal paste replacement, fan airflow optimization, and preventive maintenance." },
      { name: "Hardware Troubleshooting & Diagnostics", level: 85, experienceYears: "Learner", tag: "Diagnostics", description: "POST error beep codes, RAM testing (MemTest86), power rail testing, and drive health checks." },
      { name: "BIOS / UEFI Configuration", level: 84, experienceYears: "Learner", tag: "Firmware", description: "Boot order selection, Secure Boot settings, XMP memory profiles, and firmware updating." }
    ]
  },
  {
    id: "networking",
    name: "Networking",
    iconName: "Network",
    description: "Fundamental networking concepts, local area network setups, router configurations, and connectivity troubleshooting.",
    skills: [
      { name: "Basic Networking & TCP/IP", level: 82, experienceYears: "Learner", tag: "Protocols", description: "Understanding the 7-layer OSI model, TCP/UDP protocols, and packet transmission basics." },
      { name: "Network Configuration & IP Addressing", level: 84, experienceYears: "Learner", tag: "IP/Subnet", description: "IPv4 addressing, subnet masking, default gateways, and static vs dynamic IP assignment." },
      { name: "Router & Switch Configuration", level: 80, experienceYears: "Learner", tag: "Devices", description: "Home/office router setup, SSID configuration, DHCP server settings, and port forwarding." },
      { name: "Connectivity Troubleshooting", level: 85, experienceYears: "Learner", tag: "Troubleshooting", description: "Using ping, traceroute, ipconfig/ifconfig, nslookup, and cable testing tools to isolate outages." }
    ]
  },
  {
    id: "development",
    name: "Development",
    iconName: "Code2",
    description: "Core programming languages, responsive web development, and foundational database management.",
    skills: [
      { name: "Web Development (HTML5 & CSS3)", level: 88, experienceYears: "Learner", tag: "Frontend", description: "Semantic markup, responsive layouts, modern Flexbox/Grid, and clean styling." },
      { name: "JavaScript & TypeScript Basics", level: 82, experienceYears: "Learner", tag: "JS/TS", description: "DOM manipulation, ES6 syntax, asynchronous fetch, and typed logic structures." },
      { name: "React Fundamentals", level: 80, experienceYears: "Learner", tag: "React", description: "Component state, props, hooks (useState, useEffect), and modular UI architecture." },
      { name: "Programming Basics (Python & C)", level: 78, experienceYears: "Learner", tag: "Code", description: "Variables, control loops, functions, basic data structures, and algorithmic logic." },
      { name: "Database Fundamentals (SQL)", level: 75, experienceYears: "Learner", tag: "Database", description: "Relational database concepts, table design, SELECT queries, INSERT, UPDATE, and JOINs." }
    ]
  },
  {
    id: "tools-technology",
    name: "Tools & Technology",
    iconName: "Wrench",
    description: "Practical software tools, command-line utilities, diagnostic applications, and developer workflows.",
    skills: [
      { name: "Linux Command Line / CLI", level: 85, experienceYears: "Learner", tag: "CLI", description: "Bash navigation, file permissions (chmod/chown), pipe filtering (grep, awk), and shell scripts." },
      { name: "Git & GitHub Version Control", level: 84, experienceYears: "Learner", tag: "Git", description: "Repositories, committing, branching, pushing/pulling, and collaborating on code." },
      { name: "VS Code & Development Environments", level: 88, experienceYears: "Learner", tag: "IDE", description: "Extensions, integrated terminal, debugging workflows, and linting configurations." },
      { name: "System Diagnostic & Recovery Tools", level: 85, experienceYears: "Learner", tag: "Utilities", description: "Ventoy multi-boot USBs, Rufus, HWMonitor, CrystalDiskInfo, and Wireshark basics." }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "pc-assembly-diag-lab",
    title: "PC Assembly & Hardware Diagnostics Lab",
    subtitle: "Complete Custom Desktop Build, Component Verification & Thermal Tuning",
    category: "hardware",
    imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=900&q=80",
    featured: true,
    description: "A hands-on practical project assembling a desktop computer from scratch: motherboard seating, CPU thermal application, cable management, BIOS setup, and stress-testing diagnostics.",
    longDescription: "Executed as a core computer systems practical learning project. Spanned evaluating component compatibility (CPU socket, RAM DDR speeds, PSU wattage), precision hardware mounting, front-panel header wiring, BIOS/UEFI updating, and conducting 24-hour hardware stability and temperature stress tests.",
    problemStatement: "Understanding physical computer architecture requires assembling real hardware, configuring firmware parameters, and diagnosing POST failures.",
    solutionArchitecture: "Physical PC Build + BIOS/UEFI Tweaking + MemTest86 RAM Diagnostics + OS Clean Partitioning + HWMonitor Thermal Profiling.",
    keyFeatures: [
      "Step-by-step modular hardware assembly with ESD safety protocols",
      "Thermal paste application and multi-fan positive air pressure cooling setup",
      "BIOS/UEFI firmware configuration (boot device priority, memory XMP, fan curves)",
      "Hardware diagnostic benchmark: CPU temperature kept under 65°C under load",
      "Storage partitioning with high-speed NVMe primary and SATA backup drives"
    ],
    technologies: ["Computer Hardware", "BIOS/UEFI", "Thermal Profiling", "Diagnostics", "Windows 11", "Ubuntu Linux"],
    metrics: [
      { label: "Assembly Success", value: "100% POST" },
      { label: "Peak Temp Load", value: "< 65°C" },
      { label: "Memory Stability", value: "0 Errors" }
    ],
    githubUrl: "https://github.com",
    liveUrl: "https://wa.me/250794410997?text=Hello%20Jules,%20tell%20me%20about%20your%20PC%20Assembly%20Lab",
    date: "2024"
  },
  {
    id: "local-network-lab",
    title: "Local Area Network (LAN) & Router Configuration Lab",
    subtitle: "Small Office / Home Network Setup, Subnetting & Connectivity Troubleshooting",
    category: "networking",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=900&q=80",
    featured: true,
    description: "A practical networking lab designing, cabling, and configuring a reliable local network with dedicated IP subnets, DHCP server pools, DNS routing, and firewall rules.",
    longDescription: "Set up a test multi-device local network environment. Configured router DHCP ranges, static IP assignments for shared resources (printers and storage), isolated guest wireless networks with WPA3 encryption, and resolved connectivity issues using ping, traceroute, and packet capture tools.",
    problemStatement: "Learning networking principles requires real-world experience configuring router hardware, resolving IP address conflicts, and diagnosing packet dropouts.",
    solutionArchitecture: "Router & Switch Configuration + Static/Dynamic DHCP + Subnetting + CLI Network Diagnostic Scripts.",
    keyFeatures: [
      "Class C Subnet calculation and IP address allocation scheme",
      "DHCP pool configuration with reserved static IP leases",
      "Wi-Fi security hardening (WPA2/WPA3, SSID isolation, strong access controls)",
      "Command-line connectivity troubleshooting scripts (ping, traceroute, netstat)",
      "Network performance testing: verified 0% packet loss across the LAN"
    ],
    technologies: ["Networking", "TCP/IP", "DHCP/DNS", "Router Config", "CLI Diagnostics", "Wireshark"],
    metrics: [
      { label: "Packet Loss", value: "0.00%" },
      { label: "Network Uptime", value: "99.9%" },
      { label: "IP Allocation", value: "Zero Conflicts" }
    ],
    githubUrl: "https://github.com",
    liveUrl: "https://wa.me/250794410997?text=Hello%20Jules,%20tell%20me%20about%20your%20Network%20Lab",
    date: "2024"
  },
  {
    id: "interactive-systems-lab",
    title: "Interactive Computer Systems & Architecture Playground",
    subtitle: "Web-Based Educational Simulator for Logic Gates, Binary & Memory Addressing",
    category: "web",
    imageUrl: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=900&q=80",
    featured: true,
    description: "An educational interactive web application built with React and TypeScript to help students understand Boolean logic gates, binary-to-hexadecimal conversions, and CPU memory addressing.",
    longDescription: "Developed as a learning tool to reinforce computer systems theory. Features real-time logic gate truth tables (AND, OR, NOT, XOR, NAND), an interactive memory address splitter (Tag, Set Index, Offset), and a clock cycle visualizer.",
    problemStatement: "Theoretical computer systems concepts can be difficult to visualize without tactile, interactive educational tools.",
    solutionArchitecture: "React 18 + TypeScript + Tailwind CSS interactive state machine with instant responsive UI feedback.",
    keyFeatures: [
      "Interactive Boolean logic gate simulator with live signal toggles",
      "Binary, Decimal, and Hexadecimal instant converter with bit-level representation",
      "CPU memory address index calculator for direct-mapped and associative cache",
      "Responsive, touch-friendly interface designed for mobile and desktop screens"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Computer Systems", "Vite"],
    metrics: [
      { label: "Interactive Tools", value: "4 Modules" },
      { label: "Performance Score", value: "98/100" },
      { label: "Load Time", value: "< 0.8s" }
    ],
    githubUrl: "https://github.com",
    liveUrl: "#about",
    date: "2024 - 2025"
  },
  {
    id: "it-maintenance-toolkit",
    title: "IT Maintenance & OS Troubleshooting Toolkit",
    subtitle: "Automated Maintenance Scripts, Disk Partitioning & System Recovery Workflow",
    category: "maintenance",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
    featured: true,
    description: "A curated system recovery and maintenance workflow featuring multi-boot recovery flash drives, automated disk cleanup scripts, driver backup utilities, and OS re-installation guides.",
    longDescription: "Created to streamline regular computer maintenance tasks. Includes custom batch/bash scripts for clearing temp files, checking SMART hard drive status, repairing corrupted Windows system files (SFC / DISM), and recovering unbootable Linux systems via chroot.",
    problemStatement: "Common computer slowdowns and software crashes can be quickly remediated through organized diagnostic checklists and automation scripts.",
    solutionArchitecture: "Multi-boot USB (Ventoy) + Custom Bash/Batch Scripts + Disk Management + System Image Backups.",
    keyFeatures: [
      "Ventoy multi-boot drive loaded with Windows, Ubuntu, and diagnostic ISOs",
      "One-click batch script for cache cleaning, DNS flush, and temp file removal",
      "Storage health check procedure using SMART attributes and bad sector scans",
      "Standard operating procedure for fast, clean OS installation and driver setup"
    ],
    technologies: ["Linux Bash", "Windows Batch", "Disk Partitioning", "Ventoy", "IT Maintenance"],
    metrics: [
      { label: "Cleanup Speedup", value: "3x Faster" },
      { label: "Recovery Success", value: "100%" },
      { label: "Tool Utility", value: "Daily Use" }
    ],
    githubUrl: "https://github.com",
    liveUrl: "https://wa.me/250794410997?text=Hello%20Jules,%20tell%20me%20about%20your%20IT%20Toolkit",
    date: "2024"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "PC Hardware Assembly & Diagnostics",
    category: "Computer Systems",
    imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=900&q=80",
    caption: "Motherboard seating, CPU thermal paste application, and cable routing during custom PC build.",
    tags: ["Hardware", "Assembly", "CPU", "Motherboard"]
  },
  {
    id: "gal-2",
    title: "Network Router & Switch Setup",
    category: "Networking",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=900&q=80",
    caption: "Local area network configuration, subnetting, and connectivity testing.",
    tags: ["Networking", "Router", "TCP/IP", "Ethernet"]
  },
  {
    id: "gal-3",
    title: "Operating Systems & Linux Command Line",
    category: "Software & OS",
    imageUrl: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=900&q=80",
    caption: "Working in the Linux terminal environment, writing bash scripts, and managing system processes.",
    tags: ["Linux", "CLI", "Bash", "Ubuntu"]
  },
  {
    id: "gal-4",
    title: "Web Development & Code Practice",
    category: "Development",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
    caption: "Developing interactive web applications using React, TypeScript, and modern Tailwind CSS.",
    tags: ["React", "TypeScript", "Web", "Code"]
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "csa-studies",
    period: "2023 - Present",
    role: "Computer System Learner & Student",
    organization: "Computer Systems Studies",
    location: "Rusizi, Rwanda",
    type: "academic",
    description: "Developing comprehensive knowledge across computer hardware, operating systems, networking fundamentals, computer maintenance, and software development.",
    highlights: [
      "Conducted practical hardware assembly and component diagnostic labs.",
      "Configured local area networks, router settings, and IP subnet allocations.",
      "Practiced Linux and Windows operating system administration and command line scripting."
    ],
    technologies: ["Computer Hardware", "Operating Systems", "Networking", "Linux", "Troubleshooting"]
  },
  {
    id: "practical-it-support",
    period: "2024 - Present",
    role: "Practical IT Support & PC Maintenance Learner",
    organization: "Independent Practice & Community Projects",
    location: "Rusizi, Rwanda",
    type: "project",
    description: "Applying classroom learning to hands-on computer repair, OS installation, hardware upgrades, and network connectivity troubleshooting.",
    highlights: [
      "Assembled and upgraded multiple desktop computer systems with thermal paste re-application.",
      "Assisted peers in diagnosing software crashes, virus cleaning, and disk partitioning.",
      "Built automated system maintenance and backup routines."
    ],
    technologies: ["Hardware Repair", "BIOS/UEFI", "Diagnostics", "Disk Management", "Windows/Linux"]
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "hardware-assembly-maintenance",
    title: "Computer Maintenance & Hardware Troubleshooting",
    iconName: "Wrench",
    shortDesc: "Desktop assembly, component testing, thermal servicing, and physical computer maintenance.",
    fullDesc: "Practical hands-on hardware services including custom desktop assembly, component testing (RAM, CPU, storage), thermal paste replacement, dust cleaning, and POST diagnostic troubleshooting.",
    deliverables: [
      "Custom PC Component Assembly & Wiring",
      "Thermal Paste Replacement & Airflow Optimization",
      "Hardware Diagnostic & Fault Isolation",
      "Preventive System Dust Cleaning & Servicing"
    ],
    popular: true
  },
  {
    id: "os-software-setup",
    title: "Operating System Setup & Optimization",
    iconName: "Cpu",
    shortDesc: "Clean installation of Windows or Linux, driver configuration, and system optimization.",
    fullDesc: "Complete operating system setup for laptops and desktops, including disk partitioning, dual-boot configuration, essential software installation, driver updating, and removing bloatware.",
    deliverables: [
      "Clean Windows & Linux OS Installation",
      "Driver Updates & Peripheral Setup",
      "Disk Partitioning & Formatting (SSD/HDD)",
      "System Performance Tuning & Bloatware Removal"
    ],
    popular: true
  },
  {
    id: "network-setup",
    title: "Local Network & Router Configuration",
    iconName: "Network",
    shortDesc: "Home and small office Wi-Fi setup, LAN cabling, router settings, and connection troubleshooting.",
    fullDesc: "Assisting with local network configuration: setting up wireless routers, secure Wi-Fi passwords, DHCP IP ranges, printer sharing over LAN, and troubleshooting slow or dropping connections.",
    deliverables: [
      "Home / Small Office Router Configuration",
      "Secure Wi-Fi (WPA2/WPA3) & Password Setup",
      "Network Cabling & Switch Connections",
      "Internet & Ping Connectivity Troubleshooting"
    ]
  },
  {
    id: "web-development-basics",
    title: "Web Development Fundamentals",
    iconName: "Code2",
    shortDesc: "Clean, responsive websites and web applications built with HTML, CSS, JavaScript, and React.",
    fullDesc: "Developing clean, modern, and mobile-friendly websites for personal portfolios, student projects, or local business informational pages.",
    deliverables: [
      "Responsive Mobile-First Web Pages",
      "Clean HTML5, CSS3 & JavaScript Code",
      "React Component Building & Styling",
      "Direct WhatsApp Contact Integration"
    ]
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t1",
    name: "Aimable N.",
    role: "Computer Technology Instructor",
    organization: "Rusizi Technical Lab",
    avatarText: "AN",
    content: "MUHIRE JULES is an exceptionally dedicated Computer System learner. His passion for understanding hardware assembly, networking, and operating systems shines through in every lab assignment.",
    relationship: "Instructor & Technical Mentor"
  },
  {
    id: "t2",
    name: "Patrick K.",
    role: "Peer & Student Collaborator",
    organization: "Tech Study Circle",
    avatarText: "PK",
    content: "Jules is always the go-to person when we have computer troubleshooting questions or need help setting up Linux. He has great patience and a strong grasp of practical IT basics.",
    relationship: "Colleague & Project Partner"
  }
];
