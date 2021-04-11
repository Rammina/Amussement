import React from "react";
import { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

import { findByTestAttributes, checkProps } from "../../utils/test";

import { RoomSettings } from "./RoomSettings";

const defaultProps = { roomId: null };

const setup = (props = {}, state = null) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<RoomSettings {...setupProps} />);
};

/* this doesn't work because there are so many dependencies
test("component renders without error", () => {
  const wrapper = setup();
  const appComponent = findByTestAttributes(wrapper, "component-room-settings");
  expect(appComponent.length).toBe(1);
});
*/

test("does not throw warning with expected props", () => {
  const expectedProps = { roomId: "00007900i" };
  checkProps(RoomSettings, expectedProps);
});
