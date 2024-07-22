import { ApiModel } from "./Api"

test("can be created", () => {
  const instance = ApiModel.create({})

  expect(instance).toBeTruthy()
})
