import { Instance, types } from 'mobx-state-tree';

export const AddressModel = types.model('AddressModel', {
  house: types.model({
    address: types.string,
  }),
  fias_addrobjs: types.array(types.string),
  id: types.identifier,
  number: types.number,
  str_number: types.string,
  str_number_full: types.string,
});

export type AddressType = Instance<typeof AddressModel>;

