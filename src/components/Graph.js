import React from "react";
import CytoscapeComponent from "react-cytoscapejs";
//import networks from "./data/networks";
import "antd/dist/antd.css";
//import "./index.css";
import example2 from "./../data/example2.json";
import example2Style from "./../data/example2-style.json";
import example1 from "./../data/example1.json";
import Header from "./header";

class Graph extends React.Component {
  state = {
    layout: "concentric",
    source: "example1",
    fileData: null,
    mobile: false
  };
  shouldComponentUpdate(props, nextprops) {
    return (
      this.state.layout !== nextprops.layout ||
      this.state.source !== nextprops.source
    );
  }
  componentWillMount(){
    if (window.innerWidth < 420)
    this.setState({mobile: window.innerWidth < 420})
  }

  componentDidMount() {}
  render() {
    let layout = {
      name: this.state.layout,
      minNodeSpacing: 100,
      directed: true
    };
    const dimensions = {
      width: this.state.mobile ? "90vw": "80vw",
      height:this.state.mobile ? "500px":  "600px",
      margin: this.state.mobile ?  "auto" : ""
    }
    return (
      <div>
        <Header
          setLayout={this.setLayout}
          layout={this.state.layout}
          handleFiles={this.handleFiles}
          generateReport={this.generateReport}
          fileData={this.state.fileData}
          setReport={this.props.setReport}
          source={this.state.source}
          setSource={this.setSource}
        />
        {this.state.source === "example1" && example1 && (
          <CytoscapeComponent
            elements={example1}
            style={{
             ...dimensions,
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
        {this.state.source === "file" && this.state.fileData && (
          <CytoscapeComponent
            elements={this.state.fileData}
            style={{
              ...dimensions,
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
        {this.state.source === "example2" && example2 && (
          <CytoscapeComponent
            elements={example2}
            stylesheet={example2Style}
            style={{
              ...dimensions,
              border: "solid 5px black"
            }}
            layout={layout}
            cy={cy => {
              cy.on("tap", "node", evt => {
                var node = evt.target;
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
              });
              this.cy = cy;
            }}
          />
        )}
      </div>
    );
  }

  generateReport = () => {
    let result = "";
    let cy = this.cy;
    cy.filter(function(element, i) {
      if (element.isNode()) {
        const degree = cy.$().dc({ root: "#" + element.id(), directed: true });
        const closeness = cy
          .$()
          .cc({ root: "#" + element.id(), directed: false })
          .toFixed(2);
        const betweeness = cy
          .$()
          .bc()
          .betweenness("#" + element.id())
          .toFixed(2);
        result +=
          `Nodo ${element.id()}: ` +
          `Closeness: ${closeness} - Betweeness: ${betweeness} - ` +
          `Indegree: ${degree.indegree} - Outdegree: ${degree.outdegree} \n`;

        return true;
      }
      return false;
    });
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 500);
    this.props.setReport(result);
  };

  handleFiles = files => {
    let reader = new FileReader();
    reader.onload = e => {
      this.setState({ fileData: JSON.parse(e.target.result), source: "file" });
    };
    reader.readAsText(files[0]);
    this.props.setReport(null)
  };

  setLayout = value => {
    this.cy
      .layout({
        name: value,
        minNodeSpacing: 100,
        directed: true
      })
      .run();
    this.setState({ layout: value });
  };
  
  setSource = value => {
    this.setState({ source: value });
    this.props.setReport(null);
  };
}

export default Graph;
