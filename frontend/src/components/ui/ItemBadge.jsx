export default function ItemBadge({ textValue }) {
  return (
    <div className="badge badge-sm bg-neutral-400 text-white text-nowrap">
      {textValue}
    </div>
  );
}
