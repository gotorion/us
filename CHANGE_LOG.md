# Change Log

All notable changes to this project will be documented in this file.

## [Unreleased]
### Added
- Created `data/timeline.json` to store timeline event data.
- Updated `app/page.tsx` to render a vertical timeline with alternating event nodes.
- Added modal functionality to zoom in on images when clicked.
- Initialized the change log to track project updates.

### Fixed
- Added `"use client"` directive to `app/page.tsx` to ensure `useState` works correctly.
