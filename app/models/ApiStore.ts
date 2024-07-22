import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

// uuidv4()

export const ApiStoreModel = types
  .model("ApiStore")
  .props({
    id: types.identifier,
    title: types.string,
    description: types.string,
    city: types.string,
    activity_type: types.string,
    rating: types.union(types.float, types.integer),
    reviews: types.integer,
    top_rated: types.boolean,
    family: types.boolean,
    limited: types.boolean,
    include_food: types.boolean,
    accessibility: types.boolean,
    free_cancellation: types.union(types.null, types.boolean),
    special_price: types.union(types.null, types.boolean),
    cost: types.union(types.integer, types.literal("Free")),
    image: types.string,
  })
  .actions(withSetPropAction)

export interface ApiStore extends Instance<typeof ApiStoreModel> {}
export interface ApiStoreSnapshotOut extends SnapshotOut<typeof ApiStoreModel> {}
export interface ApiStoreSnapshotIn extends SnapshotIn<typeof ApiStoreModel> {}
export const createApiStoreDefaultModel = () =>
  types.optional(ApiStoreModel, {
    id: "", // default identifier
    title: "",
    description: "",
    city: "",
    activity_type: "",
    rating: 0, // default float or integer
    reviews: 0, // default integer
    top_rated: false,
    family: false,
    limited: false,
    include_food: false,
    accessibility: false,
    free_cancellation: null,
    special_price: null,
    cost: 0, // default integer or "Free"
    image: "",
  })
