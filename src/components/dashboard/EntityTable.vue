<template>
  <table class="min-w-full">
    <thead class="bg-gray-200 border-b">
      <tr>
        <th 
          scope="col" 
          class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
          #
        </th>
        <th 
          scope="col" 
          class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
          Name
        </th>
        <th 
          scope="col" 
          class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
          Room
        </th>
        <th 
          scope="col" 
          class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
          Type
        </th>
        <th 
          scope="col" 
          class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
          Status
        </th>
        <th 
          scope="col" 
          class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
          Value
        </th>
        <th 
          scope="col" 
          class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
          Creation Date
        </th>
      </tr>
    </thead>
    <tbody>
      <tr 
        v-for="(entity, index) in entities" 
        :key="entity.id"
        class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
        <EntityRow 
          :entity="entity" 
          :index="index" />
      </tr>
    </tbody>
  </table>
</template>

<script>
import EntityRow from "@/components/dashboard/EntityRow.vue"

export default {
  name: "EntityTable",
  components: { EntityRow },
  props: {
    entities: {
      type: Array,
      required: true
    }
  },
}
</script>