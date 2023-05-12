import Link from "next/link"

export default function NavBar() {
    return (
      <ul>
        <li>
          <Link href="/account/login">Login</Link>
        </li>
      </ul>
    )
  }
