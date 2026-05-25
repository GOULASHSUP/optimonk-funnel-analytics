<script setup>
import { computed, ref } from "vue";

import CampaignDetail from "./components/CampaignDetail.vue";
import CampaignList from "./components/CampaignList.vue";
import campaignData from "./data/campaigns.json";
import { calculateCampaignMetrics } from "./utils/funnelMetrics";

const campaigns = campaignData.campaigns.map(calculateCampaignMetrics);
const selectedCampaignId = ref(campaigns[0]?.id);

const selectedCampaign = computed(() =>
  campaigns.find((campaign) => campaign.id === selectedCampaignId.value),
);

function selectCampaign(campaignId) {
  selectedCampaignId.value = campaignId;
}
</script>

<template>
  <main class="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
    <div class="mx-auto max-w-7xl">
      <header class="mb-8">
        <p
          class="text-sm font-semibold uppercase tracking-wide text-indigo-600"
        >
          Funnel Analytics
        </p>

        <h1 class="mt-3 text-4xl font-bold tracking-tight">
          Popup campaign performance
        </h1>

        <p class="mt-4 max-w-2xl text-lg text-slate-600">
          Help marketers understand where visitors drop off inside multi-step
          popup campaigns.
        </p>
      </header>

      <div class="grid gap-6 lg:grid-cols-[360px_1fr]">
        <CampaignList
          :campaigns="campaigns"
          :selected-campaign-id="selectedCampaignId"
          @select-campaign="selectCampaign"
        />

        <CampaignDetail v-if="selectedCampaign" :campaign="selectedCampaign" />
      </div>
    </div>
  </main>
</template>
