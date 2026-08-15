import React, { useState, useRef, useEffect } from 'react';
import type { Project } from '../types/project';

interface TerminalViewProps {
  projects: Project[];
  onOpenDeployGuide: () => void;
  onOpenAddModal: () => void;
}

export const TerminalView: React.FC<TerminalViewProps> = ({
  projects,
  onOpenDeployGuide,
  onOpenAddModal
}) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ text: string; isCmd?: boolean; color?: string }>>([
    { text: 'NEXUS MATRIX CLI v2.4.0 [Cloudflare Edge Connected]', color: '#5e6ad2' },
    { text: 'Type "help" to see available terminal commands or "list" to index all apps.', color: '#949cae' }
  ]);

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalBodyRef.current?.scrollTo({ top: terminalBodyRef.current.scrollHeight, behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    const newHist = [...history, { text: `$ ${cmd}`, isCmd: true }];
    const parts = cmd.toLowerCase().split(' ');
    const main = parts[0];
    const arg = parts.slice(1).join(' ');

    switch (main) {
      case 'help':
        newHist.push(
          { text: 'Available Commands:', color: '#00f2fe' },
          { text: '  list                - List all active AI creations' },
          { text: '  open <name|number>  - Launch subdomain in new tab (e.g. "open diff-lab" or "open 1")' },
          { text: '  status              - Check Cloudflare edge latency & service health' },
          { text: '  deploy              - Open Cloudflare deployment guide' },
          { text: '  new                 - Register a new AI service' },
          { text: '  clear               - Clear terminal output' }
        );
        break;

      case 'list':
        newHist.push({ text: `=== REGISTERED AI SERVICES (${projects.length}) ===`, color: '#00f2fe' });
        projects.forEach((p) => {
          newHist.push({
            text: `[${p.number}] ${p.title.padEnd(24)} -> ${p.url} (${p.status.toUpperCase()})`
          });
        });
        break;

      case 'open':
        if (!arg) {
          newHist.push({ text: 'Error: Please specify service name or number (e.g. "open 1" or "open diff")', color: '#ff6363' });
        } else {
          const match = projects.find((p) =>
            p.number.toLowerCase().includes(arg) ||
            p.id.toLowerCase().includes(arg) ||
            p.title.toLowerCase().includes(arg)
          );
          if (match) {
            newHist.push({ text: `Launching ${match.title} (${match.url})...`, color: '#10b981' });
            window.open(match.url, '_blank');
          } else {
            newHist.push({ text: `Error: No matching project found for "${arg}"`, color: '#ff6363' });
          }
        }
        break;

      case 'status':
        newHist.push(
          { text: '● Cloudflare Global CDN: HEALTHY', color: '#10b981' },
          { text: '● Edge Roundtrip Latency: 18ms' },
          { text: `● Active Domains: ${projects.length} / ${projects.length} (100% Operational)` }
        );
        break;

      case 'deploy':
        onOpenDeployGuide();
        newHist.push({ text: 'Opening Cloudflare Deployment Modal...', color: '#5e6ad2' });
        break;

      case 'new':
        onOpenAddModal();
        newHist.push({ text: 'Opening New Service Registration Modal...', color: '#5e6ad2' });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        newHist.push({ text: `Command not found: "${cmd}". Type "help" for a list of commands.`, color: '#ff6363' });
    }

    setHistory(newHist);
    setInput('');
  };

  return (
    <div className="terminal-window" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-header">
        <div className="terminal-dots">
          <div className="t-dot red" />
          <div className="t-dot yellow" />
          <div className="t-dot green" />
        </div>
        <span style={{ fontSize: '11px', color: '#5e6678' }}>
          nexus-cli ~ bash --edge-connected
        </span>
        <span style={{ fontSize: '11px', color: '#5e6ad2' }}>
          PORT 5173
        </span>
      </div>

      <div ref={terminalBodyRef} className="terminal-body">
        {history.map((h, i) => (
          <div key={i} style={{ color: h.color || (h.isCmd ? '#f0f2f5' : '#8b949e'), lineHeight: '1.6' }}>
            {h.text}
          </div>
        ))}

        <form onSubmit={handleCommand} className="terminal-command-line">
          <span style={{ color: '#00f2fe' }}>❯</span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-input"
            placeholder="Type 'list', 'open <name>', 'status' or 'help'..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};
