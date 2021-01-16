import React from "react";
import Row from "../components/Row.js";
import { render } from 'enzyme';

describe('<Row />', () => {

  const data = {
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
  

  it("displays row data", () => {   
    const wrapper = render(<Row data={data} />)
    expect(wrapper.text()).toContain(data.target.gene_info.symbol)
    expect(wrapper.text()).toContain(data.id)
    expect(wrapper.text()).toContain(data.target.gene_info.name)

  });

});