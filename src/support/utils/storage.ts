export type StorageData = object | string | null | number

type CallbackFunction = (data: StorageData) => void

export class CustomStorage {
  storage: Storage
  listeners: { [key: string]: Array<CallbackFunction> } = {}
  constructor() {
    this.storage = window.localStorage
    this.listeners = {}
  }
  callListeners(key: string, data: StorageData) {
    const listeners = this.listeners[key]
    if (listeners) {
      listeners.forEach((callback) => {
        callback(data)
      })
    }
  }
  set(key: string, data: StorageData) {
    if (typeof data === 'object') {
      data = JSON.stringify(data)
    } else if (typeof data === 'number') {
      data = data.toString()
    }
    this.storage.setItem(key, data)
    this.callListeners(key, data)
  }

  get(key: string) {
    let data = this.storage.getItem(key)
    if (data) {
      try {
        data = JSON.parse(data)
      } catch (e) {
        console.error(e)
      }
    }
    return data
  }

  remove(key: string) {
    this.storage.removeItem(key)
    this.callListeners(key, null)
  }

  subscribe(key: string, callback: CallbackFunction, immediate = true) {
    let listeners = this.listeners[key]
    if (!listeners) {
      listeners = []
      this.listeners[key] = listeners
    }
    listeners.push(callback)
    if (immediate) {
      const value = this.get(key)
      if (value) {
        callback(this.get(key))
      }
    }
  }
}

const storage = new CustomStorage()
export default storage
