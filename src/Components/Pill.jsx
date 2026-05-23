export default function Pill({ link, children, isDisabled = false, isActive = false }) {
  if (isDisabled) {
    return (
      <div className="flex-none w-fit header-cat">
        <div className="nav-pill disabled">{children}</div>
      </div>
    );
  } else {
    return (
      <a href={link} className="flex-none w-fit header-cat">
        <div className="nav-pill" data-active={isActive ? "true" : undefined}>
          {children}
        </div>
      </a>
    );
  }
}
