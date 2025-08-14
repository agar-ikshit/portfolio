import { MatrixBackground } from './MatrixBackground';
import { FileItem } from './VSCodeLayout';
import ReactMarkdown from "react-markdown";
import * as simpleIcons from "simple-icons";
import rehypeRaw from 'rehype-raw';

interface EditorProps {
  file: FileItem | null;
  enhancedView?: boolean;
}

export const Editor = ({ file, enhancedView = true }: EditorProps) => {
  if (!file) {
    return (
      <div className="h-full flex items-center justify-center bg-editor-bg">
        
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4"></div>
          <h2 className="text-2xl font-bold text-primary neon-glow">
            Welcome to My Portfolio
          </h2>
          <p className="text-muted-foreground max-w-md">
            Select a file from the explorer to view my work, skills, and experience.
            This VS Code-inspired interface showcases my development journey.
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <span className="px-3 py-1 bg-primary/20 text-primary rounded">React</span>
            <span className="px-3 py-1 bg-secondary/20 text-secondary rounded">TypeScript</span>
            <span className="px-3 py-1 bg-accent/20 text-accent rounded">Tailwind</span>
          </div>
        </div>
      </div>
    );
  }

const highlightSyntax = (code) => {
  const syntaxRegex =
    /(\/\*[\s\S]*?\*\/|\/\/.*$)|(`[\s\S]*?`)|(["'])(?:\\.|(?!\3)[^\\\n])*\3|\b(const|let|var|function|return|if|else|for|while|class|export|import|from|new|async|await)\b|\b([a-zA-Z_$][a-zA-Z0-9_$]*)\b(?=\s*=)|\b(\d+)\b/gm;

  return code.replace(syntaxRegex, (match, comment, template, quote, keyword, variable, number) => {
    if (comment) return `<span class="code-comment">${comment}</span>`;

    if (template) {
      // highlight inside the backticks
      const innerCode = template.slice(1, -1);
      const highlightedInner = highlightSyntax(innerCode); // recursion
      return `<span class="code-string">\`</span>${highlightedInner}<span class="code-string">\`</span>`;
    }

    if (quote) return `<span class="code-string">${match}</span>`;
    if (keyword) return `<span class="code-keyword">${keyword}</span>`;
    if (variable) return `<span class="code-variable">${variable}</span>`;
    if (number) return `<span class="code-number">${number}</span>`;
    return match;
  });
};




  const renderContent = () => {
    if (!file.content) return null;

    // For JavaScript files, add syntax highlighting
    if (file.language === 'javascript') {
      return (
        <pre className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          <code className="text-editor-foreground">
            {file.content.split('\n').map((line, index) => (
              <div key={index} className="flex">
                <span className="w-12 text-right pr-4 text-muted-foreground select-none border-r border-border mr-4">
                  {index + 1}
                </span>
                <span 
                  className="flex-1"
                  dangerouslySetInnerHTML={{
                    __html: highlightSyntax(line)
                  }}
                />
              </div>
            ))}
          </code>
        </pre>
      );
    }

    // For markdown files
    if (file.language === 'markdown') {
      return (
        <div className="prose prose-invert max-w-none markdown-body">
          
              <ReactMarkdown
  rehypePlugins={[rehypeRaw]}
  components={{
    h1: ({node, ...props}) => <h1 {...props} />
  }}
>
  {file.content}
</ReactMarkdown>
              
           
          
        </div>
      );
    }

    return (
      <pre className="text-sm leading-relaxed whitespace-pre-wrap break-words">
        <code className="text-editor-foreground">
          {file.content.split('\n').map((line, index) => (
            <div key={index} className="flex">
              <span className="w-12 text-right pr-4 text-muted-foreground select-none border-r border-border mr-4">
                {index + 1}
              </span>
              <span className="flex-1 break-words">{line}</span>
            </div>
          ))}
        </code>
      </pre>
    );
  };

  // Enhanced Skills Content
const renderSkillsContent = (file: FileItem) => {
  try {
    const match = file.content?.match(/const skills = ({[\s\S]*?});/);
    if (!match) return renderContent();

    const skillsData = eval(`(${match[1]})`);

    return (
      <div className="space-y-6">
        {Object.entries(skillsData).map(([key, category]: [string, any]) => (
          <div key={key} className="relative content-card retro-border">
            {/* Left neon accent */}
            <div className="absolute left-0 top-0 h-full w-1 bg-neon-cyan/60"></div>

            <h2 className="text-xl font-bold text-neon-cyan mb-4 flex items-center ml-3">
              <span className="mr-2">{category.icon}</span>
              {category.category}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-3">
              {category.technologies.map((tech: any, index: number) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted/10 transition">
                  <img
                    src={`/icons/${tech.name.toLowerCase().replace(/\s+/g, '')}.svg`}
                    alt={`${tech.name} logo`}
                    className="w-6 h-6 text-neon-cyan"
                  />
                  <div>
                    <p className="font-medium">{tech.name}</p>
                    <p className="text-sm text-muted-foreground">{tech.experience}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    return renderContent();
  }
};



  // Enhanced Projects Content
const renderProjectsContent = (file: FileItem) => {
  if (!file.content) return null;

  try {
    const dementiaMatch = file.content.match(/const dementiaDiary\s*=\s*({[\s\S]*?});/);
    const taskManagementMatch = file.content.match(/const taskManagement\s*=\s*({[\s\S]*?});/);
    const laserTagMatch = file.content.match(/const laserTag\s*=\s*({[\s\S]*?});/);
    const cryptoArbitrageMatch = file.content.match(/const cryptoArbitrage\s*=\s*({[\s\S]*?});/);

    if (!dementiaMatch || !taskManagementMatch || !laserTagMatch || !cryptoArbitrageMatch)
      return renderContent();

    const dementiaDiary = eval(`(${dementiaMatch[1]})`);
    const taskManagement = eval(`(${taskManagementMatch[1]})`);
    const laserTag = eval(`(${laserTagMatch[1]})`);
    const cryptoArbitrage = eval(`(${cryptoArbitrageMatch[1]})`);

    dementiaDiary.link = "https://dementia-diary-frontend.vercel.app/";
    taskManagement.link = "https://torus-task-management.vercel.app/";
    laserTag.link = "https://lasertag.csivit.com/";
    cryptoArbitrage.link = "https://github.com/agar-ikshit/arbitrage";

    const projects = [dementiaDiary, cryptoArbitrage, taskManagement, laserTag];

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="content-card retro-border p-5 relative"
          >
            {/* Left accent bar */}
            <div className="absolute left-0 top-0 h-full w-1 bg-neon-cyan opacity-70 z-10"></div>

            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-neon-cyan">{project.name}</h3>
              <span className="text-xs retro-border-blue text-neon-blue px-2 py-1 rounded">
                {project.type} | {project.role}
              </span>
            </div>

            <p className="text-muted-foreground mb-3">{project.description.summary}</p>

            <ul className="space-y-1 text-sm mb-4">
              {project.description.details.slice(0, 3).map((detail: string, i: number) => (
                <li key={i} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>

            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs retro-border-green text-neon-green px-3 py-1 rounded hover:bg-green-900/20 transition"
            >
              View Project
            </a>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    return renderContent();
  }
};


// Enhanced About Content

const renderAboutContent = (file: FileItem) => {
  try {
    const match = file.content?.match(/const developerProfile = ({[\s\S]*?});/);
    if (!match) return renderContent();

    const developerData = eval(`(${match[1]})`);

    const ListItem = ({ text, color }: { text: string; color: string }) => (
      <li className="flex items-center gap-2 p-1 rounded">
        <span className={`w-2.5 h-2.5 rounded-full ${color}`}></span>
        <span>{text}</span>
      </li>
    );

    return (
      <div className="space-y-6">

        {/* Basic Info */}
        <div className="content-card retro-border-cyan">
          <h2 className="text-2xl font-bold text-neon-cyan mb-1">{developerData.name}</h2>
          <p className="text-lg text-neon-purple">{developerData.role}</p>
          <p className="text-muted-foreground">{developerData.location}</p>
        </div>

        {/* Interests */}
        <div className="content-card border-l-4 border-neon-cyan pl-4">
          <h3 className="text-xl font-bold text-neon-pink mb-3">Interests & Passions</h3>
          <ul className="space-y-1 text-sm text-foreground">
            {developerData.interests.map((interest: string, i: number) => (
              <ListItem key={i} text={interest} color="bg-neon-pink" />
            ))}
          </ul>
        </div>

        {/* Currently Learning */}
        <div className="content-card border-l-4 border-neon-cyan pl-4">
          <h3 className="text-xl font-bold text-neon-green mb-3">Currently Learning</h3>
          <ul className="space-y-1 text-sm text-foreground">
            {developerData.learning.map((item: string, i: number) => (
              <ListItem key={i} text={item} color="bg-neon-green" />
            ))}
          </ul>
        </div>

        {/* Connections */}
        <div className="content-card border-l-4 border-neon-cyan pl-4">
          <h3 className="text-xl font-bold text-neon-blue mb-3">Connections</h3>
          <ul className="space-y-1 text-sm text-foreground">
            {developerData.connections.map((conn: string, i: number) => (
              <ListItem key={i} text={conn} color="bg-neon-blue" />
            ))}
          </ul>
        </div>

        {/* Fun Facts */}
        <div className="content-card border-l-4 border-neon-cyan pl-4">
          <h3 className="text-xl font-bold text-neon-pink mb-3">Fun Facts</h3>
          <ul className="space-y-1 text-sm text-foreground">
            {developerData.funFacts.map((fact: string, i: number) => (
              <ListItem key={i} text={fact} color="bg-neon-pink" />
            ))}
          </ul>
        </div>
      </div>
    );
  } catch (error) {
    return renderContent();
  }
};





  // Render enhanced experience content with timeline
const renderExperienceContent = (file: FileItem) => {
  if (!file.content) return null;

  try {
    const fullStackMatch = file.content.match(/const fullStackIntern\s*=\s*({[\s\S]*?});/);
    const softwareDevMatch = file.content.match(/const softwareDevInternLogicspice\s*=\s*({[\s\S]*?});/);
    const frontendDiagnokareMatch = file.content.match(/const frontendInternDiagnokare\s*=\s*({[\s\S]*?});/);
    const certificationsMatch = file.content.match(/const certifications\s*=\s*(\[[\s\S]*?\]);/);

    if (!fullStackMatch || !softwareDevMatch || !frontendDiagnokareMatch || !certificationsMatch) {
      return renderContent();
    }

    const fullStackIntern = eval(`(${fullStackMatch[1]})`);
    const softwareDevInternLogicspice = eval(`(${softwareDevMatch[1]})`);
    const frontendInternDiagnokare = eval(`(${frontendDiagnokareMatch[1]})`);
    const certifications = eval(`(${certificationsMatch[1]})`);

    const work = [
  { name: "Full Stack Intern", data: fullStackIntern },
  { name: "Software Development Intern", data: softwareDevInternLogicspice },
  { name: "Frontend Intern", data: frontendInternDiagnokare }
];

    return (
      <div className="space-y-6">
        {/* Work Experience */}
        <div>
          <h2 className="text-xl font-bold text-neon-green mb-4">
            Work Experience
          </h2>
          <div className="timeline">
            {work.map((job) => (
              <div key={job.data.id} className="timeline-item">
                <div className="content-card retro-border border-l-4 border-cyan-400/70 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-neon-cyan">
                      {job.name}
                    </h3>
                    <span className="text-sm text-neon-pink retro-border-pink px-2 py-1 rounded">
                      {job.data.duration}
                    </span>
                  </div>
                  <p className="text-neon-purple font-medium">
                    {job.data.company} • {job.data.location}
                  </p>
                  <p className="text-muted-foreground mt-2">{job.data.description}</p>

                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-neon-green mb-2">
                      Key Responsibilities:
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {job.data.responsibilities.map((resp: string, i: number) => (
                        <li key={i} className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.data.technologies.map((tech: string, i: number) => (
                      <span
                        key={i}
                        className="text-xs retro-border-blue text-neon-blue px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h2 className="text-xl font-bold text-neon-pink mb-4">
            Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert: any, index: number) => (
              <div
                key={index}
                className="content-card retro-border border-l-4 border-cyan-400/70 pl-4"
              >
                <h3 className="font-semibold text-neon-cyan">{cert.name}</h3>
                <p className="text-neon-purple text-sm">{cert.issuer}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-primary text-sm">{cert.date}</span>
                  <span className="text-xs retro-border-green text-neon-green px-2 py-1 rounded">
                    {cert.credential}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return renderContent();
  }
};



  // Enhanced content renderer with visual components
  const renderEnhancedContent = (file: FileItem) => {
    if (!enhancedView || !file.content) {
      return renderContent();
    }

    if (file.name === 'experience.js') {
      return renderExperienceContent(file);
    } else if (file.name === 'skills.js') {
      return renderSkillsContent(file);
    } else if (file.name === 'projects.js') {
      return renderProjectsContent(file);
    } else if (file.name === 'about.js') {
      return renderAboutContent(file);
    }

    return renderContent();
  };

  return (
    <div className="h-full bg-editor-bg overflow-auto">
      <div className="p-6">
        <div className="flex items-center mb-4 pb-2 ">
          <span className="text-lg">
            {file.language === 'javascript' ?( <img src="/icons/javascript.svg" alt="JavaScript" className="inline w-5 h-5" />) : 
             file.language === 'markdown' ? '📝' : '📄'}
          </span>
          {/* <h1 className="ml-2 text-lg font-semibold text-primary">
            {file.name}
          </h1> */}
          <span className="ml-auto text-xs text-muted-foreground uppercase">
            {file.language || 'text'}
          </span>
        </div>
        
        <div className="font-mono break-words">

          {renderEnhancedContent(file)}
        </div>
      </div>
    </div>
  );
};