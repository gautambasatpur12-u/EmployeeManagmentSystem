export default function Header({ title, subtitle }) {
  return <><h1 className="page-title">{title}</h1>{subtitle && <p className="subtitle">{subtitle}</p>}</>;
}
