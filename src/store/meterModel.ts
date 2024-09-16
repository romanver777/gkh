import { Instance, types } from 'mobx-state-tree';

export const MeterModel = types.model('Meter').props({
  area: types.model({
    id: types.string,
  }),
  brand_name: types.maybeNull(types.string),
  communication: types.string,
  description: types.string,
  id: types.identifier,
  initial_values: types.array(types.number),
  installation_date: types.maybe(types.string),
  is_automatic: types.maybeNull(types.boolean),
  model_name: types.maybeNull(types.string),
  serial_number: types.string,
  _type: types.array(types.string),
});

export type MeterType = Instance<typeof MeterModel>;