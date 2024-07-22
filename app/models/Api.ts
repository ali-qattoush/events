import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { ApiStoreModel } from "./ApiStore"
import { api } from "../services/api"
/**
 * Model description here for TypeScript hints.
 */
export const ApiModel = types
  .model("Api")
  .props({
    // types.optional(types.array(ApiStoreModel), {}),
    apiData: types.optional(types.array(ApiStoreModel), []),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchData() {
      const response = await api.getData()
      if (Array.isArray(response)) {
        store.setProp("apiData", response)
      } else {
        console.error("Failed to fetch data:", response)
      }
    },
    printApiStore() {
      console.log("Current contents of apiStore:")
      // console.log(store.apiData)
      console.log(store.apiData[0])
      // store.apiData.forEach((item, index) => {
      //   console.log(`Item ${index + 1}:`, item)
      // })
    },
  }))

export interface Api extends Instance<typeof ApiModel> {}
export interface ApiSnapshotOut extends SnapshotOut<typeof ApiModel> {}
export interface ApiSnapshotIn extends SnapshotIn<typeof ApiModel> {}
export const createApiDefaultModel = () => types.optional(ApiModel, [])
