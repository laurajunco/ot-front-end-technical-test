import React from 'react';
import { shallow } from "enzyme";
import App from './App';

describe('<App />', () => {

  it("Renders app", () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toHaveLength(1);
  });

});