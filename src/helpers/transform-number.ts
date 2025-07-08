import { Transform } from 'class-transformer';

export function TransformToNumber() {
  return Transform(({ value }) => (value ? Number(value) : undefined));
}
