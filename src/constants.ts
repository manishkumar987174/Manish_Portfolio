import { Github, Linkedin, Mail, Phone, Code2, Database, Layout, Terminal, Cpu, Globe } from 'lucide-react';

export const PERSONAL_INFO = {
  name: "Manish Kumar",
  title: "MERN Stack Developer | Full-Stack Engineer",
  email: "manishkumar987174@gmail.com",
  phone: "+91 6203056166",
<<<<<<< HEAD
  location: "Noida",
  summary: "Full Stack Developer skilled in developing modern and scalable web applications using React.js, Node.js, Express.js, and MongoDB/MySQL. Strong understanding of backend architecture, RESTful APIs, authentication systems, and database management. Experienced in building automation workflows with n8n and integrating AI-driven features such as chatbots and smart assistants. Focused on writing clean, efficient code and creating seamless user experiences.",
=======
  location: "New Delhi, India",
  summary: "MERN Stack Developer with hands-on experience in building scalable web applications using React.js, Node.js, and MongoDB/MySQL. Skilled in REST API development, JWT authentication, RBAC, and workflow automation using n8n, with additional experience in AI-based chatbot development.",
>>>>>>> bf6f929c5065c17480583726712e5028fd94bb08
  socials: [
    { name: 'GitHub', icon: Github, url: 'https://github.com' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com' },
    { name: 'Email', icon: Mail, url: 'mailto:manishdeveloper28@gmail.com' },
    { name: 'Phone', icon: Phone, url: 'tel:+916203056166' },
  ],
  whatsapp: {
    number: "916203056166",
    message: "Dear Manish! "
  }
};

export const SKILLS = [
  {
    category: "Languages",
    icon: Terminal,
    items: [
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "Java", level: 85 },
      { name: "Python", level: 70 },
      { name: "C", level: 75 },
      { name: "AL", level: 65 },
    ]
  },
  {
    category: "Frontend",
    icon: Layout,
    items: [
      { name: "React.js", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "HTML5/CSS3", level: 95 },
      { name: "Bootstrap", level: 80 },
    ]
  },
  {
    category: "Backend",
    icon: Database,
    items: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 88 },
      { name: "REST APIs", level: 92 },
      { name: "JWT Auth", level: 85 },
    ]
  },
  {
    category: "Tools & Others",
    icon: Cpu,
    items: [
      { name: "n8n Automation", level: 80 },
      { name: "Git/GitHub", level: 85 },
      { name: "MongoDB/MySQL", level: 82 },
      { name: "Postman", level: 90 },
    ]
  }
];

export const PROJECTS = [
  {
    title: "InterviewIQ.AI",
    description: "AI-Powered Interview Simulation Platform. Built full-stack AI platform for resume analysis and mock interviews using Generative AI.",
    tech: ["React", "Node.js", "MongoDB", "Generative AI", "Tailwind"],
    liveUrl: "https://ai-interview-agent-1-6819.onrender.com/",
    githubUrl: "https://github.com/manishkumar987174/AI_INTERVIEW_AGENT",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Library Management System",
    description: "Role-based LMS with Admin and Student portals. Features book management, issue/return system, and fine calculation.",
    tech: ["MERN Stack", "JWT", "RBAC", "Axios"],
    liveUrl: "https://lms-manish.netlify.app/",
    githubUrl: "https://github.com/manishkumar987174/LMS",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "StyleHive",
    description: "Fully responsive e-commerce platform with dynamic product listing, category filtering, and a complete shopping cart system.",
    tech: ["HTML", "CSS", "JavaScript", "LocalStorage"],
    liveUrl: "https://stylehive.vercel.app/index.html",
    githubUrl: "https://github.com/manishkumar987174/StyleHive",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Payroll Ledger",
    description: "Developed custom payroll extension with Employee Master, Setup, and Ledger tables using MS Dynamics 365 BC.",
    tech: ["AL", "Dynamics 365", "RDLC", "ERP"],
    liveUrl: null,
    githubUrl: "https://github.com/manishkumar987174/Employee-Payroll-Ledger",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800"
  }
];

export const EXPERIENCE = [
  {
    role: "Java Full Stack Developer Intern",
    company: "Croma Campus",
    location: "New Delhi",
    period: "Jul 2025 – Aug 2025",
    description: [
      "Developed full-stack applications using Java, Spring Boot, and MySQL.",
      "Designed REST APIs and implemented CRUD operations.",
      "Optimized database queries for better performance."
    ]
  }
];

export const EDUCATION = [
  {
    degree: "B.Tech – Computer Science",
    institution: "Dr. A.P.J. Abdul Kalam Technical University",
    location: "Lucknow",
    period: "2022 – 2026",
    grade: "Pursuing"
  },
  {
    degree: "Class XII – Science (BSEB)",
    institution: "M.V.G. High School",
    location: "Bihar",
    grade: "Completed"
  },
  {
    degree: "Class X – (BSEB)",
    institution: "M.V.G. High School",
    location: "Bihar",
    grade: "Completed"
  }
];
