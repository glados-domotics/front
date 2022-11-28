<template>
  <div class="lg:mx-auto w-full lg:mx-0 lg:text-left">
    <div class="lg:sticky lg:top-4">
      <details
        open
        class="overflow-hidden rounded border border-gray-200">
        <summary class="flex items-center justify-between bg-gray-100 px-5 py-3 lg:hidden">
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </summary>

        <form class="border-t border-gray-200 lg:border-t-0">
          <div
            v-for="filter in filters"
            :key="filter.id">
            <fieldset>
              <legend class="block w-full bg-gray-50 px-5 py-3 text-xs font-medium">
                {{ filter.name }}
              </legend>

              <div class="space-y-2 px-5 py-6">
                <div
                  class="flex items-center"
                  v-for="choice in filter.choices"
                  :key="choice.id">
                  <input
                    id="{{ choice.name }}"
                    type="checkbox"
                    name="age[type.name]"
                    class="rounded text-indigo-400"
                    checked/>

                  <label
                    for="{{ choice.name }}"
                    class="ml-3 text-sm font-normal">
                    {{ choice.name }}
                  </label>
                </div>
              </div>
            </fieldset>
          </div>

          <div class="flex justify-between border-t border-gray-200 px-5 py-3">
            <button
              name="reset"
              type="button"
              class="rounded text-xs font-medium text-gray-600 underline">
              Reset All
            </button>

            <button
              name="commit"
              type="button"
              class="rounded bg-indigo-400 px-5 py-3 text-xs font-medium text-white">
              Apply Filters
            </button>
          </div>
        </form>
      </details>
    </div>
  </div>
</template>

<script>

export default {
  name: "filter",
  props: { filters: [] },
  methods: {},
  computed: {
    computedFilters() {
      return this.filters
    }
  },
}
</script>

<style scoped>

</style>