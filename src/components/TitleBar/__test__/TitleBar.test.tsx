import React from "react";
import { TitleBar } from "../TitleBar";
import { render, fireEvent, screen } from "@testing-library/react";

describe("TitleBar", () => {
  it("Should have title", () => {
    render(<TitleBar />);

    expect(screen.getByText("HOÁ ĐƠN")).toBeInTheDocument();
  });
});
