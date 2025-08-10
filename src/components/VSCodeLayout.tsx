import { useState, useEffect } from 'react';
import { FileExplorer } from './FileExplorer';
import { TabBar } from './TabBar';
import { Editor } from './Editor';
import { ActivityBar } from './ActivityBar';
import { ThemeToggle } from './ThemeToggle';
import { StatusBar } from './StatusBar';
import { SocialLinks } from './SocialLinks';
import { MatrixBackground } from './MatrixBackground';

export interface FileItem {
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: FileItem[];
  content?: string;
  language?: string;
}

const fileStructure: FileItem[] = [
  {
    name: 'README.md',
    type: 'file',
    path: 'README.md',
    language: 'markdown',
    content: `# **Ikshit Agarwal** <br/><br/> 

##
*I’m a full-stack developer and problem solver with hands-on experience in *MERN* stack, and AI-powered systems.<br/>
I enjoy exploring new technologies and have worked on projects ranging from RAG-based models and real-time dashboards to emotion-aware applications.*<br/><br/>
---
**Education**

<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <th style="border: 1px solid #ccc; padding: 8px;">Qualification</th>
    <th style="border: 1px solid #ccc; padding: 8px;">Institution</th>
    <th style="border: 1px solid #ccc; padding: 8px;">Score / CGPA</th>
    <th style="border: 1px solid #ccc; padding: 8px;">Year</th>
  </tr>
  <tr>
    <td style="border: 1px solid #ccc; padding: 8px;">B.Tech – CSE Core</td>
    <td style="border: 1px solid #ccc; padding: 8px;">VIT, Vellore</td>
    <td style="border: 1px solid #ccc; padding: 8px;">CGPA: 8.74</td>
    <td style="border: 1px solid #ccc; padding: 8px;">Sep 2022 – Apr 2026</td>
  </tr>
  <tr>
    <td style="border: 1px solid #ccc; padding: 8px;">Senior Secondary (CBSE)</td>
    <td style="border: 1px solid #ccc; padding: 8px;">Maheshwari Public School</td>
    <td style="border: 1px solid #ccc; padding: 8px;">92.3%</td>
    <td style="border: 1px solid #ccc; padding: 8px;">2022</td>
  </tr>
  <tr>
    <td style="border: 1px solid #ccc; padding: 8px;">Secondary (CBSE)</td>
    <td style="border: 1px solid #ccc; padding: 8px;">Maheshwari Public School</td>
    <td style="border: 1px solid #ccc; padding: 8px;">97.01%</td>
    <td style="border: 1px solid #ccc; padding: 8px;">2020</td>
  </tr>
</table>

---
<br/><br/>


> "Code is like humor. When you have to explain it, it’s bad." — Cory House

 `
  },
  {
    name: 'src',
    type: 'folder',
    path: 'src',
    children: [
      {
        name: 'about.js',
        type: 'file',
        path: 'src/about.js',
        language: 'javascript',
        content: `// profile.js - Developer Profile
const developerProfile = {
  name: "Ikshit Agarwal",
  role: "Full-Stack Developer",
  location: "Jaipur, India",
  stack: ["MongoDB", "Express.js", "React", "Node.js"],
  learning: [
    "TypeScript for more robust and scalable frontend code",
    "Machine Learning to bring data-driven intelligence to apps",
    "Three.js for immersive 3D web experiences"
  ],
  interests: [
    "Sports analytics and football strategy discussions",
    "Cloud computing and scalable system design",
    "Music production and curating playlists for every mood"
  ],
  connections: [
  "You can find all my social links and ways to connect with me in the sidebar —",
  ],
  funFacts: [
    "Never misses a Champions League match",
    "Debugs faster with lo-fi beats playing in the background",
    "Can get lost for hours experimenting with new web tech"
  ],

};

export default developerProfile;
`
      },
      {
        name: 'projects.js',
        type: 'file',
        path: 'src/projects.js',
        language: 'javascript',
        content: `// Dementia Diary - Emotional Diary Web App
const dementiaDiary = {
  id: 1,
  name: "Dementia Diary – Emotional Diary Web App",
  link: "Link", // you can replace with actual URL
  type: "Self-project",
  role: "Full Stack",
  description: {
    summary:
      "Built a web application aimed at helping people with Alzheimer’s or dementia write daily diary entries and later retrieve them filtered by detected emotions like joy, sadness, anger, and surprise, etc.",
    details: [
      "Integrated a Python-based emotion detection model into a Node.js backend, achieving 95%+ accuracy and real-time tagging with response times under 500ms.",
      "Deployed frontend on Vercel, backend services on Render, and ML model on Hugging Face, achieving 99.9% uptime and average load times under 1.2 seconds."
    ],
  }
};

// Task Management - Web App for assigning and marking tasks
const taskManagement = {
  id: 2,
  name: "Task Management—WebApp for assigning and marking tasks",
  link: "Link", // replace with actual URL
  type: "Self-Project",
  role: "Full Stack",
  description: {
    summary:
      "Developed a task management web app supporting secure JWT-based authentication, enabling users to assign, update, and complete tasks while tracking daily progress.",
    details: [
      "Built RESTful APIs with Node.js and Express, managing 500+ task records efficiently.",
      "Integrated React Context API on the frontend for seamless global state management."
    ],
  }
};

// Laser Tag - webapp for event registration
const laserTag = {
  id: 3,
  name: "Laser Tag - webapp for event registration",
  link: "Link", // replace with actual URL
  type: "CSI, VITU",
  role: "Full Stack",
  description: {
    summary:
      "Created the event registration website using React.js, reducing form submission errors by 25%.",
    details: [
      "Facilitated 40% increase in website traffic compared to the previous year, with a 15% rise in event registrations.",
      "Effectively managed user registration and data management for 1200+ participants."
    ],
  }
};



// Optional stats object based on projects
const stats = {
  totalProjects: projects.length,
  completedProjects: projects.length, // assume all completed; adjust if needed
  techStack: [
    "Python",
    "Node.js",
    "React",
    "Vercel",
    "Render",
    "Hugging Face",
    "JWT",
    "Express",
    "React Context API"
  ],
  // You can add other metrics or compute from projects if you want
};

export { dementiaDiary, taskManagement, laserTag, projects, stats };
`
      },
      {
        name: 'skills.js',
        type: 'file',
        path: 'src/skills.js',
        language: 'javascript',
        content: `// Technical Skills & Expertise
const skills = {
  frontend: {
    category: "Frontend Development",
    icon: "🎨",
    technologies: [
      { name: "React", level: 85, experience: "2 years" },
      { name: "TypeScript", level: 75, experience: "6 months" },
      { name: "JavaScript", level: 90, experience: "3 years" },
      { name: "Next.js", level: 95, experience: "6 months" },
      { name: "Tailwind CSS", level: 80, experience: "1 year" },
      { name: "Three.js", level: 60, experience: "1 year" },
      
    ]
  },
  
  backend: {
    category: "Backend Development", 
    icon: "⚙️",
    technologies: [
      { name: "Node.js", level: 80, experience: "2 years" },
      { name: "Express.js", level: 75, experience: "1.5 years" },
      { name: "Python", level: 70, experience: "2 years" },
      { name: "FastAPI", level: 65, experience: "1 year" },
      { name: "SQL", level: 70, experience: "1.5 years" },
      { name: "MongoDB", level: 75, experience: "1 year" }
    ]
  },
  
  tools: {
    category: "Tools & DevOps",
    icon: "🛠️", 
    technologies: [
      { name: "Git", level: 90, experience: "3 years" },
      { name: "Docker", level: 70, experience: "1 year" },
      { name: "VS-Code", level: 95, experience: "4 years" },
      { name: "Linux", level: 75, experience: "2 years" },
      { name: "AWS", level: 60, experience: "6 months" },
      { name: "Figma", level: 80, experience: "2 years" }
    ]
  },
  
  learning: {
    category: "Currently Learning",
    icon: "📚",
    technologies: [
      { name: "Kubernetes", level: 30, experience: "Learning" },
      { name: "GraphQL", level: 40, experience: "Learning" },
      { name: "React-Native", level: 35, experience: "Learning" },
      { name: "ML", level: 25, experience: "Learning" }
    ]
  }
};

// Skill level interpreter
const getSkillLevel = (level) => {
  if (level >= 90) return "Expert";
  if (level >= 75) return "Advanced";
  if (level >= 60) return "Intermediate";
  if (level >= 40) return "Beginner";
  return "Learning";
};

export { skills, getSkillLevel };`
      },
      {
        name: 'experience.js',
        type: 'file',
        path: 'src/experience.js',
        language: 'javascript',
        content: `// Full-Stack Intern at ADRIOTEC ENGG
const fullStackIntern = {
  id: 1,
  company: "ADRIOTEC ENGG",
  duration: "June 2024 - August 2024",
  location: "Gurugram, India",
  description: "Built RAG model using LangChain and OpenAI GPT-3 to enhance customer engagement for a B2B platform.",

  responsibilities: [
    "Integrated company-specific data to enhance customer engagement",
    "Processed 10,000+ queries with improved response accuracy by 30%",
    "Reduced query resolution time by 40%"
  ],

  technologies: ["Python", "LangChain", "OpenAI GPT-3", "FastAPI", "React"],

  achievements: [
    "Achieved 18% increase in leads",
    "Reduced cost per sale significantly",
    "Boosted company's sales efficiency",
    "Implemented real-time customer support system"
  ]
};

// Software Dev Intern at LOGICSPICE
const softwareDevInternLogicspice = {
  id: 2,
  company: "LOGICSPICE",
  duration: "June 2025 - July 2025",
  location: "Jaipur, India",
  description: "Developed and maintained scalable, high-performance React.js applications tailored to client requirements.",

  responsibilities: [
    "Built admin panel for real estate client management",
    "Managed 90+ property listings and user inquiries",
    "Enabled real-time status updates and content management"
  ],

  technologies: ["React.js", "Node.js", "JavaScript", "CSS", "MySQL"],

  achievements: [
    "Helped property managers cut update delays by 50%",
    "Improved user experience with modern design standards",
    "Successfully delivered all projects on time",
    "Implemented responsive design for mobile compatibility"
  ]
};

// Frontend Intern at Diagnokare Technologies
const frontendInternDiagnokare = {
  id: 3,
  company: "Diagnokare Technologies",
  duration: "December 2023 - January 2024",
  location: "Jaipur, India",
  description: "Worked as a frontend intern on teleradiology software for enterprise clients",

  responsibilities: [
    "Developed interactive and responsive user interfaces using Next.js, React, and TypeScript",
    "Collaborated with the frontend team to improve the teleradiology platform used by 6 enterprise clients",
    "Ensured codebase reliability through testing and best practices",
    "Implemented modern web development principles for improved user experience"
  ],

  technologies: ["Next.js", "React", "TypeScript", "CSS"],

  achievements: [
    "Successfully delivered key UI components within deadlines",
    "Enhanced usability and visual consistency across the platform",
    "Improved frontend performance and code maintainability"
  ]
};

// Certifications
const certifications = [
  {
    name: "React Developer Certification",
    issuer: "Meta",
    date: "2024",
    credential: "Link"
  },
  {
    name: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024",
    credential: "Link"
  },
  {
    name: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    date: "2023",
    credential: "Link"
  }
];

export {
  fullStackIntern,
  softwareDevInternLogicspice,
  frontendInternDiagnokare,
  certifications
};


`
      }
    ]
  }
];

export const VSCodeLayout = () => {
  const [activeFile, setActiveFile] = useState<FileItem | null>(fileStructure[0]);
  const [openTabs, setOpenTabs] = useState<FileItem[]>([fileStructure[0]]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [enhancedView, setEnhancedView] = useState(true);

  const openFile = (file: FileItem) => {
    setActiveFile(file);
    if (!openTabs.find(tab => tab.path === file.path)) {
      setOpenTabs([...openTabs, file]);
    }
  };

  const closeTab = (file: FileItem) => {
    const newTabs = openTabs.filter(tab => tab.path !== file.path);
    setOpenTabs(newTabs);
    
    if (activeFile?.path === file.path) {
      setActiveFile(newTabs.length > 0 ? newTabs[newTabs.length - 1] : null);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background font-mono relative">
      {/* Title Bar */}
      <div className="h-8 bg-vscode-titleBar border-b border-border retro-border flex items-center justify-between px-4 relative z-10">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-sm text-muted-foreground ml-4">
            📁 Ikshit Agarwal
          </span>
        </div>
        <ThemeToggle />
      </div>

      <div className="flex flex-1 overflow-hidden relative z-10">
        {/* Activity Bar */}
        <ActivityBar 
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          enhancedView={enhancedView}
          onEnhancedViewChange={setEnhancedView}
        />

        {/* Sidebar */}
        {!sidebarCollapsed && (
          <div className="w-64 bg-vscode-sideBar border-r border-sidebar-border animate-slide-in-left flex flex-col">
            
            <FileExplorer 
              files={fileStructure} 
              onFileSelect={openFile}
              activeFile={activeFile}
            />
            {/* <SocialLinks /> */}
          </div>
        )}

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col bg-vscode-editor retro-border-pink">
          <TabBar 
            tabs={openTabs}
            activeTab={activeFile}
            onTabSelect={setActiveFile}
            onTabClose={closeTab}
          />
          
          <div className="flex-1 overflow-auto">
            
            <Editor file={activeFile} enhancedView={enhancedView} />
          </div>
          
        </div>
      </div>

      {/* Status Bar */}
      <StatusBar activeFile={activeFile} />
    </div>
  );
};