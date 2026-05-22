import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import UniversalHeaderBar from "../../Components/UniversalHeaderBar";
import { useRouter } from "next/router";

vi.mock("next/router", () => ({
  useRouter: vi.fn(() => ({ pathname: "/" })),
}));

vi.mock("next/link", async () => {
  const { default: mock } = await import("../mocks/nextLinkMock");
  return { default: mock };
});

beforeEach(() => {
  vi.mocked(useRouter).mockReturnValue({ pathname: "/" } as ReturnType<typeof useRouter>);
});

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

  it("marks the active nav item when pathname matches", () => {
    vi.mocked(useRouter).mockReturnValue({ pathname: "/projects" } as ReturnType<typeof useRouter>);
    render(<UniversalHeaderBar />);

    const projectsPill = screen.getByText("PROJECTS").closest(".nav-pill");
    const ceramicsPill = screen.getByText("CERAMICS").closest(".nav-pill");

    expect(projectsPill).toHaveAttribute("data-active", "true");
    expect(ceramicsPill).not.toHaveAttribute("data-active");
  });
});
