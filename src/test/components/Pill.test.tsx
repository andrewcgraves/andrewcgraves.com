import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Pill from "../../Components/Pill";

describe("Pill", () => {
  describe("default (enabled) state", () => {
    it("renders as an anchor with the given link", () => {
      render(<Pill link="/projects">PROJECTS</Pill>);
      const anchor = screen.getByRole("link");
      expect(anchor).toHaveAttribute("href", "/projects");
    });

    it("renders children text", () => {
      render(<Pill link="/projects">PROJECTS</Pill>);
      expect(screen.getByText("PROJECTS")).toBeInTheDocument();
    });

    it("does not set data-active when isActive is false", () => {
      render(<Pill link="/projects">PROJECTS</Pill>);
      const pill = screen.getByText("PROJECTS").closest(".nav-pill");
      expect(pill).not.toHaveAttribute("data-active");
    });

    it("sets data-active when isActive is true", () => {
      render(
        <Pill link="/projects" isActive={true}>
          PROJECTS
        </Pill>
      );
      const pill = screen.getByText("PROJECTS").closest(".nav-pill");
      expect(pill).toHaveAttribute("data-active", "true");
    });
  });

  describe("disabled state", () => {
    it("renders as a div, not an anchor", () => {
      render(
        <Pill link="/projects" isDisabled={true}>
          PROJECTS
        </Pill>
      );
      expect(screen.queryByRole("link")).toBeNull();
    });

    it("applies the disabled class", () => {
      render(
        <Pill link="/projects" isDisabled={true}>
          PROJECTS
        </Pill>
      );
      const pill = screen.getByText("PROJECTS").closest(".nav-pill");
      expect(pill).toHaveClass("disabled");
    });

    it("still renders children text", () => {
      render(
        <Pill link="/projects" isDisabled={true}>
          CERAMICS
        </Pill>
      );
      expect(screen.getByText("CERAMICS")).toBeInTheDocument();
    });
  });
});
