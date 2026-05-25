import { formatPercent } from "./funnelMetrics";

export function getCampaignInsights(campaign) {
  const insights = [];
  const worstStep = campaign.worstStep;

  if (!worstStep) {
    return insights;
  }

  insights.push(
    `${worstStep.name} is the biggest friction point with a ${formatPercent(
      worstStep.dropOffRate,
    )} drop-off.`,
  );

  if (worstStep.type === "email") {
    insights.push(
      "Consider simplifying the form, reducing optional fields, or making the value of subscribing clearer.",
    );
  }

  if (worstStep.type === "teaser" || worstStep.type === "exit-intent") {
    insights.push(
      "Test a clearer call-to-action or a stronger offer to encourage more visitors to continue.",
    );
  }

  if (worstStep.type === "coupon") {
    insights.push(
      "Make the coupon value and next action more visible so visitors understand what to do next.",
    );
  }

  const lastStep = campaign.steps[campaign.steps.length - 1];

  if (lastStep.conversionRate > 80) {
    insights.push(
      "The final step performs well, so optimization should focus earlier in the funnel.",
    );
  }

  return insights.slice(0, 3);
}
