<div align="center">

# CodeNeko

_A modern desktop companion built with Rust, Tauri and React._

<img alt="Platform" src="https://img.shields.io/badge/platform-macOS-blue">
<img alt="Tauri" src="https://img.shields.io/badge/Tauri-2.x-24C8DB">
<img alt="React" src="https://img.shields.io/badge/React-19-61DAFB">
<img alt="Rust" src="https://img.shields.io/badge/Rust-1.89-orange">

</div>

---

## About

CodeNeko is a desktop companion inspired by the classic Neko desktop pet and modern projects like BongoCat.

Unlike a simple animated image, CodeNeko is designed to feel alive. It reacts to user activity with smooth animations and natural behaviors while staying lightweight and non-intrusive.

The long-term goal is to create a polished cross-platform desktop companion with expressive animations and intelligent interactions.

---

## Current Features

- Transparent desktop pet
- Native macOS **NSPanel** architecture
- Appears above **fullscreen applications**
- Draggable anywhere on the screen
- Cursor tracking
- Automatically faces left/right
- Eye highlights follow the cursor
- Random blinking
- Idle breathing animation
- Sleeping animation
- Animated ZZZ effect

---

## Upcoming Features

- Global typing detection
- Typing animation
- Walking animation
- Follow cursor
- Curious idle behaviour
- Tail and ear movement
- Settings window
- Theme support
- Multiple pets

---

## Tech Stack

### Frontend

- React
- TypeScript
- CSS

### Backend

- Rust
- Tauri 2

### Native macOS

- NSPanel
- AppKit

---

## Project Structure

```text
CodeNeko/

├── src/
│   ├── assets/
│   ├── components/
│   ├── App.tsx
│   └── App.css
│
├── src-tauri/
│   ├── src/
│   ├── capabilities/
│   ├── Cargo.toml
│   └── tauri.conf.json
│
├── docs/
│   ├── Architecture.md
│   ├── CHANGELOG.md
│   ├── TODO.md
│   ├── DECISIONS.md
│   └── CONTRIBUTING.md
│
└── README.md
```

---

## Running the Project

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/CodeNeko.git
```

Install dependencies:

```bash
npm install
```

Run the application:

```bash
npm run tauri dev
```

---

## Roadmap

### Version 0.1

- Fullscreen desktop pet
- Sleeping animation
- Eye tracking
- Cursor tracking

### Version 0.2

- Native keyboard detection
- Typing animation

### Version 0.3

- Walking
- Cursor following

### Version 0.4

- Personality system
- Random behaviours

### Version 1.0

- Stable cross-platform desktop companion

---

## Documentation

Project documentation is available in the `docs/` folder.

- Architecture
- Changelog
- TODO
- Development Decisions
- Contribution Guide

---

## Contributing

Contributions, suggestions and ideas are welcome.

If you find a bug or have an idea for a new behaviour, feel free to open an issue.

---

## License

This project is currently under development.

A license will be added before the first stable release.

---

<div align="center">

Built with ❤️ using Rust, Tauri and React.

</div>
