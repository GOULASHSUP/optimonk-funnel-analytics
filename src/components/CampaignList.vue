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
  <aside class="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
    <div class="mb-4">
      <h2 class="text-lg font-semibold text-zinc-900">Campaigns</h2>
      <p class="mt-1 text-sm text-zinc-500">
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
            : 'border-zinc-200 bg-white'
        "
        @click="$emit('selectCampaign', campaign.id)"
      >
        <div class="flex items-start justify-between gap-3">
          <div>
            <h3 class="font-semibold text-zinc-900">
              {{ campaign.name }}
            </h3>

            <p
              class="mt-1 inline-flex items-center gap-1.5 text-sm capitalize text-zinc-500"
            >
              <svg
                v-if="campaign.device.toLowerCase() === 'desktop'"
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
                v-else-if="campaign.device.toLowerCase() === 'mobile'"
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
                  d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.260-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
                />
              </svg>

              {{ campaign.device }}
            </p>
          </div>

          <span
            class="rounded-full bg-zinc-400 px-2.5 py-1 text-xs font-medium text-zinc-50"
          >
            {{ campaign.steps.length }} steps
          </span>
        </div>

        <div
          class="mt-4 grid grid-cols-2 border-t border-zinc-200 pt-4 text-sm"
        >
          <div class="pr-3">
            <p class="text-zinc-500">Overall conversion</p>
            <p class="mt-1 font-semibold text-zinc-900">
              {{ formatPercent(campaign.overallConversionRate) }}
            </p>
          </div>

          <div class="border-l border-zinc-200 pl-3">
            <p class="text-zinc-500">Visitors</p>
            <p class="mt-1 font-semibold text-zinc-900">
              {{ formatNumber(campaign.steps[0].views) }}
            </p>
          </div>
        </div>
      </button>
    </div>
  </aside>
</template>
