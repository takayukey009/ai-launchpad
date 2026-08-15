import { useState, useEffect } from 'react';
import { TopChrome } from './components/TopChrome';
import { CommandLauncher } from './components/CommandLauncher';
import { BentoGrid } from './components/BentoGrid';
import { TerminalView } from './components/TerminalView';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { AddProjectModal } from './components/AddProjectModal';
import { UserManualModal } from './components/UserManualModal';
import { INITIAL_PROJECTS } from './data/projects';
import type { Project } from './types/project';

const STORAGE_KEY = 'togawa_ai_launchpad_v3';
const THEME_KEY = 'togawa_theme_mode';

export function App() {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem(THEME_KEY);
    return saved !== 'light';
  });

  // View mode: 'launcher' (Raycast/Linear) | 'bento' (Vercel) | 'terminal' (VoltAgent/Warp)
  const [viewMode, setViewMode] = useState<'launcher' | 'bento' | 'terminal'>('launcher');

  // Projects state
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PROJECTS;
  });

  // Modal states
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);

  // Sync theme
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem(THEME_KEY, 'dark');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem(THEME_KEY, 'light');
    }
  }, [isDark]);

  const handleAddProject = (newProject: Project) => {
    const updated = [newProject, ...projects];
    setProjects(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const nextNumber = `No.${(projects.length + 1).toString().padStart(3, '0')}`;

  return (
    <div className="app-shell">
      {/* Background Atmosphere Lights */}
      <div className="ambient-bg-layer">
        <div className="ambient-dot-grid" />
        <div className="ambient-aurora-1" />
        <div className="ambient-aurora-2" />
      </div>

      {/* Top Chrome Header */}
      <TopChrome
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenManualModal={() => setIsManualModalOpen(true)}
        totalProjects={projects.length}
      />

      {/* Main View Area */}
      <main style={{ marginTop: '8px' }}>
        {viewMode === 'launcher' && (
          <CommandLauncher
            projects={projects}
            onSelectProjectForModal={setActiveProject}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />
        )}

        {viewMode === 'bento' && (
          <BentoGrid
            projects={projects}
            onSelectProject={setActiveProject}
          />
        )}

        {viewMode === 'terminal' && (
          <TerminalView
            projects={projects}
            onOpenDeployGuide={() => setIsManualModalOpen(true)}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />
        )}
      </main>

      {/* Modals */}
      <ProjectDetailModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onTagClick={() => {}}
      />

      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProject={handleAddProject}
        nextNumber={nextNumber}
      />

      <UserManualModal
        isOpen={isManualModalOpen}
        onClose={() => setIsManualModalOpen(false)}
      />
    </div>
  );
}

export default App;
