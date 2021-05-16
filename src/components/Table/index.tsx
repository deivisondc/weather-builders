import styles from './styles.module.scss';

interface TableProps {
  data: Array<{
    label: string;
    value: string | number;
  }>;
}

export default function Table({ data }: TableProps) {
  return (
    <table className={styles.table}>
      <tbody>
        {data.map(el => (
          <tr key={el.label}>
            <td>{el.label}</td>
            <td>{el.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
