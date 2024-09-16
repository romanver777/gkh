import { useEffect } from 'react';
import MetersTable from '../../components/MetersTable/MetersTable';
import Container from '../../components/Container/Container';
import { inject, observer } from 'mobx-react';
import { MetersStoreType } from '../../store/metersStore';

type TProps = {
  store?: MetersStoreType;
};

const MetersPage = inject('store')(
  observer(({ store }: TProps) => {
    useEffect(() => {
      store!.fetchMeters();
    }, []);

    return (
      <Container>
        <MetersTable />
      </Container>
    );
  })
);

export default MetersPage;
