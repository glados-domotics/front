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
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ index + 1 }}</td>
        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {{ entity.name }}
        </td>
        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {{ entity.type }}
        </td>
        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {{ entity.status }}
        </td>
        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {{ entity.value ?? "N/A" }}
        </td>
        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {{ new Date(Date.parse(entity.created_at)).toLocaleDateString('fr') }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  name: "EntityTable",
  props: {
    entities: {
      type: Array,
      required: true
    }
  },
}
</script>