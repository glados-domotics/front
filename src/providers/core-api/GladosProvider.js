import coreApiClient from "@/providers/core-api/CoreApi"

export default {
  getEntities(query) {
    return coreApiClient.sendRequest("get", `/entities${query ? query : ""}`, {})
  },
  deleteEntity(id) {
    return coreApiClient.sendRequest("delete", `/entities/${id}`, {})
  },
  createEntity(payload) {
    return coreApiClient.sendRequest("post", "/entities", payload)
  },
  editEntity(id, payload) {
    return coreApiClient.sendRequest("put", `/entities/${id}`, payload)
  },
  getRooms() {
    return coreApiClient.sendRequest("get", "/rooms", {})
  },

  deleteRooms(id) {
    return coreApiClient.sendRequest("delete", `/rooms/${id}`, {})
  },
  createRoom(payload) {
    return coreApiClient.sendRequest("post", "/rooms", payload)
  },
  editRoom(id, payload) {
    return coreApiClient.sendRequest("put", `/rooms/${id}`, payload)
  },
}
