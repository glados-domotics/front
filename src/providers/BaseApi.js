import axios from "axios"
import Qs from "qs"

class BaseApi {
  _checkCallMethod(method) {
    return ["get", "post", "put", "patch", "delete"].includes(method)
  }

  _checkCallPath(path) {
    if (typeof path !== "string" || path === "") {
      return false
    }
    if (this.baseUrl !== "" && !path.startsWith("/")) {
      return false
    }
    if (this.baseUrl === "" && !path.startsWith("http")) {
      return false
    }
    return true
  }

  _getFullUrl(path) {
    return this.baseUrl + path
  }

  _successHandler(response) {
    return Promise.resolve(response.data)
  }

  _errorHandler(error) {
    return Promise.reject(error.response)
  }

  get baseUrl() {
    return ""
  }

  async sendRequest(method, path, payload, headers = {}) {
    // Method check
    let isCallMethodValid = this._checkCallMethod(method)
    if (!isCallMethodValid) {
      window.console.error(`[Error] Call method not valid: ${method}`)
      return
    }

    // Path check
    let isCallPathValid = this._checkCallPath(path)
    if (!isCallPathValid) {
      window.console.error(`[Error] Call path not valid: ${path}`)
      return
    }

    // Base axios options
    let options = {
      method,
      url: this._getFullUrl(path),
      paramsSerializer: function (params) {
        return Qs.stringify(params, { indices: false })
      },
      headers: { "Content-Type": "application/json" }
    }

    // Extra headers
    if (headers) {
      Object.keys(headers).forEach(header => {
        options.headers[header] = headers[header]
      })
    }

    // Params/data axios options
    if (method === "get") {
      options.params = payload
    } else if (method === "patch") {  // For a patch method, it needs to be formData instead of JSON
      let formData = new FormData()
      Object.entries(payload).forEach(([key, value]) => {
        formData.append(key, value)
      })
      options.data = formData
    } else {
      options.data = payload
    }

    // Effective axios call
    return axios(options)
      .then(this._successHandler)
      .catch(this._errorHandler)
  }
}

export default BaseApi
