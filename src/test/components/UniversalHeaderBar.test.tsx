import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import UniversalHeaderBar from "../../Components/UniversalHeaderBar";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/"),
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe("UniversalHeaderBar", () => {
  it("renders the logo link pointing to /", () => {
    render(<UniversalHeaderBar />);
    const links = screen.getAllByRole("link");
    const homeLink = links.find((l) => l.getAttribute("href") === "/");
    expect(homeLink).toBeInTheDocument();
  });

  it("renders default nav items: PROJECTS and CERAMICS", () => {
    render(<UniversalHeaderBar />);
    expect(screen.getByText("PROJECTS")).toBeInTheDocument();
    expect(screen.getByText("CERAMICS")).toBeInTheDocument();
  });

  it("renders custom children instead of default nav items", () => {
    render(
      <UniversalHeaderBar>
        <span>Custom Nav</span>
      </UniversalHeaderBar>
    );
    expect(screen.getByText("Custom Nav")).toBeInTheDocument();
    expect(screen.queryByText("PROJECTS")).toBeNull();
  });

  it("marks the active nav item when pathname matches", async () => {
    const { usePathname } = await import("next/navigation");
    vi.mocked(usePathname).mockReturnValue("/projects");

    render(<UniversalHeaderBar />);

    const projectsLink = screen.getByText("PROJECTS").closest("a");
    const ceramicsLink = screen.getByText("CERAMICS").closest("a");

    expect(projectsLink).not.toBeNull();
    expect(ceramicsLink).not.toBeNull();

    const projectsPill = screen.getByText("PROJECTS").closest(".nav-pill");
    const ceramicsPill = screen.getByText("CERAMICS").closest(".nav-pill");

    expect(projectsPill).toHaveAttribute("data-active", "true");
    expect(ceramicsPill).not.toHaveAttribute("data-active");
  });
});
