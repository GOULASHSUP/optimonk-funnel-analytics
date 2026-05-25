<script setup>
import { ref } from "vue";

defineProps({
  insights: {
    type: Array,
    required: true,
  },
});

const isOpen = ref(false);
</script>

<template>
  <section class="rounded-2xl border border-amber-200 bg-amber-50 p-5">
    <button
      type="button"
      class="flex w-full items-center justify-between gap-4 text-left"
      @click="isOpen = !isOpen"
    >
      <div class="flex items-start gap-3">
        <span
          class="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-300 text-white"
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-5 w-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
            />
          </svg>
        </span>

        <div>
          <p
            class="text-sm font-semibold uppercase tracking-wide text-amber-700"
          >
            Insights
          </p>

          <h3 class="mt-2 text-sm text-zinc-900">
            See what you can improve in this funnel
          </h3>
        </div>
      </div>

      <span
        class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-amber-800 transition-transform duration-200"
        :class="isOpen ? 'rotate-180' : 'rotate-0'"
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-5 w-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </span>
    </button>

    <ul v-if="isOpen" class="mt-4 space-y-3">
      <li
        v-for="insight in insights"
        :key="insight"
        class="flex items-center gap-3 rounded-xl bg-white/70 p-3 text-sm text-zinc-700"
      >
        <span class="h-2 w-2 shrink-0 rounded-full bg-amber-500"></span>
        <span>{{ insight }}</span>
      </li>
    </ul>
  </section>
</template>
