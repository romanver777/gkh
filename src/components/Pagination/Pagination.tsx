import cn from 'classnames';
import styles from './Pagination.module.css';

type TProps = {
  activePage: number;
  onPageClick: (page: number) => void;
  totalPages?: number;
  loading: boolean;
};

const Pagination = ({
  activePage,
  onPageClick,
  totalPages,
  loading,
}: TProps) => {
  const getPages = () => {
    let items = [];
    let left = Math.max(activePage - 1, 1);
    let right = Math.min(left + 2, totalPages);
    left = Math.max(right - 2, 1);

    if (left > 1) items.push(1);
    if (left > 2) items.push(2);
    if (left > 3) items.push('...');

    for (let page = left; page <= right; page++) items.push(page);

    if (right < totalPages - 3) items.push('...');
    for (let i = 2; i >= 0; i--) {
      if (right < totalPages - i) items.push(totalPages - i);
    }

    return items;
  };

  return (
    <div className={styles.pagination} aria-label="Pagination">
      <ul className={cn(styles.list, loading && styles.loading)}>
        {getPages().map((page, index) => (
          <li key={index}>
            <button
              className={
                activePage === page
                  ? styles.activeButton
                  : typeof page === 'string'
                    ? styles.button + ' ' + styles.noButton
                    : styles.button
              }
              onClick={() => typeof page === 'number' && onPageClick(page)}
            >
              <span className={styles.text}>{page}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Pagination;
