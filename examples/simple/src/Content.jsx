import React from "react";
import styled from "styled-components";
import Grid from "./Grid";
import { Text as TextA } from "./TextA/Text";
import { Text as TextB } from "./TextB/Text";
import "./Content.scoped.scss";

const Text = styled.div`
  color: green;
`;

const Content = (props) => {
  return (
    <div className="content">
      <h3>Styling html tags</h3>
      <p>p tag with style</p>

      <React.Fragment>
        <div>
          <p>content wrapped with React Fragment should be fine</p>
        </div>
      </React.Fragment>

      <h3>Using classes</h3>
      <div className="grid" />
      <div className="grid" />

      <h3>
        Styling child components which forward data-v attributes to its root
        element
      </h3>
      <Grid className="content-grid" />
      <Grid className="content-grid" />

      <h3>Styling with styled-components</h3>
      <Text className="text">Some content in styled-components</Text>

      <h3>Styling with the same scss filename</h3>
      <TextA />
      <TextB />
    </div>
  );
};

export default Content;
