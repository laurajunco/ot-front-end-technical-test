import React from "react";
import { shallow } from "enzyme";
import DataTable from "./components/DataTable.js";
import Row from "./components/Row.js";

describe('<DataTable />', () => {

  let data = [
    {
      "id": "ENSG00000003436-EFO_0001071",
      "association_score": {
        "datatypes": {
          "literature": 0.19517772984514156,
          "rna_expression": 0.07211524912501942,
          "genetic_association": 0.22628011248337543,
          "somatic_mutation": 0.0,
          "known_drug": 0.0,
          "animal_model": 0.0,
          "affected_pathway": 0.5
        },
        "overall": 0.5827636456183956
      }
    }
  ]

  it("Renders a Data Table", () => {
    const wrapper = shallow(<DataTable data={data} />);
    expect(data).toHaveLength(1);
  });

  it("displays the correct amount of rows", () => {
    const wrapper = shallow(<DataTable data={data} />);
    expect(wrapper.find(".row")).toHaveLength(1);
  });

});