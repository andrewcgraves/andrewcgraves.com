const HEIGHT_CLASSES = { 4: "h-4", 8: "h-8", 10: "h-10", 12: "h-12" };

export default function Pill({ link, h = 4, children, isDisabled = false, isActive = false }) {
  const heightClass = HEIGHT_CLASSES[h] ?? "h-4";
  if (isDisabled) {
    return (
      <div className={`object-contain flex-none ${heightClass} w-fit header-cat`}>
        <div className="nav-pill disabled">{children}</div>
      </div>
    );
  } else {
    return (
      <a href={link} className={`object-contain flex-none ${heightClass} w-fit header-cat`}>
        <div className="nav-pill" data-active={isActive ? "true" : undefined}>
          {children}
        </div>
      </a>
    );
  }
}
