export default function Pill({ link, h = 4, children, isDisabled = false, isActive = false }) {
  if (isDisabled) {
    return (
      <div className={`object-contain flex-none h-${h} w-fit header-cat`}>
        <div className="nav-pill disabled">{children}</div>
      </div>
    );
  } else {
    return (
      <a href={link} className={`object-contain flex-none h-${h} w-fit header-cat`}>
        <div className="nav-pill" data-active={isActive ? "true" : undefined}>
          {children}
        </div>
      </a>
    );
  }
}
