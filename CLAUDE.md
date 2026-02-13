# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What is this

nycklar is a tiny keyboard shortcut library for the browser, inspired by tinykeys. It listens for key sequences (single keys, sequences like "abc", or modifier combos like "Shift+D") and fires callbacks. Returns a cleanup function for unsubscribing.

## Commands

- `pnpm test` - run tests (vitest, jsdom environment)
- `pnpm test:watch` - run tests in watch mode
- `pnpm build` - build with tsdown (ESM only, minified, outputs to dist/)
- `pnpm lint` - lint with biome (src/ only)
- `pnpm lint:fix` - lint and auto-fix
- `pnpm format` - format with biome
- `pnpm playground` - run the Vite-based playground app

## Architecture

Single-file library: `src/index.ts` exports `nycklar()`. Tests in `src/index.test.ts`.

The `playground/` directory is a separate pnpm workspace with a Vite+React app for interactive testing.

## Code style

- Biome for linting/formatting: tabs, 4-width indent (configured in biome.json)
- ESM only (`"type": "module"`)
- Types defined inline (interfaces/types above the functions that use them)
- Named exports only
