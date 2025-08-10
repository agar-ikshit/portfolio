import { Github, Linkedin, Mail, Code } from 'lucide-react';

export const SocialLinks = () => {
  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      url: 'https://github.com/ikshit12',
      color: 'text-neon-cyan'
    },
    {
      icon: Code,
      label: 'LeetCode',
      url: 'https://leetcode.com/u/dullescence/',
      color: 'text-neon-green'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/ikshit12',
      color: 'text-neon-purple'
    },
    {
      icon: Mail,
      label: 'Email',
      url: 'mailto:ikshitagarwa@gmail.com',
      color: 'text-neon-pink'
    }
  ];

  return (
    <div className="border-t border-border mt-auto pt-4">
      <div className="px-3 mb-2">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Connect
        </h3>
      </div>
      <div className="space-y-1">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              flex items-center px-3 py-1.5 text-sm social-link
              rounded-md mx-2 retro-border ${link.color}
            `}
            title={link.label}
          >
            <link.icon className="w-4 h-4 mr-2" />
            <span>{link.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};