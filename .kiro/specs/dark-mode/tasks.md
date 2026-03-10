# Implementation Plan: Dark Mode Feature

## Overview

This plan implements a dark mode toggle feature for the AWS Amplify Gen2 todo application. The implementation uses Tailwind CSS v4's theming capabilities with React Context for state management, localStorage for persistence, and system theme detection for default behavior.

## Tasks

- [x] 1. Set up theme infrastructure and CSS tokens
  - Create Tailwind v4 theme tokens in `src/index.css` with light and dark color schemes
  - Define CSS custom properties for backgrounds, text, borders, and primary colors
  - Add CSS transitions for smooth theme switching (300ms duration)
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 4.1, 4.2, 4.3, 4.4, 6.1, 6.2, 6.3_

- [x] 2. Implement ThemeProvider and context
  - [x] 2.1 Create ThemeContext with React Context API
    - Define `ThemeContextType` interface with theme state and toggleTheme function
    - Implement `ThemeProvider` component in `src/contexts/ThemeContext.tsx`
    - Add localStorage helper functions with error handling (try-catch wrappers)
    - Implement system theme detection using `matchMedia` API
    - Apply theme class to `document.documentElement` on state changes
    - Set up system theme change listener (only when no user preference exists)
    - Export `useTheme` hook for consuming theme context
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 5.1, 5.2, 5.3_

  - [ ]* 2.2 Write property test for theme persistence round trip
    - **Property 2: Theme Persistence Round Trip**
    - **Validates: Requirements 2.1, 2.3**

  - [ ]* 2.3 Write property test for stored preference overrides system theme
    - **Property 3: Stored Preference Overrides System Theme**
    - **Validates: Requirements 2.3, 5.3**

  - [ ]* 2.4 Write property test for system theme change conditional update
    - **Property 4: System Theme Change Conditional Update**
    - **Validates: Requirements 5.3**

- [x] 3. Create ThemeToggle component
  - [x] 3.1 Implement toggle button UI component
    - Create `ThemeToggle` component in `src/components/ThemeToggle.tsx`
    - Use `useTheme` hook to access theme state and toggle function
    - Render button with sun/moon icon based on current theme
    - Add click handler to call `toggleTheme`
    - Include keyboard accessibility (button element with proper focus handling)
    - Add ARIA label for screen readers
    - Style with Tailwind classes (40x40px circular button with hover state)
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

  - [ ]* 3.2 Write property test for theme toggle icon consistency
    - **Property 1: Theme Toggle Icon Consistency**
    - **Validates: Requirements 1.3**

  - [ ]* 3.3 Write unit tests for ThemeToggle component
    - Test sun icon renders in light mode
    - Test moon icon renders in dark mode
    - Test button is keyboard accessible
    - Test ARIA label is present
    - _Requirements: 1.3, 1.4_

- [x] 4. Integrate ThemeProvider into application
  - Wrap `Authenticator` component with `ThemeProvider` in `src/main.tsx`
  - Ensure ThemeProvider is at the root level (above Authenticator)
  - Verify theme context is accessible throughout component tree
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [x] 5. Add ThemeToggle to application header
  - [x] 5.1 Create or modify header component in App.tsx
    - Add header section to `App.tsx` if not present
    - Import and render `ThemeToggle` component in header
    - Position toggle button in top-right corner
    - Ensure header is visible on all pages
    - _Requirements: 1.1_

  - [ ]* 5.2 Write unit tests for header integration
    - Test ThemeToggle is rendered in header
    - Test header is visible on app load
    - _Requirements: 1.1_

- [x] 6. Apply theme tokens to existing components
  - Update `src/App.tsx` to use theme tokens for backgrounds, text, and borders
  - Update `src/index.css` to apply theme tokens to body and root elements
  - Replace hardcoded colors with Tailwind classes that reference theme tokens
  - Ensure todo list items, input fields, and buttons use theme-aware colors
  - _Requirements: 7.2, 7.3, 7.4_

- [x] 7. Style Amplify Authenticator for dark mode
  - Add CSS overrides for Amplify UI components in `src/index.css`
  - Target Authenticator component classes with `.dark` selector
  - Apply theme tokens to authentication forms, buttons, and inputs
  - Test sign-in and sign-up flows in both themes
  - _Requirements: 7.1_

- [ ] 8. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Test theme transitions and edge cases
  - [ ]* 9.1 Write unit tests for ThemeProvider initialization
    - Test applies stored theme from localStorage on mount
    - Test falls back to system theme when no stored preference
    - Test defaults to light theme when matchMedia unavailable
    - _Requirements: 2.2, 2.3, 2.4, 5.1, 5.2_

  - [ ]* 9.2 Write unit tests for theme toggle functionality
    - Test clicking toggle switches from light to dark
    - Test clicking toggle switches from dark to light
    - Test toggle updates localStorage on change
    - Test toggle applies correct class to document.documentElement
    - _Requirements: 1.2, 2.1_

  - [ ]* 9.3 Write unit tests for error handling
    - Test handles localStorage unavailable gracefully
    - Test handles localStorage quota exceeded
    - Test handles invalid stored theme values
    - Test handles missing matchMedia API
    - _Requirements: 2.1, 5.1_

  - [ ]* 9.4 Write unit tests for system theme detection
    - Test detects dark system preference correctly
    - Test detects light system preference correctly
    - Test listens for system theme changes
    - Test ignores system changes when user preference exists
    - _Requirements: 5.1, 5.2, 5.3_

- [ ] 10. Final checkpoint - Verify complete functionality
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests validate universal correctness properties using fast-check
- Unit tests validate specific examples and edge cases using Vitest
- The implementation uses TypeScript throughout, consistent with the existing codebase
- Tailwind CSS v4's `@theme` directive is used for defining color tokens
- React Context API provides theme state management without external dependencies
- localStorage provides persistence with graceful error handling fallbacks
