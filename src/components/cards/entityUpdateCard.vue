<template>
  <div class="w-full">
    <div class="rounded-lg bg-white p-4 shadow-lg lg:col-span-3">
      <form
        action=""
        class="space-y-4 p-3">
        <div>
          <label
            class="sr-only"
            for="name">Name</label>
          <input
            class="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Name"
            type="text"
            id="name"/>
        </div>

        <div class="grid grid-cols-1 gap-4">
          <label
            for="countries"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Type</label>
          <select
            id="countries"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Choose a type</option>
            <option
              v-for="type in types"
              :key="type.id">
              {{ type.name }}
            </option>
          </select>

          <div>
            <label
              class="sr-only"
              for="room">room</label>
            <input
              class="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Room"
              type="tel"
              id="room" />
          </div>
        </div>

        <div class="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
          <div>
            <input
              class="sr-only"
              id="option1"
              type="radio"
              tabindex="-1" />
            <label
              for="option1"
              class="block w-full rounded-lg bg-green-200 p-3"
              tabindex="0">
              <span class="text-sm font-medium"> on </span>
            </label>
          </div>
          <div/>
          <button
            name="commit"
            type="button"
            class="rounded bg-indigo-400 text-xs font-medium text-white">
            Apply changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "entityUpdateCard",
  props: { types: Object },
  mounted() {
    console.log(this.types)
  },
  methods: {},
  computed: {
    computedTypes() {
      return this.types
    }
  },
}
</script>

<style scoped>

</style>