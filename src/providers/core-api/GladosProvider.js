import coreApiClient from "@/providers/core-api/CoreApi"

export default {
  getFilters() {
    return coreApiClient.sendRequest("get", "/filters", {})
  },
  getEntities() {
    return coreApiClient.sendRequest("get", "/entities", {})
  },
  getRooms() {
    return coreApiClient.sendRequest("get", "/rooms", {})
  },
  putEntity(entity_id, data) {
    return coreApiClient.sendRequest("put", `/${entity_id}/entities`, data)
  }

}
