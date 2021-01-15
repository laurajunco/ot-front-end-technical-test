import React from "react";
import { shallow } from "enzyme";
import DataTable from "./components/DataTable.js";
import Row from "./components/Row.js";

describe('<DataTable />', () => {

  const data = [
    {
      id: "ENSG00000146648-EFO_0001071",
      association_score: {
        overall: 0.5
      },
      target: {
        gene_info: {
          symbol: "SMAD2",
          name: "GATA zinc finger domain containing 2B",
        }
      }
    }
  ]

  it("displays the correct amount of rows", () => {
    const wrapper = shallow(<DataTable data={data} />);
    expect(wrapper.find(Row)).toHaveLength(1);
  });

});