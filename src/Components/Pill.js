export default function Pill({
  link,
  h = 4,
  children,
  isDisabled = false,
  isActive = false,
}) {
  if (isDisabled) {
    return (
      <div className={`object-contain flex-none h-${h} w-fit header-cat`}>
        <div className="rounded-lg h-full grid place-content-center disabled">
          {children}
        </div>
      </div>
    );
  } else {
    return (
      <a
        href={link}
        className={`object-contain flex-none h-${h} w-fit header-cat`}
      >
        <div
          className={`rounded-lg ease-in-out duration-200 h-full grid place-content-center${isActive ? " bg-black px-4 [&_p]:text-white" : " hover:bg-black hover:px-4 hover:[&_p]:text-white"}`}
        >
          {children}
        </div>
      </a>
    );
  }
}
