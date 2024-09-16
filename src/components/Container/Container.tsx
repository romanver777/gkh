import styles from './Container.module.css';

type TProps = {
  children: React.ReactNode;
};

const Container = ({ children }: TProps) => {
  return <div className={styles.container}>{children}</div>;
};

export default Container;
