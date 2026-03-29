# Workforce Skill Gap Analyzer

A responsive, frontend-only skill gap analysis system built with HTML, CSS, and JavaScript.

## Overview

This app compares employee skill sets against job role requirements, calculates skill gaps, and provides visual + actionable recommendations.

## Key Features

- SPA-like interface (no full-page reloads)
- Role-based login and access control
  - Login as `Admin` or `Normal User`
  - Admin and user have different allowed sections
- Login validation
  - Email format validation
  - Age validation (18+)
  - Credential check by selected role
- Employee skills module
  - Add/edit skills manually
  - Resume upload (PDF/DOCX)
  - Skill extraction with auto-fill of employee skills
- Job role module
  - Add required skills and levels
  - Load sample job profiles
- Gap analysis module
  - Gap score, gap percentage, missing skills
  - Progress bar + pie visualization
  - Auto suggestions after results
  - Suggested courses with clickable links for missing skills
- Reports module
  - Report table (employee, role, gap %, date)
  - Multi-color role coverage bars
  - CSV export
- UI/UX extras
  - Light and dark mode
  - Hover interactions in forms
  - Developer slider section with swipe + left/right buttons
  - Responsive footer with quick links, newsletter, and feedback form

## Role-Based Credentials

- Admin:
  - Email: `admin@gmail.com`
  - Password: `Admin@123`
- Normal User:
  - Email: `user@gmail.com`
  - Password: `User@123`

## Core Gap Logic

For each required skill:

- If employee has the skill:
  - `gap = max(0, requiredLevel - employeeLevel)`
- If employee does not have the skill:
  - `gap = requiredLevel`

Final metrics:

- `totalGapScore = sum(gap)`
- `maxScore = sum(requiredLevel)`
- `gapPercentage = (totalGapScore / maxScore) * 100`

## Resume Skill Extraction

- Supported formats: `.pdf`, `.docx`
- Libraries used:
  - `pdf.js` (PDF text extraction)
  - `mammoth.js` (DOCX text extraction)
- Extracted skills are inferred from:
  - common skill dictionary
  - role-required skills available in app data
- Detected skills are auto-filled into the employee skill form.

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- LocalStorage
- Canvas API
- pdf.js
- mammoth.js

## Project Structure

- `index.html` - page layout and sections
- `style.css` - theme, layout, responsiveness, UI components
- `script.js` - app state, CRUD logic, resume parsing, analysis, charts
- `images/` - developer images and static media

## Run Locally

1. Open `index.html` in a browser, or
2. Run with a static server (recommended), e.g. Five Server in VS Code.

No backend or build step is required.

## Notes

- All application data is stored in browser LocalStorage.
- Clearing browser storage resets roles/employees/reports.
- Resume extraction quality depends on actual text content in uploaded files.
- Scanned/image-only PDFs may require OCR (not included by default).

