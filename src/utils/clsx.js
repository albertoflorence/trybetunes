export default function clsx(...args) {
  return args.filter((item) => item && typeof (item) === 'string').join(' ');
}
