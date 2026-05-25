<script setup>
defineProps({
  insights: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <section class="rounded-2xl border border-amber-200 bg-amber-50 p-5">
    <div>
      <p class="text-sm font-semibold uppercase tracking-wide text-amber-700">
        Insights
      </p>

      <h3 class="mt-2 text-lg font-semibold text-slate-900">
        Recommended next actions
      </h3>

      <p class="mt-1 text-sm text-amber-800">
        Simple rule-based suggestions based on the campaign funnel data.
      </p>
    </div>

    <ul class="mt-4 space-y-3">
      <li
        v-for="insight in insights"
        :key="insight"
        class="flex gap-3 rounded-xl bg-white/70 p-3 text-sm text-slate-700"
      >
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500"></span>
        <span>{{ insight }}</span>
      </li>
    </ul>
  </section>
</template>
