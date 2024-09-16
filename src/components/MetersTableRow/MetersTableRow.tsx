import cn from 'classnames';
import { MeterType } from '../../store/meterModel.ts';
import styles from './MetersTableRow.module.css';

type TProps = {
  data: MeterType;
  address: string;
  index: number;
  onRemove: (id: string) => void;
};

function MetersTableRow({ data, address, index, onRemove }: TProps) {
  const getLabel = (type: string) => {
    switch (type) {
      case 'ColdWaterAreaMeter':
        return 'ХВС';
      case 'HotWaterAreaMeter':
        return 'ГВС';
    }
  };

  return (
    <tr className={styles.row}>
      <td className={cn(styles.cell, styles.index)}>{index}</td>
      <td className={cn(styles.cell, styles.type)}>
        <img
          src={`./icons/${data._type[0]}.svg`}
          alt={data._type[0]}
          className={styles.img}
        />
        <span>{getLabel(data._type[0])}</span>
      </td>
      <td className={cn(styles.cell, styles.date)}>{data.installation_date}</td>
      <td className={cn(styles.cell, styles.automatic)}>
        {data.is_automatic ? 'да' : 'нет'}
      </td>
      <td className={cn(styles.cell, styles.values)}>
        {data.initial_values[0]}
      </td>
      <td className={cn(styles.cell, styles.address)}>{address}</td>
      <td className={cn(styles.cell, styles.note)}>{data.description}</td>
      <td className={cn(styles.cell, styles.last)}>
        <button className={styles.iconButton} onClick={() => onRemove(data.id)}>
          <img
            src="./icons/trash.svg"
            alt="remove"
            className={styles.icon}
            loading="lazy"
          />
        </button>
      </td>
    </tr>
  );
}

export default MetersTableRow;
