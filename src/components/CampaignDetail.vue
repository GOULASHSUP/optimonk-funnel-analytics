<script setup>
import { computed } from "vue";

import FunnelStepCard from "./FunnelStepCard.vue";
import InsightsPanel from "./InsightsPanel.vue";
import { formatNumber, formatPercent } from "../utils/funnelMetrics";
import { getCampaignInsights } from "../utils/insights";

const props = defineProps({
  campaign: {
    type: Object,
    required: true,
  },
});

const insights = computed(() => getCampaignInsights(props.campaign));
</script>

<template>
  <section class="space-y-6">
    <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div
        class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"
      >
        <div>
          <p
            class="text-sm font-semibold uppercase tracking-wide text-indigo-600"
          >
            Selected campaign
          </p>

          <h2 class="mt-2 text-2xl font-bold text-slate-900">
            {{ campaign.name }}
          </h2>

          <p class="mt-2 text-sm capitalize text-slate-500">
            Device: {{ campaign.device }}
          </p>
        </div>

        <div class="grid gap-3 sm:grid-cols-3 lg:min-w-105">
          <div class="rounded-xl bg-slate-50 p-4">
            <p
              class="text-xs font-medium uppercase tracking-wide text-slate-500"
            >
              Visitors
            </p>
            <p class="mt-1 text-xl font-semibold text-slate-900">
              {{ formatNumber(campaign.steps[0].views) }}
            </p>
          </div>

          <div class="rounded-xl bg-slate-50 p-4">
            <p
              class="text-xs font-medium uppercase tracking-wide text-slate-500"
            >
              Completed
            </p>
            <p class="mt-1 text-xl font-semibold text-slate-900">
              {{
                formatNumber(campaign.steps[campaign.steps.length - 1].proceeds)
              }}
            </p>
          </div>

          <div class="rounded-xl bg-indigo-50 p-4">
            <p
              class="text-xs font-medium uppercase tracking-wide text-indigo-600"
            >
              Overall conversion
            </p>
            <p class="mt-1 text-xl font-semibold text-indigo-700">
              {{ formatPercent(campaign.overallConversionRate) }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-6 rounded-xl border border-rose-200 bg-rose-50 p-4">
        <p class="text-sm font-semibold text-rose-800">
          Biggest drop-off: {{ campaign.worstStep.name }}
        </p>

        <p class="mt-1 text-sm text-rose-700">
          {{ formatPercent(campaign.worstStep.dropOffRate) }} of visitors leave
          at this step, which means
          {{ formatNumber(campaign.worstStep.dropOffCount) }} visitors do not
          continue.
        </p>
      </div>
    </div>

    <InsightsPanel :insights="insights" />

    <div class="space-y-4">
      <FunnelStepCard
        v-for="(step, index) in campaign.steps"
        :key="step.id"
        :step="step"
        :step-number="index + 1"
        :is-worst-step="step.id === campaign.worstStep.id"
      />
    </div>
  </section>
</template>
