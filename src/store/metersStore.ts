import { destroy, flow, Instance, types } from 'mobx-state-tree';
import { MeterModel, MeterType } from './meterModel';
import { AddressModel } from './addressModel';

export const MetersStore = types
  .model('MetersStore', {
    meters: types.array(MeterModel),
    addresses: types.map(AddressModel),
    totalPages: types.number,
    activePage: types.number,
    limit: types.number,
    offset: types.number,
    state: types.enumeration('State', ['pending', 'done', 'error']),
  })
  .actions((self) => {
    const setPage = (page: number) => {
      self.activePage = page;
      self.offset = self.limit * (page - 1);
    };
    const fetchAddresses = flow(function* (ids: string[]) {
      self.state = 'pending';

      const params = new URLSearchParams(
        ids.map((id) => ['id__in', id])
      ).toString();

      try {
        const response = yield fetch(
          `http://showroom.eis24.me/api/v4/test/areas?${params}`
        );
        const data = yield response.json();

        data.results.forEach((address: any) => {
          self.addresses.set(address.id, {
            id: address.id,
            house: address.house,
            number: address.number,
            str_number: address.str_number,
            str_number_full: address.str_number_full,
          });
        });

        self.state = 'done';
      } catch (error) {
        console.error('Failed to fetch addresses:', error);
        self.state = 'error';
      }
    });

    const fetchMeters = flow(function* () {
      self.state = 'pending';

      try {
        const response = yield fetch(
          `http://showroom.eis24.me/api/v4/test/meters?limit=${self.limit}&offset=${self.offset}`
        );
        const data = yield response.json();

        self.totalPages = data.count ?? 0;
        self.meters = data.results;
        self.state = 'done';

        const ids = new Set([
          ...data.results.map((item: MeterType) => item.area.id),
        ]);

        if (ids.size) {
          yield fetchAddresses([...ids]);
        }
      } catch (error) {
        console.error('Failed to fetch meters:', error);
        self.state = 'error';
      }
    });

    const removeMeter = flow(function* (meterId: string) {
      try {
        const response = yield fetch(
          `http://showroom.eis24.me/api/v4/test/meters/${meterId}/`,
          {
            method: 'DELETE',
          }
        );

        if (response.status === 204) {
          const meter = self.meters.find((meter) => meter.id === meterId);
          if (meter) {
            destroy(meter);
          }

          yield fetchMeters();
        } else {
          console.error(`Failed to delete meter: ${response.status}`);
          self.state = 'error';
        }
      } catch (error) {
        console.error('Failed to delete meter:', error);
        self.state = 'error';
      }
    });

    return {
      setPage,
      fetchMeters,
      removeMeter,
    };
  });

const store = MetersStore.create({
  meters: [],
  addresses: {},
  totalPages: 0,
  activePage: 1,
  limit: 20,
  offset: 0,
  state: 'pending',
});

export type MetersStoreType = Instance<typeof MetersStore>;

export default store;
