import React from "react";
import Row from "../components/Row.js";
import { render } from '@testing-library/react';

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
    const { getByText } = render(<Row data={data} />)
    expect(getByText(data.target.gene_info.symbol)).toBeInTheDocument()
    expect(getByText(data.id)).toBeInTheDocument()
    expect(getByText(data.target.gene_info.name)).toBeInTheDocument()
  });

});