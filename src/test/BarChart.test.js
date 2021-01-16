import React from "react";
import BarChart from "../components/BarChart.js";
import { mount } from "enzyme";


describe('<BarChart />', () => {

  const data = {
    affected_pathway: 1,
    animal_model: 0,
    genetic_association: 1,
    known_drug: 1,
    literature: 0.32635342324189076,
    rna_expression: 0.06495800833742345,
    somatic_mutation: 1        
    }
  
  it("displays bar chart container", () => {   
    const wrapper = mount(<BarChart buckets={data}/>);
    expect(wrapper.find('.bar-chart')).toHaveLength(1)

  });

});