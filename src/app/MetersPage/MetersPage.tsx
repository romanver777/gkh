import { useEffect } from 'react';
import MetersTable from '../../components/MetersTable/MetersTable';
import Container from '../../components/Container/Container';
import store from '../../store/metersStore';
import { observer } from 'mobx-react-lite';

const MetersPage = observer(() => {
  useEffect(() => {
    store.fetchMeters();
  }, []);

  return (
    <Container>
      <MetersTable />
    </Container>
  );
});

export default MetersPage;
