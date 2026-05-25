<script setup>
import { formatNumber, formatPercent } from "../utils/funnelMetrics";

defineProps({
  step: {
    type: Object,
    required: true,
  },
  isWorstStep: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <article
    class="rounded-2xl border bg-white p-5 shadow-sm"
    :class="
      isWorstStep ? 'border-rose-300 ring-2 ring-rose-100' : 'border-zinc-200'
    "
  >
    <div class="flex items-start justify-between gap-4">
      <div>
        <div class="flex flex-wrap items-center gap-2">
          <h3 class="text-lg font-semibold text-zinc-900">
            {{ step.name }}
          </h3>

          <span
            v-if="isWorstStep"
            class="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-semibold text-rose-700"
          >
            Biggest drop-off
          </span>
        </div>

        <p class="mt-2 text-sm text-zinc-500">
          {{ step.description }}
        </p>
      </div>

      <span
        class="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium capitalize text-indigo-700"
      >
        {{ step.type }}
      </span>
    </div>

    <div class="mt-5">
      <div class="mb-2 flex items-center justify-between text-sm">
        <span class="font-medium text-zinc-600">Step conversion</span>
        <span class="font-semibold text-zinc-900">
          {{ formatPercent(step.conversionRate) }}
        </span>
      </div>

      <div class="h-3 overflow-hidden rounded-full bg-zinc-100">
        <div
          class="h-full rounded-full"
          :class="isWorstStep ? 'bg-rose-500' : 'bg-indigo-500'"
          :style="{ width: `${step.conversionRate}%` }"
        ></div>
      </div>

      <p class="mt-2 text-xs text-zinc-500">
        {{ formatNumber(step.proceeds) }} continued,
        {{ formatNumber(step.dropOffCount) }} dropped off.
      </p>
    </div>

    <div class="mt-5 grid gap-3 sm:grid-cols-3">
      <div class="rounded-xl bg-zinc-50 p-3">
        <p class="text-xs font-medium uppercase tracking-wide text-zinc-500">
          Views
        </p>
        <p class="mt-1 text-lg font-semibold text-zinc-900">
          {{ formatNumber(step.views) }}
        </p>
      </div>

      <div class="rounded-xl bg-zinc-50 p-3">
        <p class="text-xs font-medium uppercase tracking-wide text-zinc-500">
          Continued
        </p>
        <p class="mt-1 text-lg font-semibold text-zinc-900">
          {{ formatNumber(step.proceeds) }}
        </p>
      </div>

      <div
        class="rounded-xl p-3"
        :class="isWorstStep ? 'bg-rose-50' : 'bg-zinc-50'"
      >
        <p
          class="text-xs font-medium uppercase tracking-wide"
          :class="isWorstStep ? 'text-rose-600' : 'text-zinc-500'"
        >
          Drop-off
        </p>
        <p
          class="mt-1 text-lg font-semibold"
          :class="isWorstStep ? 'text-rose-700' : 'text-zinc-900'"
        >
          {{ formatPercent(step.dropOffRate) }}
        </p>
      </div>
    </div>
  </article>
</template>
