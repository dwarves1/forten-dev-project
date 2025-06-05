import { Link } from "react-router-dom";
import CardTitle from "../ui/CardTitle";

export default function DashboardCard({ cardName, linkString, bgColor }) {
  return (
    <div
      className={`card ${bgColor} flex flex-col justify-between shadow-lg p-6 h-48 md:h-52`}
    >
      <CardTitle textValue={cardName} />
      <Link to={linkString}>
        <button className="btn btn-outline btn-sm mt-3 w-full">관리</button>
      </Link>
    </div>
  );
}
