# Take-home Assignment Write-up

## Problem understanding

Merchants can usually see the final conversion rate of a popup campaign, but that number does not explain where users drop off inside a multi-step flow.

I understood the task as building a small marketer-facing analytics view that answers one main question clearly:

**Where does this popup campaign lose the most visitors?**

The goal was not to build a complete analytics platform, but to make step-level funnel performance easy to scan and understand.

## V1 scope

For the first version, I focused on a small but useful flow:

- show a list of campaigns
- allow the user to select one campaign
- show basic campaign metrics
- calculate conversion and drop-off for each funnel step
- highlight the step with the biggest drop-off
- show simple rule-based insights and recommendations

I intentionally left out authentication, a backend, database storage, editable campaigns, advanced filtering, and complex charts. Since the provided data is static, I wanted the v1 to stay clear, focused, and easy to review.

## Solution description

The app is built with Vue 3, Vite, and Tailwind CSS. The campaign data is stored as static JSON in `src/data/campaigns.json`.

The calculation logic is separated into utility functions in `src/utils/funnelMetrics.js`. This keeps the metric calculations independent from the UI components.

The main components are:

- `CampaignList.vue` for selecting a campaign
- `CampaignDetail.vue` for the selected campaign overview
- `FunnelStepCard.vue` for displaying each funnel step
- `InsightsPanel.vue` for collapsible recommendations

For each funnel step, the app calculates:

- step conversion rate
- drop-off rate
- number of visitors who dropped off

The problem step is selected by finding the step with the highest drop-off rate. This step is then highlighted in the summary, in the timeline, and in the step card.

I also added small UI details to improve readability for a non-technical marketer, such as a funnel timeline, device badges, a clear biggest drop-off message, and a collapsible insights section.

## AI usage

I used AI as a planning, coding, and review assistant during the assignment.

It helped me break the assignment into a realistic v1 scope, review the funnel calculation logic, structure the Vue components, and write clearer UI copy. I also used it to quickly troubleshoot small implementation details and compare simpler approaches while keeping the final solution understandable and maintainable.

The product decisions, scope decisions, and final review were made by me. I used AI as a support tool, not as a replacement for understanding the problem.

## What I would improve in v2

With more time, I would add:

- campaign comparison
- filters by device or campaign type
- a simple chart view for the funnel
- more detailed recommendation rules
- backend API endpoint for serving campaign data
- unit tests for the funnel calculation utilities
- better empty states and error handling for real-world data and edge cases
