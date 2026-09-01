import { Project, SkillCategory, ExperienceItem, ServiceItem, TestimonialItem, GalleryItem } from '../types';
import julesPortrait from '../assets/images/jules_standing_portrait_1787308415487.jpg';
import julesAvatar from '../assets/images/jules_standing_avatar_1787308431629.jpg';

export const PERSONAL_INFO = {
  name: "MUHIRE Jules",
  shortName: "Jules",
  title: "Computer Systems & Architecture Specialist",
  tagline: "Bridging the gap between low-level hardware architectures, embedded firmware, and modern high-performance software systems.",
  location: "Rusizi District, Western Province, Rwanda",
  country: "Rwanda",
  avatarUrl: julesAvatar,
  portraitUrl: julesPortrait,
  
  // Logo Settings
  logoUrl: "",
  logoText: "Portfolio",
  useImageLogo: false,

  // Home / Hero Customization
  heroGreeting: "Hello, It's Me",
  heroRoles: [
    "Computer Systems Architect",
    "Embedded & IoT Engineer",
    "Full-Stack Web Developer",
    "Hardware & Linux Specialist"
  ],
  heroCtaText: "More About Me",
  heroCtaLink: "#about",

  // About Customization
  aboutHeading: "About Me",
  aboutSubheading: "Computer Systems and Architecture specialist based in Rusizi, Rwanda.",
  aboutChecklist: [
    "CPU & RISC-V Organization",
    "ESP32 & IoT Telemetry Nodes",
    "React, TypeScript & Tailwind CSS",
    "Linux & TCP/IP Networking"
  ],
  aboutImageUrl: julesPortrait,

  whatsappNumber: "+250794410997",
  whatsappDisplay: "0794410997",
  email: "mauricemjules@gmail.com",
  fieldOfStudy: "Computer System and Architecture (CSA)",
  status: "Open for Opportunities, Consultations & Freelance Projects",
  bio: "I am a dedicated Computer Systems and Architecture specialist based in Rusizi, Rwanda. My expertise spans digital logic design, CPU microarchitectures, embedded microcontrollers (ESP32/Arduino), low-level systems programming in C/C++ and Assembly, Linux networking, as well as full-stack web engineering with React, TypeScript, and modern APIs. I engineer robust, performant solutions from the physical silicon level up to distributed cloud software.",
  stats: [
    { label: "Completed Projects", value: "18+", icon: "FolderCheck" },
    { label: "Architecture & Lab Hours", value: "850+", icon: "Cpu" },
    { label: "Hardware & Tech Stack", value: "24+", icon: "Layers" },
    { label: "Client & Peer Satisfaction", value: "100%", icon: "Star" }
  ],
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    whatsapp: "https://wa.me/250794410997",
    email: "mailto:mauricemjules@gmail.com",
    twitter: "https://twitter.com"
  },
  technicalSkills: [
    { id: "tech-1", name: "HTML", level: 90, iconColor: "text-orange-500", iconText: "5" },
    { id: "tech-2", name: "CSS", level: 80, iconColor: "text-blue-500", iconText: "3" },
    { id: "tech-3", name: "Javascript / TypeScript", level: 85, iconColor: "text-yellow-400", iconText: "JS" },
    { id: "tech-4", name: "Python", level: 75, iconColor: "text-sky-400", iconText: "PY" },
    { id: "tech-5", name: "React", level: 85, iconColor: "text-cyan-400", iconText: "⚛" },
    { id: "tech-6", name: "C / C++ & Assembly", level: 92, iconColor: "text-indigo-400", iconText: "C" },
    { id: "tech-7", name: "Computer Architecture & RISC-V", level: 95, iconColor: "text-emerald-400", iconText: "CPU" }
  ],
  professionalSkills: [
    { id: "prof-1", name: "Creativity", percentage: 90 },
    { id: "prof-2", name: "Communication", percentage: 65 },
    { id: "prof-3", name: "Problem Solving", percentage: 75 },
    { id: "prof-4", name: "Teamwork", percentage: 85 }
  ]
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "csa",
    name: "Computer Systems & Architecture",
    iconName: "Cpu",
    description: "Hardware-software abstraction, microarchitecture, low-level execution pipelines, and digital logic.",
    skills: [
      { name: "Computer Organization & Architecture", level: 95, experienceYears: "3 yrs", tag: "Core", description: "In-depth knowledge of CPU datapath, ALU, control unit, pipelining, hazards, and branch prediction." },
      { name: "RISC & CISC Architectures (RISC-V, MIPS, x86)", level: 90, experienceYears: "3 yrs", tag: "ISA", description: "Instruction Set Architectures, instruction decoding, register allocation, and assembly translation." },
      { name: "Low-Level Programming (C & C++)", level: 92, experienceYears: "3 yrs", tag: "Systems", description: "Memory management, pointers, bitwise manipulation, DMA, interrupt handling, and performance optimization." },
      { name: "Assembly Language (RISC-V / x86)", level: 86, experienceYears: "2.5 yrs", tag: "Low-Level", description: "Direct register manipulations, stack frames, calling conventions, and low-level debugging with GDB." },
      { name: "Memory Hierarchy & Cache Systems", level: 90, experienceYears: "3 yrs", tag: "Memory", description: "L1/L2/L3 cache coherence, page tables, TLB, Virtual Memory, and bus architectures." },
      { name: "Digital Logic & Circuit Design", level: 88, experienceYears: "3 yrs", tag: "Hardware", description: "Logic gates, multiplexers, flip-flops, sequential circuits, and hardware simulation." }
    ]
  },
  {
    id: "embedded",
    name: "Embedded Systems & IoT",
    iconName: "Radio",
    description: "Physical computing, sensor integration, real-time control, and connected IoT solutions.",
    skills: [
      { name: "Microcontrollers (ESP32, ESP8266, Arduino)", level: 94, experienceYears: "3 yrs", tag: "Firmware", description: "Flashing, GPIO control, RTOS basics, sleep modes, and low-power IoT telemetry." },
      { name: "Communication Protocols (I2C, SPI, UART, CAN)", level: 92, experienceYears: "3 yrs", tag: "Bus", description: "Interfacing peripherals, digital sensors, OLED displays, and serial transceivers." },
      { name: "Sensors & Actuators Interfacing", level: 95, experienceYears: "3 yrs", tag: "Hardware", description: "Ultrasonic, temperature/humidity, soil moisture, motion sensors, relay switches, and servo motors." },
      { name: "Wireless IoT (WiFi, BLE, MQTT)", level: 89, experienceYears: "2.5 yrs", tag: "Wireless", description: "Publish-subscribe IoT communication, MQTT broker setup, HTTP REST telemetry, and Bluetooth BLE beacons." },
      { name: "PCB Prototyping & Circuit Breadboarding", level: 85, experienceYears: "2.5 yrs", tag: "Prototyping", description: "Schematic design, power regulation, sensor isolation, and safe hardware testing." }
    ]
  },
  {
    id: "software",
    name: "Full-Stack Software Engineering",
    iconName: "Code2",
    description: "Modern, responsive, and robust web applications with clean TypeScript, React, and backend APIs.",
    skills: [
      { name: "React 18/19 & TypeScript", level: 94, experienceYears: "3 yrs", tag: "Frontend", description: "Component state architecture, custom hooks, performance profiling, and clean UI engineering." },
      { name: "Node.js & Express.js", level: 90, experienceYears: "3 yrs", tag: "Backend", description: "RESTful endpoints, middleware chains, token authentication, and API error handling." },
      { name: "Tailwind CSS & Modern UI/UX", level: 96, experienceYears: "3 yrs", tag: "UI", description: "Responsive layouts, mobile-first design, accessibility, and high-performance fluid styles." },
      { name: "Database Engineering (PostgreSQL, SQLite, MongoDB)", level: 88, experienceYears: "2.5 yrs", tag: "Database", description: "Schema normalization, indexing, query optimization, and relational data modeling." },
      { name: "REST APIs & WebSockets", level: 92, experienceYears: "3 yrs", tag: "Networking", description: "Real-time bi-directional streaming, asynchronous data fetching, and rate-limiting." }
    ]
  },
  {
    id: "networking",
    name: "Networking & Operating Systems",
    iconName: "Network",
    description: "Operating system internals, Linux kernel administration, and resilient network design.",
    skills: [
      { name: "Operating System Principles", level: 92, experienceYears: "3 yrs", tag: "OS", description: "Process scheduling, thread concurrency, semaphores/mutexes, file systems, and IPC." },
      { name: "Linux System Administration (Ubuntu, Debian, Arch)", level: 94, experienceYears: "3 yrs", tag: "Linux", description: "Bash scripting, systemd services, SSH hardening, user permissions, and cron jobs." },
      { name: "TCP/IP, Routing & Subnetting", level: 90, experienceYears: "3 yrs", tag: "Cisco/Net", description: "OSI 7 layers, packet encapsulation, VLANs, CIDR subnetting, and DNS/DHCP infrastructure." },
      { name: "Network Packet Analysis (Wireshark)", level: 86, experienceYears: "2 yrs", tag: "Security", description: "Protocol inspection, packet sniffing, network troubleshooting, and latency diagnostics." },
      { name: "Git, GitHub & Version Control", level: 95, experienceYears: "4 yrs", tag: "DevOps", description: "Branching strategies, merge conflict resolution, CI/CD actions, and project versioning." }
    ]
  },
  {
    id: "diagnostics",
    name: "Hardware Diagnostics & IT Maintenance",
    iconName: "Wrench",
    description: "Physical hardware troubleshooting, component testing, and system optimization.",
    skills: [
      { name: "Computer Assembly & Hardware Diagnostics", level: 96, experienceYears: "4 yrs", tag: "Hardware", description: "Motherboard, CPU, RAM, GPU, storage testing, thermal paste application, and POST code analysis." },
      { name: "BIOS / UEFI Setup & Firmware Tuning", level: 92, experienceYears: "3 yrs", tag: "Firmware", description: "Bootloader repair, secure boot configuration, XMP/memory overclocking, and power states." },
      { name: "Storage Systems & RAID Configuration", level: 88, experienceYears: "2.5 yrs", tag: "Storage", description: "NVMe, SSD health diagnostics, RAID 0/1/5 arrays, data recovery, and partition management." }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "riscv-pipeline-sim",
    title: "RISC-V 5-Stage CPU Pipeline Emulator",
    subtitle: "Cycle-Accurate Instruction Execution & Hazard Resolution Simulator",
    category: "systems",
    imageUrl: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=900&q=80",
    featured: true,
    description: "A cycle-accurate 32-bit RISC-V computer architecture simulator implementing the classic 5-stage pipeline: Fetch, Decode, Execute, Memory, and Writeback with data forwarding and branch hazard prediction.",
    longDescription: "Engineered to deepen practical computer architecture research. This system models how instructions flow through pipeline registers (IF/ID, ID/EX, EX/MEM, MEM/WB), simulates ALU operations, register file state transitions, and demonstrates data forwarding to eliminate pipeline stalls.",
    problemStatement: "Understanding CPU internal timing and pipeline stalls in modern RISC microprocessors requires transparent visibility into internal flip-flops and bus signals.",
    solutionArchitecture: "Built a modular C++/TypeScript simulation engine parsing RISC-V RV32I machine code into control signals, register files, and clock-cycle timing waveforms.",
    keyFeatures: [
      "5-Stage Pipeline visualization with live register inspection",
      "Hazard detection unit & ALU data forwarding unit",
      "Dynamic branch predictor simulation with branch penalty counter",
      "Interactive Step-by-Cycle clock execution and memory dump",
      "Assembly-to-Machine-Code live interactive assembler"
    ],
    technologies: ["C++", "TypeScript", "RISC-V ISA", "Computer Architecture", "Digital Logic", "Canvas"],
    metrics: [
      { label: "Supported Instructions", value: "37 RV32I" },
      { label: "Clock Accuracy", value: "100%" },
      { label: "Hazard Forwarding Speedup", value: "1.42x" }
    ],
    githubUrl: "https://github.com",
    liveUrl: "#architecture-lab",
    date: "2024 - 2025"
  },
  {
    id: "iot-agro-rusizi",
    title: "Smart Agro IoT & Soil Telemetry Station (Rusizi Valley)",
    subtitle: "Precision Agriculture Hardware & Web Telemetry for Western Rwanda",
    category: "embedded",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
    featured: true,
    description: "An automated solar-powered IoT hardware station deployed with ESP32 microcontrollers, multi-depth capacitive soil moisture sensors, and automated relay-driven irrigation pumps tailored for the terrain in Rusizi District, Rwanda.",
    longDescription: "Designed specifically for crop microclimates in Rusizi, this embedded IoT hardware node periodically samples soil moisture, pH, atmospheric temperature, and humidity, transmitting packets over MQTT/HTTP to a cloud dashboard. Includes solar battery charging circuitry and deep sleep power saving.",
    problemStatement: "Farmers in agricultural zones such as Rusizi require cost-effective, durable local hardware stations to prevent over/under-irrigation and conserve water.",
    solutionArchitecture: "ESP32 microcontroller + Capacitive Analog Sensors + NPK soil sensor over RS485 Modbus + Relay triggers + Real-time Web Telemetry UI.",
    keyFeatures: [
      "Ultra-low power deep-sleep cycle consuming under 15uA between readings",
      "Automated closed-loop solenoid valve activation based on soil thresholds",
      "Real-time WebSocket & REST web telemetry with alert triggers",
      "Offline SD-card fallback logging during network disconnections",
      "Solar battery power management with voltage monitoring"
    ],
    technologies: ["ESP32", "C / C++ (Arduino/ESP-IDF)", "MQTT", "React", "TypeScript", "Tailwind CSS", "Node.js"],
    metrics: [
      { label: "Water Savings", value: "35%" },
      { label: "Telemetry Latency", value: "< 250ms" },
      { label: "Battery Autonomy", value: "14 Days" }
    ],
    githubUrl: "https://github.com",
    liveUrl: "https://wa.me/250794410997?text=Hello%20Jules,%20tell%20me%20more%20about%20the%20Agro%20IoT%20Station%20project",
    date: "2024"
  },
  {
    id: "rwanda-traffic-net-analyzer",
    title: "Rwanda Network Traffic & Packet Inspector",
    subtitle: "High-Throughput Packet Sniffing & Subnet Diagnostics Tool",
    category: "networking",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
    featured: true,
    description: "A specialized network performance and latency monitor for analyzing local ISP peering, bandwidth utilization, packet loss, and routing hops across Rwanda network infrastructure.",
    longDescription: "A custom network diagnostics suite combining raw socket sniffing, ping round-trip benchmarking across regional servers, and a visual network topology builder to troubleshoot network packet bottlenecks.",
    problemStatement: "Network administrators in distributed regional offices need fast, lightweight diagnostics without heavy enterprise licensing overhead.",
    solutionArchitecture: "Backend Node/C++ raw socket capture daemon streaming packet telemetry over WebSocket to a responsive visual graph.",
    keyFeatures: [
      "Real-time packet inspection (TCP, UDP, ICMP, DNS, HTTP)",
      "Bandwidth throughput graph with peak load alerts",
      "Subnet IP discovery & MAC address resolution scanner",
      "Hop-by-hop latency tracing and route visualizer"
    ],
    technologies: ["Node.js", "TypeScript", "Socket.io", "TCP/IP", "Wireshark PCAP", "Tailwind CSS"],
    metrics: [
      { label: "Packets/sec Parsed", value: "25,000+" },
      { label: "Analysis Latency", value: "< 12ms" },
      { label: "Subnet Scan Rate", value: "256 IPs/3s" }
    ],
    githubUrl: "https://github.com",
    liveUrl: "https://wa.me/250794410997?text=Hello%20Jules,%20tell%20me%20more%20about%20the%20Network%20Analyzer%20project",
    date: "2024"
  },
  {
    id: "microkernel-scheduler",
    title: "Micro-Kernel Task Scheduler & Memory Allocator",
    subtitle: "Preemptive Multi-tasking OS Kernel Module in C",
    category: "systems",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
    featured: false,
    description: "A lightweight OS microkernel implementation demonstrating preemptive round-robin thread scheduling, interrupt service routines, and a buddy memory allocation system.",
    longDescription: "Built from scratch to study core operating system fundamentals. Features context switching via assembly stack manipulation, timer interrupts (PIT), mutex locks for race condition prevention, and paging memory management.",
    problemStatement: "Operating systems concepts like context switching and page faults are best mastered by writing a bare-metal kernel subsystem.",
    solutionArchitecture: "C and x86 Assembly code compiled with GCC and booted via QEMU emulator.",
    keyFeatures: [
      "Preemptive round-robin scheduling with priority queues",
      "Context switching via hardware timer interrupt",
      "Buddy memory allocator preventing external fragmentation",
      "Spinlock & Mutex synchronization primitives"
    ],
    technologies: ["C", "x86 Assembly", "QEMU", "Operating Systems", "GDB Debugger"],
    metrics: [
      { label: "Context Switch Time", value: "< 8 microseconds" },
      { label: "Max Active Threads", value: "64" }
    ],
    githubUrl: "https://github.com",
    liveUrl: "https://wa.me/250794410997?text=Hello%20Jules,%20tell%20me%20more%20about%20your%20Micro-Kernel%20project",
    date: "2023 - 2024"
  },
  {
    id: "fastpulse-telemetry",
    title: "PulseGuard Health Telemetry & Hardware Node",
    subtitle: "Wearable Optical Sensor Interfacing & Patient Vital Dashboard",
    category: "embedded",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80",
    featured: false,
    description: "An optical PPG pulse oximetry hardware device transmitting real-time heart rate and SpO2 vital statistics to a doctor web console with anomaly detection.",
    longDescription: "MAX30102 optical sensor integrated with ESP32 via I2C protocol, featuring real-time digital filtering (Bandpass Butterworth filter) to remove motion artifacts and display clean PPG pulse waves.",
    problemStatement: "Remote health centers need low-cost vital monitors that can stream patient metrics reliably over cellular or local WiFi networks.",
    solutionArchitecture: "I2C MAX30102 Sensor + ESP32 Digital Signal Processing + WebSocket Gateway + React Dashboard.",
    keyFeatures: [
      "Real-time photoplethysmogram (PPG) waveform graph at 50Hz",
      "Automatic tachycardia and hypoxia alarm thresholds",
      "Patient historical records with PDF report generation",
      "Emergency WhatsApp notification webhook trigger"
    ],
    technologies: ["ESP32", "MAX30102 Sensor", "I2C Protocol", "React", "TypeScript", "Tailwind CSS"],
    metrics: [
      { label: "Heart Rate Accuracy", value: "±2 BPM" },
      { label: "Sampling Rate", value: "100 Hz" }
    ],
    githubUrl: "https://github.com",
    liveUrl: "https://wa.me/250794410997?text=Hello%20Jules,%20tell%20me%20about%20PulseGuard%20Hardware",
    date: "2024"
  },
  {
    id: "csa-hub-platform",
    title: "CSA Hub: Interactive Computer Architecture Platform",
    subtitle: "Modern Web Platform for Systems Engineering & Logic Simulation",
    category: "web",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    featured: true,
    description: "A comprehensive full-stack learning and laboratory portal for computer systems students, featuring interactive logic gate sandboxes, cache hit-rate analyzers, and technical docs.",
    longDescription: "Developed with React, TypeScript, and Tailwind CSS. Features dynamic memory address splitters (Tag, Set Index, Block Offset) for direct-mapped and set-associative cache exploration, binary-to-hex converters, and CPU speed calculator.",
    problemStatement: "Engineering students often struggle to visualize binary memory indexing and cache architecture without tactile interactive tools.",
    solutionArchitecture: "Single-page responsive web app with custom interactive canvas rendering and local state persistence.",
    keyFeatures: [
      "Interactive Cache Visualizer (Direct Mapped, 2-Way, 4-Way Associative)",
      "Digital logic truth table generator and gate wiring canvas",
      "Assembly code instruction tokenizer and register tracker",
      "Dark / Light high-contrast mode with responsive mobile layout"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "Lucide Icons", "Motion"],
    metrics: [
      { label: "Lighthouse Score", value: "99/100" },
      { label: "Interactive Tools", value: "8 Modules" },
      { label: "Bundle Size", value: "< 180 KB" }
    ],
    githubUrl: "https://github.com",
    liveUrl: "#architecture-lab",
    date: "2025"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Microcontroller & Sensor Circuit Lab",
    category: "Embedded Hardware",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
    caption: "Breadboarding ESP32-WROOM microcontroller with multi-channel capacitive sensors and I2C OLED display.",
    tags: ["ESP32", "Circuits", "Sensors", "I2C"]
  },
  {
    id: "gal-2",
    title: "CPU Silicon & Semiconductor Architecture",
    category: "Computer Architecture",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    caption: "Microprocessor die layout analysis, exploring L1 cache banks, ALU datapath, and register file layout.",
    tags: ["RISC-V", "Silicon", "ALU", "Cache"]
  },
  {
    id: "gal-3",
    title: "Signal Analysis & Logic Diagnostics",
    category: "Lab Diagnostics",
    imageUrl: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=900&q=80",
    caption: "Using digital storage oscilloscopes to inspect UART clock jitter and PWM duty cycle waveforms.",
    tags: ["Oscilloscope", "Diagnostics", "Clock Signals"]
  },
  {
    id: "gal-4",
    title: "High-Throughput Server & Networking Rack",
    category: "Networking & OS",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
    caption: "Linux server routing configuration, VLAN isolation, and Wireshark network throughput benchmarking.",
    tags: ["Linux", "Datacenter", "TCP/IP", "Wireshark"]
  },
  {
    id: "gal-5",
    title: "Precision Agro IoT Station in the Field",
    category: "IoT Deployment",
    imageUrl: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=900&q=80",
    caption: "Solar-powered environmental station logging soil moisture and transpiration metrics in Rusizi Valley, Rwanda.",
    tags: ["Rwanda", "Solar IoT", "AgriTech", "Rusizi"]
  },
  {
    id: "gal-6",
    title: "Low-Level C/C++ Systems Development",
    category: "Software & Kernel",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
    caption: "Developing kernel context switcher and instruction emulator using modern C++ and assembly toolchains.",
    tags: ["C++", "Assembly", "Kernel", "GDB"]
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "csa-studies",
    period: "2022 - Present",
    role: "Computer System and Architecture Scholar",
    organization: "Higher Education / University Systems Lab",
    location: "Rusizi & Rwanda",
    type: "academic",
    description: "Specializing in Computer Systems & Architecture with an emphasis on microarchitecture, microprocessor design, digital circuits, low-level OS development, and high-performance computing.",
    highlights: [
      "Excellence in Computer Organization, RISC/x86 Architectures, and Digital Electronics.",
      "Conducted extensive hardware laboratory experiments with microcontrollers, oscilloscopes, and logic analyzers.",
      "Designed and simulated full 32-bit CPU datapaths and pipelined execution stages."
    ],
    technologies: ["RISC-V", "C/C++", "Assembly", "Digital Circuits", "Linux Kernel", "Computer Networks"]
  },
  {
    id: "embedded-iot-lead",
    period: "2023 - Present",
    role: "Embedded Systems & IoT Hardware Lead",
    organization: "Independent & Collaborative Lab Projects",
    location: "Rusizi, Rwanda",
    type: "project",
    description: "Architecting end-to-end IoT prototypes for agricultural monitoring, environmental sensing, and automated telemetry in Western Rwanda.",
    highlights: [
      "Built solar-powered agricultural sensor nodes running ESP32 microcontrollers with MQTT telemetry.",
      "Engineered firmware with power-saving deep sleep routines extending battery longevity to weeks.",
      "Created modern companion web dashboards connecting microcontrollers with real-time WebSockets."
    ],
    technologies: ["ESP32", "Arduino", "I2C/SPI", "MQTT", "React", "TypeScript", "Node.js"]
  },
  {
    id: "fullstack-systems-dev",
    period: "2023 - Present",
    role: "Full-Stack Web & Software Engineer",
    organization: "Freelance & Technical Collaborations",
    location: "Rwanda & Remote",
    type: "internship",
    description: "Developing modern, responsive, and robust web applications for clients and regional initiatives needing performant web systems, database integrations, and hardware-connected dashboards.",
    highlights: [
      "Built over 15+ production-grade web interfaces with React, TypeScript, Tailwind CSS, and REST backends.",
      "Optimized frontend load times, achieving 95+ Google PageSpeed and Lighthouse performance scores.",
      "Integrated direct WhatsApp API messaging, payment gateways, and real-time data streaming."
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "Git"]
  },
  {
    id: "tech-mentorship",
    period: "2024 - Present",
    role: "Systems & Programming Peer Mentor",
    organization: "Rusizi Tech & Student Community",
    location: "Rusizi, Rwanda",
    type: "leadership",
    description: "Mentoring junior students and aspiring engineers in computer architecture, C programming, Linux terminal mastery, and web development fundamentals.",
    highlights: [
      "Organized study circles on digital logic, CPU pipelining, and memory management.",
      "Assisted 30+ students in debugging hardware circuits, breadboard wiring, and C code errors."
    ],
    technologies: ["Mentorship", "Technical Communication", "C Programming", "Linux", "Hardware Debugging"]
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "csa-consulting",
    title: "Systems & Architecture Design",
    iconName: "Cpu",
    shortDesc: "High-performance hardware-software system design, CPU/memory optimization, and firmware.",
    fullDesc: "Expert technical guidance on system architecture, microarchitecture evaluation, low-level algorithm optimization in C/C++, and hardware-software co-design for maximum throughput and reliability.",
    deliverables: [
      "System Datapath & Microarchitecture Specifications",
      "Low-Level C/C++ Performance Optimization",
      "Hardware-Software Interface & Register Maps",
      "Fault-Tolerance & Memory Hierarchy Planning"
    ],
    popular: true
  },
  {
    id: "iot-embedded",
    title: "Embedded Systems & IoT Prototyping",
    iconName: "Radio",
    shortDesc: "Custom microcontroller firmware, sensor integration (ESP32/Arduino), and wireless telemetry.",
    fullDesc: "Complete development of connected physical devices from breadboard prototyping, sensor wiring (I2C/SPI/UART), power optimization, to wireless MQTT/WiFi cloud sync.",
    deliverables: [
      "Custom ESP32 / Arduino Firmware Development",
      "Sensor Calibration & Circuit Breadboarding",
      "MQTT / HTTP Cloud Telemetry Gateway",
      "Real-time Companion Web Dashboard"
    ],
    popular: true
  },
  {
    id: "web-dev",
    title: "Full-Stack Web Engineering",
    iconName: "Globe",
    shortDesc: "Fast, responsive, modern web applications built with React, TypeScript, and Tailwind CSS.",
    fullDesc: "End-to-end web engineering creating intuitive, pixel-perfect user interfaces, robust backend REST APIs, real-time WebSockets, and seamless database architectures.",
    deliverables: [
      "Custom Responsive React / TypeScript Frontend",
      "Secure Node.js & Express RESTful API",
      "Database Schema Design & Query Optimization",
      "WhatsApp & Payment Gateway Integrations"
    ]
  },
  {
    id: "networking-linux",
    title: "Network Setup & Linux Administration",
    iconName: "Network",
    shortDesc: "Local network architecture, Linux server hardening, packet analysis, and DNS/DHCP routing.",
    fullDesc: "Configuring robust networking environments, subnet planning, Linux server deployment (Ubuntu/Debian), SSH security, firewall setup, and Wireshark diagnostics.",
    deliverables: [
      "Subnetting & VLAN Topology Planning",
      "Linux Server Configuration & SSH Hardening",
      "Network Latency & Bottleneck Diagnostics",
      "Automated Bash Maintenance Scripts"
    ]
  },
  {
    id: "hardware-it",
    title: "Hardware Diagnostics & PC Engineering",
    iconName: "Wrench",
    shortDesc: "Component-level PC assembly, BIOS tuning, thermal optimization, and hardware recovery.",
    fullDesc: "Professional diagnostics for desktop and server hardware, motherboard POST analysis, RAM testing, NVMe storage setup, BIOS/UEFI firmware configuration, and preventive maintenance.",
    deliverables: [
      "System Hardware Assembly & Stress Testing",
      "BIOS / UEFI Configuration & Firmware Updates",
      "Thermal Paste Replacement & Airflow Tuning",
      "Storage Health Diagnostics & Data Backup"
    ]
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t1",
    name: "Jean-Paul Habimana",
    role: "Senior Systems Engineer",
    organization: "Rwanda Tech Collaborations",
    avatarText: "JH",
    content: "MUHIRE Jules brings an extraordinary depth of understanding to Computer Systems and Architecture. Whether it's tracing instruction pipelines in assembly or architecting full-stack web applications, his attention to detail and work ethic are top tier.",
    relationship: "Colleague & Technical Reviewer"
  },
  {
    id: "t2",
    name: "Diane Uwase",
    role: "Agricultural Project Manager",
    organization: "Western Province IoT Initiative",
    avatarText: "DU",
    content: "The smart soil telemetry station Jules engineered for our field tests in Rusizi was both robust and intuitive. The solar power optimization and real-time dashboard made monitoring crop conditions effortless.",
    relationship: "Project Partner (Rusizi District)"
  },
  {
    id: "t3",
    name: "Eric Mugisha",
    role: "Lead Software Architect",
    organization: "Kigali Code Works",
    avatarText: "EM",
    content: "Finding someone who understands both the lowest levels of hardware registers and modern React/TypeScript frontend development is rare. Jules is a gifted engineer with a very bright future in Rwanda's tech ecosystem.",
    relationship: "Industry Mentor"
  }
];

export const ARCHITECTURE_LESSONS = [
  {
    id: "pipeline",
    title: "5-Stage CPU Pipeline Simulator",
    description: "Explore the internal microarchitecture of modern RISC processors (Fetch, Decode, Execute, Memory, Writeback)."
  },
  {
    id: "cache",
    title: "Cache Memory & Tag Calculator",
    description: "Visualize how memory addresses map to Cache Sets, Tags, and Block Offsets in direct-mapped and multi-way associative caches."
  },
  {
    id: "logic",
    title: "Digital Logic Gates Playground",
    description: "Interactive Boolean logic simulator testing AND, OR, XOR, NAND, and Half-Adder circuits."
  }
];
