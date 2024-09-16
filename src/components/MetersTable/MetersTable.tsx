import { useEffect } from 'react';
import cn from 'classnames';
import MetersTableRow from '../MetersTableRow/MetersTableRow';
import Pagination from '../Pagination/Pagination';
import styles from './MetersTable.module.css';
import { inject, observer } from 'mobx-react';
import { MetersStoreType } from '../../store/metersStore';

type TProps = {
  store?: MetersStoreType;
};

const MetersTable = inject('store')(
  observer(({ store }: TProps) => {
    const {
      meters,
      addresses,
      activePage,
      totalPages,
      limit,
      offset,
      setPage,
      state,
    } = store!;

    useEffect(() => {
      store!.fetchMeters();
    }, [activePage]);

    return (
      <section className={styles.section}>
        <h1 className={styles.title}>Список счётчиков</h1>
        <div className={styles.tableContainer}>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  <th className={styles.index}>№</th>
                  <th className={styles.type}>Тип</th>
                  <th className={styles.date}>Дата установки</th>
                  <th className={styles.automatic}>Автоматический</th>
                  <th className={styles.values}>Текущие показания</th>
                  <th className={styles.address}>Адрес</th>
                  <th className={styles.note}>Примечание</th>
                  <th className={styles.last}></th>
                </tr>
              </thead>
              <tbody
                className={cn(
                  styles.tbody,
                  state === 'pending' && styles.loading
                )}
              >
                {(state === 'error' ||
                  (state === 'done' && !meters.length)) && (
                  <tr className={styles.errorTr}>
                    <td className={styles.errorTd}>Данные не найдены</td>
                  </tr>
                )}
                {meters.map((meter, index) => (
                  <MetersTableRow
                    key={meter.id}
                    data={meter}
                    address={
                      store?.addresses.has(meter.area.id)
                        ? `${addresses.get(meter.area.id)?.house.address} ${addresses.get(meter.area.id)?.str_number_full}`
                        : ''
                    }
                    index={index + 1 + offset}
                    onRemove={(id) => store?.removeMeter(id)}
                  />
                ))}
              </tbody>
            </table>
            <Pagination
              activePage={activePage}
              onPageClick={(page) => setPage(page)}
              totalPages={Math.ceil(totalPages / limit)}
              loading={state === 'pending'}
            />
          </div>
        </div>
      </section>
    );
  })
);

export default MetersTable;
