import Link from "next/link";

export default function NavBar() {
  return (
    <div className="text-xl">
      <Link className="pr-4" href="/">
        Home
      </Link>
      |
      <Link className="px-4" href="/events/latest">
        Events
      </Link>
      |
      <Link className="px-4" href="/lb/monthly">
        Leaderboard
      </Link>
    </div>
  );
}
