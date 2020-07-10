import React, { useState } from "react";
import ReactDOM from "react-dom";
import CytoscapeComponent from "react-cytoscapejs";
import networks from "./networks";
import "antd/dist/antd.css";
import "./index.css";
import { Typography } from "antd";
import { Select } from "antd";
import data from "./data.json"
import dataStyle from "./data-style.json"
const { Text } = Typography;
const { Option } = Select;

class Graph extends React.Component {
  state = {
    layout: "concentric",
    source: "example1"
  };
  shouldComponentUpdate(props, nextprops) {
    console.log(this.state, nextprops);
    return (
      this.state.layout !== nextprops.layout ||
      this.state.source !== nextprops.source
    );
  }
  componentDidMount() {}
  render() {
    const example1 = [
      { data: { id: "1", label: "Node 1" }, position: { x: 100, y: 10 } },
      { data: { id: "2", label: "Node 2" }, position: { x: 200, y: 20 } },
      { data: { id: "3", label: "Node 3" }, position: { x: 300, y: 30 } },
      { data: { id: "4", label: "Node 4" }, position: { x: 400, y: 40 } },
      { data: { id: "5", label: "Node 5" }, position: { x: 500, y: 50 } },
      { data: { id: "6", label: "Node 6" }, position: { x: 600, y: 60 } },
      { data: { id: "7", label: "Node 7" }, position: { x: 700, y: 70 } },
      { data: { id: "8", label: "Node 8" }, position: { x: 0, y: 0 } },
      { data: { source: "1", target: "2", label: "Edge from Node1 to Node2" } },
      { data: { source: "2", target: "3", label: "Edge from Node1 to Node2" } },
      { data: { source: "2", target: "4", label: "Edge from Node1 to Node2" } },
      { data: { source: "4", target: "5", label: "Edge from Node1 to Node2" } },
      { data: { source: "4", target: "1", label: "Edge from Node1 to Node2" } },
      { data: { source: "4", target: "2", label: "Edge from Node1 to Node2" } },
      { data: { source: "4", target: "3", label: "Edge from Node1 to Node2" } },
      { data: { source: "1", target: "8", label: "Edge from Node1 to Node2" } },
      { data: { source: "1", target: "5", label: "Edge from Node1 to Node2" } },
      { data: { source: "7", target: "5", label: "Edge from Node1 to Node2" } },
      { data: { source: "6", target: "2", label: "Edge from Node1 to Node2" } },
      { data: { source: "1", target: "6", label: "Edge from Node1 to Node2" } },
      { data: { source: "8", target: "5", label: "Edge from Node1 to Node2" } }
    ];
    const example2 = CytoscapeComponent.normalizeElements(networks.elements);
    
    let layout = {
      name: this.state.layout,
      minNodeSpacing: 100,
      directed: true
    };
    console.log("render", dataStyle);
    return (
      <div>
        <div style={{ display: "flex" }}>
          <div>
            <Text>Seleccione layout de grafo</Text>
            <Select
              style={{ width: 120, margin: 10 }}
              value={this.state.layout}
              onChange={value => {
                this.setState({
                  layout: value
                });
                this.cy
                  .layout({
                    name: value,
                    minNodeSpacing: 100,
                    directed: true
                  })
                  .run();
              }}
            >
              <Option value={"random"}>Random</Option>
              <Option value={"cose"}>Compound Spring Embedder</Option>
              <Option value={"breadthfirst"}>Breadthfirs</Option>
              <Option value={"circle"}>Circle</Option>
              <Option value={"concentric"}>Concentric</Option>
            </Select>
          </div>
          <div>
            <Text>Seleccione Source del grafo</Text>
            <Select
              style={{ width: 220, margin: 10 }}
              value={this.state.source}
              onChange={value => {
                this.setState({ source: value });
              }}
            >
              <Option value={"example1"}>Ejemplo 1</Option>
              <Option value={"example2"}>Ejemplo 2 desde archivo</Option>
              <Option value={"example3"}>Ejemplo 3 </Option>
            </Select>
          </div>
        </div>
        {this.state.source === "example1" && (
          <CytoscapeComponent
            elements={this.state.source === "example1" ? example1 : example2}
            style={{
              width: "1200px",
              height: "600px",
              border: "solid 5px black"
            }}
            layout={layout}
            cy={cy => {
              cy.on("tap", "node", evt => {
                var node = evt.target;
                console.log("tapped " + node.id());
                this.props.setMetrics({
                  closeness: cy
                    .$()
                    .cc({ root: "#" + node.id(), directed: false }),
                  betweeness: cy
                    .$()
                    .bc()
                    .betweenness("#" + node.id()),
                  degree: cy.$().dc({ root: "#" + node.id(), directed: true })
                });
                console.log("max", cy.$().maxDegree(false));
              });
              this.cy = cy;
            }}
          />
        )}
        {this.state.source === "example2" && (
          <CytoscapeComponent
            elements={example2}
            style={{
              width: "1200px",
              height: "600px",
              border: "solid 5px black"
            }}
            layout={layout}
            cy={cy => {
              cy.on("tap", "node", evt => {
                var node = evt.target;
                console.log("tapped " + node.id());
                this.props.setMetrics({
                  closeness: cy
                    .$()
                    .cc({ root: "#" + node.id(), directed: false }),
                  betweeness: cy
                    .$()
                    .bc()
                    .betweenness("#" + node.id()),
                  degree: cy.$().dc({ root: "#" + node.id(), directed: true })
                });
                console.log("max", cy.$().maxDegree(false));
              });
              this.cy = cy;
            }}
          />
        )}
        {this.state.source === "example3" && (
          <CytoscapeComponent
            elements={data}
            stylesheet={dataStyle}
            style={{
              width: "1200px",
              height: "600px",
              border: "solid 5px black"
            }}
            layout={layout}
            cy={cy => {
              cy.on("tap", "node", evt => {
                var node = evt.target;
                this.props.setMetrics({
                  closeness: cy.$().cc({ root: "#" + node.id(), directed: false }),
                  betweeness: cy.$().bc().betweenness("#" + node.id()),
                  degree: cy.$().dc({ root: "#" + node.id(), directed: true })
                });
              });
              this.cy = cy;
            }}
          />
        )}
      </div>
    );
  }

  renderClusters = (layout, elems) => {
    return (
      <CytoscapeComponent
        style={{
          width: "1200px",
          height: "600px",
          border: "solid 5px black"
        }}
        layout={layout}
        cy={cy => {
          cy.add(elems);
        }}
      />
    );
  };
  /*
  loadFromFile = () =>{
     Promise.all([
      fetch('cy-style.json', {mode: 'no-cors'})
        .then(function(res) {
          return res.json()
        }),
      fetch('data.json', {mode: 'no-cors'})
        .then(function(res) {
          return res.json()
        })
    ])
      .then(function(dataArray) {
        var cy = window.cy = cytoscape({
          container: document.getElementById('cy'),
    
          layout: {
            name: 'cose',
            idealEdgeLength: 100,
            nodeOverlap: 20,
            refresh: 20,
            fit: true,
            padding: 30,
            randomize: false,
            componentSpacing: 100,
            nodeRepulsion: 400000,
            edgeElasticity: 100,
            nestingFactor: 5,
            gravity: 80,
            numIter: 1000,
            initialTemp: 200,
            coolingFactor: 0.95,
            minTemp: 1.0
          },
    
          style: dataArray[0],
    
          elements: dataArray[1]
    
        });
      });
  } */
}

export default Graph;
