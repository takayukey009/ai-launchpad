import React from 'react';
import { X, ExternalLink, CheckCircle2, Lightbulb, Globe, Calendar } from 'lucide-react';
import type { Project } from '../types/project';
import { CATEGORY_LABELS } from '../data/projects';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onTagClick: (tag: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onTagClick
}) => {
  if (!project) return null;

  const catInfo = CATEGORY_LABELS[project.category];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="card-number-badge">{project.number}</span>
            <span
              style={{
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
                color: catInfo.color,
                fontWeight: 600
              }}
            >
              [{catInfo.label}]
            </span>
            <div className={`status-pill ${project.status}`}>
              <span className={`status-dot ${project.status === 'live' ? 'pulse' : ''}`} />
              <span>{project.status.toUpperCase()}</span>
            </div>
          </div>

          <button type="button" className="btn-ghost" onClick={onClose} style={{ padding: '6px' }}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>
              {project.title}
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              {project.description}
            </p>
          </div>

          {/* Quick Launch Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 18px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '12px',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-accent)' }}>
              <Globe size={18} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>{project.url}</span>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '12px' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                  <span>GitHub</span>
                </a>
              )}
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ padding: '8px 16px', fontSize: '13px' }}
              >
                <span>今すぐ開く</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Features Checklist */}
          {project.features && project.features.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h4 style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', letterSpacing: '0.05em' }}>
                HIGHLIGHTS & FEATURES
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {project.features.map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: 'var(--text-main)' }}>
                    <CheckCircle2 size={16} color="var(--accent-emerald)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Prompt Notes / Creation Story */}
          {project.promptNotes && (
            <div
              style={{
                padding: '16px',
                background: 'rgba(99, 102, 241, 0.08)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-accent)', fontSize: '12px', fontWeight: 600 }}>
                <Lightbulb size={16} />
                <span>AI作成メモ & プロンプトTips</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                {project.promptNotes}
              </p>
            </div>
          )}

          {/* Metadata Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '12px',
              paddingTop: '12px',
              borderTop: '1px solid var(--border-subtle)'
            }}
          >
            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>AI TOOLS</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                {project.aiTools.map((tool) => (
                  <span
                    key={tool}
                    style={{
                      fontSize: '11px',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: 'rgba(6, 182, 212, 0.1)',
                      color: 'var(--accent-cyan)',
                      border: '1px solid rgba(6, 182, 212, 0.2)'
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>CREATED DATE</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', fontSize: '13px', color: 'var(--text-muted)' }}>
                <Calendar size={14} />
                <span>{project.createdAt}</span>
              </div>
            </div>
          </div>

          {/* Tag Cloud in Modal */}
          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>TAGS</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
              {project.tags.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  className="tag-chip"
                  onClick={() => {
                    onTagClick(tag);
                    onClose();
                  }}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
