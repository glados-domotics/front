<template>
  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ index + 1 }}</td>
  <td class="text-sm text-gray-900 font-light px-2 whitespace-nowrap">
    <input 
      type="text"
      class="border-0 focus:ring-0 focus:border-0 focus:outline-none text-sm text-gray-900 font-light p-2"
      @input="updateEntity('name', $event.target.value)"
      :value="updatedEntity.name"
      @focusout="saveEntity"/>
      
  </td>
  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
    <select 
      class="border-0 focus:ring-0 focus:border-0 focus:outline-none w-full text-sm text-gray-900 font-light p-2"
      @change="[updateEntity('room_name', $event.target.value) , saveEntity()]">
      <option 
        v-for="room in availableRooms" 
        :key="room" 
        :value="room"
        :selected="updatedEntity.room_name === room">
        {{ room ?? "N/A" }}
      </option>
    </select>
  </td>
  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
    <select 
      class="border-0 focus:ring-0 focus:border-0 focus:outline-none w-full text-sm text-gray-900 font-light p-2 nowrap"
      @change="updateEntity('type', $event.target.value) && saveEntity">
      <option 
        v-for="type in availableTypes" 
        :key="type" 
        :value="type"
        :selected="updatedEntity.type === type">
        {{ type }}
      </option>
    </select>
  </td>
  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
    <StatusPill 
      :status="entity.status" 
      @toggle-status="(status) => updateEntity('status', status) && saveEntity()" />
  </td>
  <td class="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
    {{ entity.value ?? "N/A" }}
  </td>
  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
    {{ new Date(Date.parse(entity.created_at)).toLocaleDateString('fr') }}
  </td>
</template>
  
<script>
import StatusPill from "@/components/dashboard/StatusPill.vue"


export default {
  name: "EntityRow",
  components: { StatusPill },
  data() {
    return {
      updatedEntity: {
        id: this.entity.id,
        name: this.entity.name,
        room_name: this.entity.room_name,
        type: this.entity.type,
        status: this.entity.status,
        value: this.entity.value,
        created_at: this.entity.created_at
      },
      availableRooms: [
        "Living Room",
        "Kitchen",
        "Bedroom",
        "Bathroom",
        null
      ],
      availableTypes: [
        "sensor",
        "light",
        "switch",
        "multimedia",
        "air_conditioner"
      ]
    }
  },
  props: {
    entity: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    updateEntity(key, value) {
      this.updatedEntity[key] = value
    },
    saveEntity() {
      this.emitter.emit("entityUpdated", { ...this.updatedEntity }) 
    }
  },
}
</script>