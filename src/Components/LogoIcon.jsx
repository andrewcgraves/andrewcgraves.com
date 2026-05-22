export default function LogoIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
      aria-label="Andrew Graves logo"
    >
      <path
        d="M 42 0 L 10 0 C 4.477 0 0 4.477 0 10 L 0 42 C 0 47.523 4.477 52 10 52 L 42 52 C 47.523 52 52 47.523 52 42 L 52 10 C 52 4.477 47.523 0 42 0 Z"
        fill="#121212"
      />
      <g transform="translate(8.587 9.907)">
        <path
          d="M 4.523 32.184 L 13.214 32.184 L 13.214 0 L 0 13.214 L 0 27.661 C 0 28.861 0.477 30.011 1.325 30.859 C 2.173 31.708 3.324 32.184 4.523 32.184 Z"
          fill="#FFFFFF"
        />
        <path
          className="logo-triangle"
          d="M 18.734 32.185 L 18.734 16.092 L 34.827 16.092 L 18.734 32.185 Z"
          fill="#FFFFFF"
        />
      </g>
    </svg>
  );
}
