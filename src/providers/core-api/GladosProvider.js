import coreApiClient from "@/providers/core-api/CoreApi"

export default {
  getEntities() {
    return coreApiClient.sendRequest("get", "/entities", {})
  },
  patchEntities(id, data, header = {}) {
    return coreApiClient.sendRequest("patch", "/entities/" + id, data, header)
  },
}
