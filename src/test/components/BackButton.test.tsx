import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import BackButton from "../../Components/BackButton";

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

describe("BackButton", () => {
  it("renders the label text", () => {
    render(<BackButton href="/projects" label="Back to Projects" />);
    expect(screen.getByText("Back to Projects")).toBeInTheDocument();
  });

  it("renders a link pointing to the given href", () => {
    render(<BackButton href="/projects" label="Back" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/projects");
  });

  it("renders an SVG arrow icon", () => {
    const { container } = render(<BackButton href="/" label="Home" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("applies the expected CSS classes to the link", () => {
    render(<BackButton href="/" label="Home" />);
    const link = screen.getByRole("link");
    expect(link).toHaveClass("pd-end-link", "arrow-link");
  });
});
