export interface TableColumn<T> {
  value: keyof T;
  label: string;
}
