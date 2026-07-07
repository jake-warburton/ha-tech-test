# Overview

This is an SPA built for a tech test. The single page should display different resources grouped by their category.
I need to display the grouped resources with Title, Thumbnail image, Tags (max 3), Read/Watch time in minutes

I should add at least two of the following features:

- When a user clicks on a resource, display all the resource data including the description and date uploaded
- Sort the cards by category/date
- Filter by title/tags

### Categories

- Podcasts
- Articles
- Newsletters
- Recipes
- Fitness
- Meditation

## Decisions

- I chose Vite as a lightweight quick way to start a React App suitable for a small scope project like this
- I will use Vitest for my unit tests as it is a lightweight, fast and integrates well with Vite.
  I am more comfortable with Jest but I think the difference should be negligible.
- I will use Playwright for E2E testing to demonstrate my ability to write E2E tests in a technology mentioned on the job spec.
  I am comfortable writing Playwright from previous experience.
- TypeScript is expected for this task and I am comfortable with it.
- TDD approach, Red-Green-Refactor

## Future Improvements

- Move the data into a REST API
- Replace externally hosted thumbnail images with local or API-managed assets to avoid depending on third-party image availability

## Getting Started

```bash
npm install
npm run dev
```
