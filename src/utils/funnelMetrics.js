export function formatPercent(value) {
  return `${value.toFixed(1)}%`;
}

export function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

export function calculateStepMetrics(step) {
  const conversionRate =
    step.views > 0 ? (step.proceeds / step.views) * 100 : 0;
  const dropOffCount = step.views - step.proceeds;
  const dropOffRate = step.views > 0 ? (dropOffCount / step.views) * 100 : 0;

  return {
    ...step,
    conversionRate,
    dropOffCount,
    dropOffRate,
  };
}

export function calculateCampaignMetrics(campaign) {
  const steps = campaign.steps.map(calculateStepMetrics);

  const firstStep = steps[0];
  const lastStep = steps[steps.length - 1];

  const overallConversionRate =
    firstStep && firstStep.views > 0
      ? (lastStep.proceeds / firstStep.views) * 100
      : 0;

  const worstStep = steps.reduce((currentWorst, step) => {
    if (!currentWorst || step.dropOffRate > currentWorst.dropOffRate) {
      return step;
    }

    return currentWorst;
  }, null);

  return {
    ...campaign,
    steps,
    overallConversionRate,
    worstStep,
  };
}
