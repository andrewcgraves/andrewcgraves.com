import Link from "next/link";

export default function BackButton({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="pd-end-link arrow-link">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        aria-hidden="true"
        className="arrow-left"
      >
        <path
          d="M13 8H3M7 4L3 8l4 4"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{label}</span>
    </Link>
  );
}
