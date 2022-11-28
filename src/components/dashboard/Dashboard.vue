<template>
  <div class="flex flex-col gap-5">
    <section>
      <div class="max-w-screen-xxl lg:p-4 lg:pb-16 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:gap-8 lg:flex lg:flex-wrap lg:items-start">
          <div class="flex flex-col gap-8">
            <h3 class="text-indigo-400 text-2xl font-bold">Entities</h3>
            <div class="grid grid-cols-1 gap-4 xl:grid-cols-3">
              <div
                v-for="entity in entities"
                :key="entity.id">
                <EntityCard :entity="entity"/>
              </div>
            </div>
          </div>

          <div class="invisible lg:visible w-1/3 row-span-1 flex flex-col gap-8">
            <h2 class="text-indigo-400 text-2xl font-bold">Filters</h2>
            <Filter :filters="filters"/>
          </div>

          <div class="w-full lg:w-1/3 flex flex-col gap-8">
            <h2 class="text-indigo-400 text-2xl font-bold">Update entity</h2>
            <EntityUpdateCard :types="filters[0]?.choices"/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import coreApi from "@/providers/core-api"

import EntityCard from "../cards/entityCard"
import EntityUpdateCard from "../cards/entityUpdateCard"
import Filter from "../filter"

export default {
  name: "Dashboard",
  components: { EntityCard, EntityUpdateCard, Filter },
  created() {
    this.getEntities()
    this.getFilters()
  },

  data() {
    return {
      entities: [],
      entitiesIsLoading: false,
      entitiesIsError: false,
      filters: [],
      filtersIsLoading: false,
      filtersIsError: false,
    }
  },
  methods: {
    getEntities() {
      this.entitiesIsLoading = true

      coreApi.glados
        .getEntities()
        .then((entities) => {
          entities.forEach((entity) => {
            if (entity.status !== "on") {
              // on entity have a value. off and unavailable not
              // easy way to show state of the entity
              entity.value = entity.status
            }
          })
          this.entities = entities
        })
        .catch((error) => {
          console.error(error)
          this.entitiesIsError = true
        })
        .finally(() => {
          this.entitiesIsLoading = false
        })
    },
    getFilters() {
      this.filtersIsLoading = true

      coreApi.glados
        .getFilters()
        .then((filters) => {
          this.filters = filters
        })
        .catch((error) => {
          this.filtersIsError = true
          console.error(error)
        })
        .finally(() => {
          this.filtersIsLoading = false
        })
    },
  },
}
</script>