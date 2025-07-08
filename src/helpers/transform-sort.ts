import { Transform } from 'class-transformer';

export function TransformSort() {
  return Transform(({ value }) => {
    if (!value) return undefined;
    const [camp, order] = value?.split('-');
    return { [camp]: order };
  });
}
