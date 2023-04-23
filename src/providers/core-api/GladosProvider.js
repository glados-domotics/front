import coreApiClient from "@/providers/core-api/CoreApi"

export default {
  getEntities() {
    return coreApiClient.sendRequest("get", "/entities", {})
  },
  getEntity(id) {
    return coreApiClient.sendRequest("get", `/entity/${id}`, {})
  },
  updateEntity(id, data) {
    return coreApiClient.sendRequest("patch", `/entity/${id}`, data)
  },
  getRooms() {
    return coreApiClient.sendRequest("get", "/rooms", {})
  }
}
