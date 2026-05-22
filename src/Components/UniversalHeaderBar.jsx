import Link from "next/link";
import { useRouter } from "next/router";
import Pill from "./Pill";
import LogoIcon from "./LogoIcon";

const defaultElements = [
  { name: "projects", isDisabled: false },
  { name: "ceramics", isDisabled: false },
];

export default function UniversalHeaderBar({ children = null }) {
  const { pathname } = useRouter();

  return (
    <div className="p-4 w-fit flex gap-8 flex-wrap">
      <Link href="/" className="logo-link">
        <LogoIcon className="w-10" />
      </Link>
      {children == null
        ? defaultElements.map((element) => {
            let link = `/${element["name"]}`;
            const isActive = pathname === link;

            return (
              <Pill
                key={element.name}
                link={link}
                isDisabled={element.isDisabled}
                isActive={isActive}
              >
                <span>{element["name"].toUpperCase()}</span>
              </Pill>
            );
          })
        : children}
    </div>
  );
}
