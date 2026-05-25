<script setup>
import { formatNumber, formatPercent } from "../utils/funnelMetrics";

defineProps({
  campaigns: {
    type: Array,
    required: true,
  },
  selectedCampaignId: {
    type: String,
    required: true,
  },
});

defineEmits(["selectCampaign"]);
</script>

<template>
  <aside class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <div class="mb-4">
      <h2 class="text-lg font-semibold text-slate-900">Campaigns</h2>
      <p class="mt-1 text-sm text-slate-500">
        Select a campaign to inspect its funnel.
      </p>
    </div>

    <div class="space-y-3">
      <button
        v-for="campaign in campaigns"
        :key="campaign.id"
        type="button"
        class="w-full rounded-xl border p-4 text-left transition hover:border-indigo-300 hover:bg-indigo-50"
        :class="
          campaign.id === selectedCampaignId
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-slate-200 bg-white'
        "
        @click="$emit('selectCampaign', campaign.id)"
      >
        <div class="flex items-start justify-between gap-3">
          <div>
            <h3 class="font-semibold text-slate-900">
              {{ campaign.name }}
            </h3>
            <p class="mt-1 text-sm capitalize text-slate-500">
              {{ campaign.device }}
            </p>
          </div>

          <span
            class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
          >
            {{ campaign.steps.length }} steps
          </span>
        </div>

        <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <p class="text-slate-500">Overall conversion</p>
            <p class="font-semibold text-slate-900">
              {{ formatPercent(campaign.overallConversionRate) }}
            </p>
          </div>

          <div>
            <p class="text-slate-500">Visitors</p>
            <p class="font-semibold text-slate-900">
              {{ formatNumber(campaign.steps[0].views) }}
            </p>
          </div>
        </div>
      </button>
    </div>
  </aside>
</template>
