import { render } from "@testing-library/react";
import React from "react";

import AsideNav from "../components/navigation.component";
describe("asideNav",() => {
    it("should render correctly", () => {
        render(<AsideNav/>) 
    })
})