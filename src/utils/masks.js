import { createNumberMask } from 'text-mask-addons';

export const currencyMask = createNumberMask({
  prefix: '',
  suffix: ' \u20BD',
  integerLimit: 4
});

export const phoneMask = [
  '+',
  '7',
  ' ',
  '(',
  /[1-9]/,
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/
];

export function extractNumbers(value) {
  return value.replace(/\D+/g, '');
}
