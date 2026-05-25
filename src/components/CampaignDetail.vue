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

const worstStepNumber = computed(() => {
  const index = props.campaign.steps.findIndex(
    (step) => step.id === props.campaign.worstStep.id,
  );

  return index >= 0 ? index + 1 : null;
});

const deviceType = computed(() => props.campaign.device.toLowerCase());
</script>

<template>
  <section class="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
    <div class="border-b border-zinc-200 pb-6">
      <div
        class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"
      >
        <h2 class="text-2xl font-bold text-zinc-900">
          {{ campaign.name }}
        </h2>

        <span
          class="inline-flex w-fit items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium capitalize text-zinc-600"
        >
          <svg
            v-if="deviceType === 'desktop'"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-4 w-4"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
            />
          </svg>

          <svg
            v-else-if="deviceType === 'mobile'"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-4 w-4"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
            />
          </svg>

          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-4 w-4"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
            />
          </svg>

          {{ campaign.device }}
        </span>
      </div>

      <div class="mt-5 grid gap-3 sm:grid-cols-3">
        <div class="rounded-xl bg-zinc-50 p-4">
          <p class="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Visitors
          </p>
          <p class="mt-1 text-xl font-semibold text-zinc-900">
            {{ formatNumber(campaign.steps[0].views) }}
          </p>
        </div>

        <div class="rounded-xl bg-zinc-50 p-4">
          <p class="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Completed
          </p>
          <p class="mt-1 text-xl font-semibold text-zinc-900">
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
        Biggest drop-off:
        <span v-if="worstStepNumber">Step {{ worstStepNumber }} – </span>
        {{ campaign.worstStep.name }}
      </p>

      <p class="mt-1 text-sm text-rose-700">
        {{ formatPercent(campaign.worstStep.dropOffRate) }} of visitors leave at
        this step, which means
        {{ formatNumber(campaign.worstStep.dropOffCount) }} visitors do not
        continue.
      </p>
    </div>

    <div class="mt-6">
      <InsightsPanel :insights="insights" />
    </div>

    <div class="mt-6 border-t border-zinc-200 pt-6">
      <div class="mb-4">
        <h3 class="text-lg font-semibold text-zinc-900">Funnel steps</h3>
        <p class="mt-1 text-sm text-zinc-500">
          See how each step performs and get detailed insights on where you can
          improve.
        </p>
      </div>

      <div class="space-y-5">
        <div
          v-for="(step, index) in campaign.steps"
          :key="step.id"
          class="relative grid grid-cols-[32px_1fr] gap-4"
        >
          <div class="relative flex justify-center">
            <div
              v-if="index !== campaign.steps.length - 1"
              class="absolute top-8 -bottom-5 w-px bg-zinc-200"
            ></div>

            <div
              class="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-4 text-xs font-semibold"
              :class="
                step.id === campaign.worstStep.id
                  ? 'border-rose-100 bg-rose-500 text-white'
                  : 'border-indigo-100 bg-indigo-500 text-white'
              "
            >
              {{ index + 1 }}
            </div>
          </div>

          <FunnelStepCard
            :step="step"
            :is-worst-step="step.id === campaign.worstStep.id"
          />
        </div>
      </div>
    </div>
  </section>
</template>
