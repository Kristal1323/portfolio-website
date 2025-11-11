# Kristal Sin — Interactive Terminal Portfolio  
[**View Live**](https://kristal-sin-portfolio.vercel.app)

An immersive, **terminal-themed portfolio** built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**.  
Visitors are greeted by a cinematic boot sequence and a neon-lit terminal where they can explore Kristal’s background, skills, and projects using real-time commands—plus an IDE-style project viewer and in-terminal contact form.

---

## Highlights

- **Cinematic boot + terminal UI** — Mac-style chrome, neon text, and smooth Framer-Motion animations.  
- **Command-palette experience** — `whoami`, `skills`, `experience`, `projects`, `socials`, and more via a dynamic command registry.  
- **IDE-inspired project viewer** — Opens a faux VS Code layout with embedded live previews.  
- **EmailJS-powered messaging** — Users can send a message directly inside the terminal (`message` command).  
- **Animated circuit background** — GPU-accelerated SVG/canvas hybrid that keeps the UI lively without compromising performance.

---

## Tech Stack

| Layer            | Tools |
| ---------------- | ----- |
| Framework        | Next.js 16 (App Router) + React 19 |
| Styling          | Tailwind CSS 4, custom CSS variables |
| Animation        | Framer Motion |
| Icons / Graphics | `react-icons`, custom circuit canvas |
| Data / State     | React Hooks, TanStack Query |
| Messaging        | EmailJS Browser SDK |

---

## Terminal Commands

| Command       | Description |
| --------------|-------------|
| `whoami`      | Intro section with education, summary, and animated coursework. |
| `help`        | Lists all available terminal commands. |
| `skills`      | Categorized skill badges with subtle animation. |
| `experience`  | Timeline of BHP rotations with expandable detail. |
| `projects`    | Launches IDE-style project explorer with previews. |
| `socials`     | Links to LinkedIn, GitHub, and email. |
| `resume`      | Opens the hosted PDF resume. |
| `backlog`     | Displays ongoing and queued initiatives. |
| `message`     | EmailJS contact form inside the terminal. |
| `quit`        | Triggers a cinematic outro animation. |

Unrecognized commands display a `command not found` message for authentic shell behavior.

