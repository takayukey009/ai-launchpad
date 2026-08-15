import React from 'react';
import { ExternalLink, Sparkles, Wrench, Presentation, Gamepad2, Globe, Bot, Star, ArrowUpRight } from 'lucide-react';
import type { Project, ProjectCategory } from '../types/project';
import { CATEGORY_LABELS } from '../data/projects';

interface BentoGridProps {
  projects: Project[];
  onSelectProject: (p: Project) => void;
}

const CategoryIconMap: Record<ProjectCategory, React.ComponentType<{ size?: number; color?: string }>> = {
  tool: Wrench,
  slide: Presentation,
  game: Gamepad2,
  lp: Globe,
  'ai-agent': Bot,
  experiment: Sparkles
};

export const BentoGrid: React.FC<BentoGridProps> = ({ projects, onSelectProject }) => {
  return (
    <div className="bento-grid">
      {projects.map((project, idx) => {
        const Icon = CategoryIconMap[project.category] || Sparkles;
        const isFeatured = project.starred || idx === 0;

        return (
          <div
            key={project.id}
            className={`bento-card ${isFeatured ? 'featured' : ''}`}
            onClick={() => onSelectProject(project)}
          >
            <div>
              <div className="bento-card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div className="item-icon-box" style={{ width: '36px', height: '36px', borderRadius: '10px' }}>
                    <Icon size={18} color={CATEGORY_LABELS[project.category]?.color || '#5e6ad2'} />
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                      {project.number}
                    </span>
                    <div style={{ fontSize: '11px', color: CATEGORY_LABELS[project.category]?.color || '#5e6ad2', fontWeight: 600 }}>
                      {CATEGORY_LABELS[project.category]?.label}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  {project.starred && <Star size={14} color="#fbbf24" fill="#fbbf24" />}
                  <div className={`status-indicator ${project.status}`}>
                    <span className={`pulse-dot ${project.status === 'live' ? 'anim' : ''}`} />
                    <span>{project.status}</span>
                  </div>
                </div>
              </div>

              <h3 className="bento-card-title">{project.title}</h3>
              <p className="bento-card-desc">{project.description}</p>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {project.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: '10px',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: 'var(--bg-surface-3)',
                      color: 'var(--text-muted)'
                    }}
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-surface"
                style={{ padding: '4px 8px', fontSize: '11px', gap: '4px' }}
                onClick={(e) => e.stopPropagation()}
              >
                <span>Launch</span>
                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};
