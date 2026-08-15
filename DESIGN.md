# NEXUS AI Launchpad // DESIGN.md

> Visual System & Interaction Specification inspired by VoltAgent, Raycast, Linear, and Vercel.

## 1. Visual Atmosphere & Philosophy

- **Theme**: Void-core Dark with Hyper-refined Precision (Deep obsidian backgrounds `#050608` with subtle border glows and sub-pixel dot matrix).
- **Inspiration**: Raycast Command Center, Linear Issue Browser, VoltAgent CLI & Vercel Bento Grid.
- **Micro-Interactions**: Keyboard-first rapid navigation (`↑`/`↓` selection, `Enter` to Launch, `Space` for quick-inspect, `C` to copy subdom URL, `⌘K` command menu).

---

## 2. Color Palette & Tokens

```css
/* Core Surfaces */
--bg-void: #050608;
--bg-surface-1: #0b0d13;
--bg-surface-2: #12151e;
--bg-surface-3: #191d2a;

/* Borders & Glows */
--border-dim: rgba(255, 255, 255, 0.06);
--border-subtle: rgba(255, 255, 255, 0.1);
--border-focus: rgba(94, 106, 210, 0.6);

/* Accents */
--accent-linear: #5e6ad2;       /* Electric Indigo */
--accent-raycast: #ff6363;      /* Raycast Coral */
--accent-cyan: #00f2fe;         /* Edge Cyber Cyan */
--accent-emerald: #10b981;      /* Live Pulse */
--accent-purple: #a855f7;       /* Creative AI */
```

---

## 3. Typography & Hierarchy

- **UI Headings**: `Space Grotesk` (700/800 bold, tight letter-spacing)
- **Body & Controls**: `Outfit` / Inter (Clean, geometric, highly legible)
- **Code & Status**: `JetBrains Mono` (Pill badges, ping metrics, keyboard shortcuts)

---

## 4. Key Components & Modes

1. **Command Launcher View (Split Pane)**:
   - High-density keyboard navigable list + live rich inspection side pane.
   - Quick action bar at the bottom with keyboard shortcut keys.
2. **Bento Grid View**:
   - Asymmetric cards highlighting featured creations, metrics, and technology chips.
3. **Terminal Matrix View (CLI)**:
   - Developer-grade shell capable of typing `open <project>`, `ping`, `status`, `list`.
