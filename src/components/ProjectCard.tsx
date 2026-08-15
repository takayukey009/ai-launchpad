import React, { useRef } from 'react';
import { ExternalLink, Info, Wrench, Presentation, Gamepad2, Globe, Bot, Sparkles, Star } from 'lucide-react';
import type { Project, ProjectCategory } from '../types/project';

interface ProjectCardProps {
  project: Project;
  onSelectProject: (p: Project) => void;
  onTagClick: (tag: string) => void;
}

const CategoryIconMap: Record<ProjectCategory, React.ComponentType<{ size?: number; color?: string }>> = {
  tool: Wrench,
  slide: Presentation,
  game: Gamepad2,
  lp: Globe,
  'ai-agent': Bot,
  experiment: Sparkles
};

// Generative Background Gradients by Category
const CategoryGradients: Record<ProjectCategory, string> = {
  tool: 'linear-gradient(135deg, #09203f 0%, #537895 100%)',
  slide: 'linear-gradient(135deg, #2e0854 0%, #7928ca 100%)',
  game: 'linear-gradient(135deg, #3a002c 0%, #b8006b 100%)',
  lp: 'linear-gradient(135deg, #0d2b45 0%, #203c56 100%)',
  'ai-agent': 'linear-gradient(135deg, #052e16 0%, #065f46 100%)',
  experiment: 'linear-gradient(135deg, #451a03 0%, #78350f 100%)'
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelectProject,
  onTagClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const IconComponent = CategoryIconMap[project.category] || Sparkles;

  // Mouse move handler for dynamic card spotlight effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      className="project-card"
      onMouseMove={handleMouseMove}
      onClick={() => onSelectProject(project)}
    >
      {/* Dynamic Cursor Spotlight Layer */}
      <div className="spotlight" />

      {/* Visual Header / Thumbnail Area */}
      <div className="card-visual">
        {project.thumbnail ? (
          <img src={project.thumbnail} alt={project.title} loading="lazy" />
        ) : (
          <div
            className="card-visual-art"
            style={{ background: CategoryGradients[project.category] }}
          >
            <div className="card-visual-grid" />
            <div className="card-visual-icon">
              <IconComponent size={28} color="#ffffff" />
            </div>
          </div>
        )}

        <div className="card-top-overlay">
          <div className="card-number-badge">
            {project.number}
          </div>

          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {project.starred && (
              <span
                style={{
                  background: 'rgba(245, 158, 11, 0.2)',
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                  padding: '3px 6px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title="Featured Project"
              >
                <Star size={12} color="#fbbf24" fill="#fbbf24" />
              </span>
            )}
            <div className={`status-pill ${project.status}`}>
              <span className={`status-dot ${project.status === 'live' ? 'pulse' : ''}`} />
              <span>{project.status.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="card-body">
        <div className="card-title-row">
          <h3 className="card-title">{project.title}</h3>
        </div>

        <p className="card-desc">{project.description}</p>

        {/* Tags */}
        <div className="card-tags">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="card-tag"
              onClick={(e) => {
                e.stopPropagation();
                onTagClick(tag);
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="card-footer" onClick={(e) => e.stopPropagation()}>
        <div className="card-meta-ai">
          <span style={{ color: 'var(--accent-cyan)' }}>AI:</span>
          <span>{project.aiTools[0] || 'Claude / GPT'}</span>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            type="button"
            className="btn-ghost"
            style={{ padding: '5px 8px', fontSize: '12px' }}
            onClick={() => onSelectProject(project)}
            title="詳細を見る"
          >
            <Info size={14} />
            <span>詳細</span>
          </button>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card-action-btn"
            title="サブドメインを開く"
          >
            <span>起動</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
};
