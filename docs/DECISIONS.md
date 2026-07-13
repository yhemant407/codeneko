# Development Guidelines

Never implement multiple features simultaneously.

Always test after each change.

One file at a time.

One feature at a time.

Never commit broken code.

Document every architectural decision.

Avoid platform-specific hacks unless documented.

Keep React components small.

Prefer composition over large files.

Never merge untested animation changes.

## 2026-07-13

### Decision

Replace the standard Tauri WebviewWindow with a native macOS NSPanel.

### Reason

A standard Tauri window could not reliably stay above fullscreen applications.

NSPanel provides the required macOS window behavior while preserving transparency, dragging, and animations.
