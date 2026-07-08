# Overview

This is an SPA built for a tech test. The single page should display different resources grouped by their category.
It displays grouped resources with title, thumbnail image, up to 3 tags, and read/watch time in minutes.

I have included the following optional features from the brief:

- When a user clicks on a resource, display all the resource data including the description and date uploaded
- Sort the cards by category/date
- Filter by tags

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
- Tailwind is used for styling because it was mentioned in the job description and keeps the styling fast to iterate on for this size of task.

## Implemented Features

- Resources are loaded from local JSON to simulate data returned from a GET request
- Resources are grouped by category on first load
- Resource cards show title, thumbnail, up to 3 tags, and duration
- Selecting a resource opens a modal with the full resource data
- Resources can be filtered by tag
- Resources can be sorted by newest date, oldest date, or category A-Z
- Unit tests cover utility logic and main component behaviour
- Playwright covers a key user journey through the app

I interpreted the filtering requirement as tag filtering for this version. Tags are visible on each card and provide a quick way to discover related resources across categories. Title search would be a logical next improvement if the dataset grew or the Resource Centre needed more free-text discovery.

## Future Improvements

- Move the data into a REST API
- Replace externally hosted thumbnail images with local or API-managed assets to avoid depending on third-party image availability
- Add title search as an additional filter option
- Add loading and error states around the resource fetch

## Getting Started

```bash
npm install
npm run dev
```

## Checks

```bash
npm run test:run
npm run lint
npm run build
npm run test:e2e
```

To run the Playwright test visually:

```bash
npx playwright test --ui
```
