# CodeNeko Architecture

Version: 0.1

Author: Hemant Kumar Yadav

---

# 1. Project Overview

## Project Name

CodeNeko

## Goal

CodeNeko is a desktop virtual pet inspired by Neko and BongoCat.

Unlike a simple desktop mascot, CodeNeko should feel alive.

The pet should:

- Stay above normal applications.
- Stay above fullscreen applications.
- React to the user's actions.
- Sleep when the user is idle.
- Wake up when the user interacts.
- Type when the user types.
- Eventually walk, chase the cursor and perform random behaviours.

The project is designed with extensibility in mind.

---

# 2. Technology Stack

Frontend

- React
- TypeScript
- CSS

Backend

- Rust
- Tauri 2

Platform

Current Target

- macOS (Apple Silicon)

Future Targets

- Windows
- Linux

---

# 3. Current Features

Implemented

✓ Transparent window

✓ Transparent PNG sprites

✓ Dragging

✓ Always on top

✓ Appears over fullscreen applications

✓ Cursor tracking

✓ Face left

✓ Face right

✓ Idle breathing animation

✓ Random blinking

✓ Sleeping

✓ Animated ZZZ

✓ Eye highlight follows cursor

Pending

- Typing animation

- Cursor follow

- Walking

- Curiosity behaviour

- Tail animation

- Ear animation

- Sounds

- Multiple themes

---

# 4. Folder Structure

src/

    App.tsx

    App.css

    components/

        PetSprite.tsx

    assets/

        cat/

            idle.png

            idle_eye_base.png

            idleBlink.png

            dragging.png

            sleeping.png

            zzz.png

---

src-tauri/

    Cargo.toml

    tauri.conf.json

    capabilities/

        default.json

    src/

        lib.rs

---

# 5. State Machine

Current

IDLE

↓

BLINK

↓

IDLE

↓

SLEEP

↓

DRAGGING

↓

IDLE

Future

IDLE

↓

TYPING

↓

IDLE

IDLE

↓

CURIOUS

↓

FOLLOW CURSOR

↓

IDLE

IDLE

↓

PLAY

↓

IDLE

---

# 6. Animation System

## Idle

Purpose

Cat should never appear completely static.

Animation

idle-alive

Properties

translateY

small rotation

slight scale

Duration

3 seconds

---

## Blink

Trigger

Random interval

Only active while IDLE

Uses

idleBlink.png

---

## Sleeping

Trigger

User inactive

Uses

sleeping.png

Additional Animation

Animated ZZZ

---

## Dragging

Trigger

Mouse drag

Uses

dragging.png

Cat turns depending on drag direction.

---

## Eyes

Current Implementation

The black eye never moves.

Only the small white highlight moves.

Reason

Moving the entire eye looked unnatural and frequently left the eye socket.

The white highlight creates a much more realistic illusion.

---

# 7. Cursor Tracking

Cursor Position

↓

Window Position

↓

Calculate Direction

↓

Face Left / Right

↓

Move Eye Highlight

Only the highlight moves.

---

# 8. Assets

idle.png

Purpose

Default sprite

---

idle_eye_base.png

Purpose

Idle sprite without eyes.

Used to render dynamic eyes.

---

idleBlink.png

Purpose

Blink animation

---

dragging.png

Purpose

Dragging state

---

sleeping.png

Purpose

Sleeping state

---

zzz.png

Purpose

Sleeping effect

---

# 9. Important Design Decisions

## Decision

Move only eye highlight.

Rejected

Move whole eye.

Reason

Looked unnatural.

---

Decision

Separate blinking sprite.

Reason

Higher quality.

---

Decision

Use PNG sprites.

Reason

Allows frame-by-frame animation.

---

Decision

Use transparent PNG.

Reason

Clean rendering.

---

Decision

One animation per state.

Reason

Easy maintenance.

---

# 10. macOS Window Architecture

Original Approach

Standard Tauri WebviewWindow

Problem

Did not appear over fullscreen applications.

Final Solution

Native NSPanel.

Important Properties

Status Level

CanJoinAllSpaces

FullScreenAuxiliary

Non-activating panel

Transparent

Always on top

Result

Works over fullscreen applications.

---

# 11. Rust Architecture

Responsibilities

Window creation

Platform-specific functionality

Global events

Future keyboard detection

Current Libraries

Tauri

tauri-nspanel

serde

Current Experimental

rdev

Planned Replacement

Quartz Event Tap

Reason

Better macOS integration.

---

# 12. React Architecture

App

↓

PetSprite

↓

Animation Logic

↓

Sprites

↓

Render

App.tsx

Responsible for

State

Cursor tracking

Window logic

Timers

PetSprite.tsx

Responsible for

Rendering

Sprite selection

Animations

Eyes

Blink

Sleep

---

# 13. Future Features

Priority

1.

Native keyboard detection

2.

Typing animation

3.

Walking animation

4.

Follow cursor

5.

Curiosity behaviour

6.

Random idle behaviours

7.

Settings window

8.

Theme support

9.

Multiple pets

10.

Plugin support

---

# 14. Known Issues

rdev currently conflicts with NSPanel after dragging.

Current investigation

Replace rdev with Quartz Event Tap.

---

# 15. Lessons Learned

Fullscreen overlays require native AppKit support.

NSPanel is more appropriate than a normal NSWindow.

Small iterative changes are easier to debug.

Static eye + moving highlight is more realistic.

Architecture decisions should be documented immediately.

---

# 16. Development Rules

These rules must be followed throughout the project.

1.

Only one feature at a time.

2.

Only one file at a time.

3.

Small testable changes.

4.

Never guess.

5.

Verify APIs before implementation.

6.

Never continue if the previous step is failing.

7.

Document important architecture decisions.

8.

Prefer stable native APIs over experimental workarounds.

9.

Maintain readable code.

10.

Every feature should have a clear state machine.

---

# 17. Project Vision

CodeNeko should not feel like a moving image.

It should feel like a small living companion.

Every behaviour should appear intentional.

Animations should be subtle.

The pet should never distract the user.

The goal is to create a polished desktop companion that naturally reacts to the user's activity.
