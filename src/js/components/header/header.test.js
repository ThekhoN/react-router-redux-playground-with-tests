import React from "react";
import { shallow, mount } from "enzyme";
import Header from "./index";

describe("Header", () => {
  let wrapper;
  const title = "Header Title";
  beforeEach(() => {
    wrapper = mount(<Header title={title} />);
  });
  it("renders Header component", () => {
    expect(wrapper.length).toEqual(1);
  });
  it("renders title", () => {
    expect(wrapper.contains(<h2>Header Title</h2>)).toEqual(true);
  });
});
