import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ApiModel } from "./Api"

export const RootStoreModel = types.model("RootStore").props({
  apiStore: types.optional(ApiModel, {}),
})

// export const store = RootStoreModel.create({})
export interface RootStore extends Instance<typeof RootStoreModel> {}
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
