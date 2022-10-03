import coreApiClient from "@/providers/core-api/CoreApi"


export default {
  getEntities(payload) {
    return coreApiClient.sendRequest("get", "/entities", payload)
  },
  patchEntities(payload){
    return coreApiClient.sendRequest("patch", "/entities", payload)
  }
}

//core-api.glados.getEntities ??
