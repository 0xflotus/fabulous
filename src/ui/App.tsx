import React, { useReducer, useEffect, Fragment } from "react";
import {
  Layout as LayoutIcon,
  Maximize,
  Square,
  Droplet,
  Edit,
  Edit2,
  Grid,
  Crosshair,
  Sun,
  Disc
} from "react-feather";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import TextStyles from "./knobs/text";
import theme from "./theme";
import Section from "./primitives/section";
import Border from "./knobs/border";
import Space from "./knobs/space";
import Dimension from "./knobs/dimension";
import Apperance from "./knobs/apperance";
import { Flex } from "rebass";
import Layout from "./knobs/layout";
import Theme from "./theme";
import Position from "./knobs/position";
import Background from "./knobs/background";
import BorderRadius from "./knobs/border-radius";
import { reducer } from "./store";
import "react-tippy/dist/tippy.css";
import Empty from "./Empty";

declare var acquireVsCodeApi: any;
const vscode = acquireVsCodeApi();

const GlobalStyles = createGlobalStyle`
body {
  background-color: ${Theme.colors.background};
  color: ${Theme.colors.textColor};
  height: 100vh;
  padding: 0px;
}
`;

const InitialState = {
  declarations: null
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, InitialState);

  const updateProperty = (prop: string, value: any) => {
    dispatch({
      type: "addProperty",
      payload: {
        prop,
        value
      }
    });

    vscode.postMessage({
      prop,
      value,
      type: "add"
    });
  };

  const removeProperty = (prop: string) => {
    dispatch({
      type: "removeProperty",
      payload: {
        prop
      }
    });

    vscode.postMessage({
      prop,
      type: "remove"
    });
  };

  useEffect(() => {
    window.addEventListener("message", ({ data }) => {
      if (data.type === "activeBlock") {
        dispatch({
          type: "resetReclarations",
          payload: data.payload
        });
      }
    });
  }, []);

  const declarations = state.declarations || {};
  console.log(state.declarations);
  if (state.declarations === null) {
    return (
      <Fragment>
        <GlobalStyles />
        <ThemeProvider theme={theme}>
          <Empty />
        </ThemeProvider>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Flex p="3" flexDirection="column" backgroundColor="background">
          <Section CategoryIcon={LayoutIcon} label="Layout">
            <Layout
              declarations={declarations}
              updateProp={updateProperty}
              removeProp={removeProperty}
            />
          </Section>
          <Section CategoryIcon={Maximize} label="Space">
            <Space
              declarations={declarations}
              updateProp={updateProperty}
              removeProp={removeProperty}
            />
          </Section>
          <Section CategoryIcon={Grid} label="Size">
            <Dimension
              declarations={declarations}
              updateProp={updateProperty}
              removeProp={removeProperty}
            />
          </Section>
          <Section CategoryIcon={Crosshair} label="Position">
            <Position
              declarations={declarations}
              updateProp={updateProperty}
              removeProp={removeProperty}
            />
          </Section>
          <Section CategoryIcon={Edit2} label="Typography">
            <TextStyles
              declarations={declarations}
              updateProp={updateProperty}
              removeProp={removeProperty}
            />
          </Section>
          <Section CategoryIcon={Droplet} label="Background">
            <Background
              declarations={declarations}
              updateProp={updateProperty}
              removeProp={removeProperty}
            />
          </Section>
          <Section CategoryIcon={Square} label="Border">
            <Border
              declarations={declarations}
              updateProp={updateProperty}
              removeProp={removeProperty}
            />
          </Section>
          <Section CategoryIcon={Disc} label="Border radius">
            <BorderRadius
              declarations={declarations}
              updateProp={updateProperty}
              removeProp={removeProperty}
            />
          </Section>
          <Section CategoryIcon={Sun} label="Appearance">
            <Apperance
              declarations={declarations}
              updateProp={updateProperty}
              removeProp={removeProperty}
            />
          </Section>
        </Flex>
      </ThemeProvider>
    </Fragment>
  );
}
