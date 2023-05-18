import coreApiClient from "@/providers/core-api/CoreApi"

export default {
  getEntities() {
    return coreApiClient.sendRequest("get", "/entities", {})
  },

  updateEntity(entity) {
    return coreApiClient.sendRequest("put", `/entities?id=${entity.id}`, entity)
  }
}
