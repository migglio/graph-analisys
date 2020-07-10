import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Graph from "./Graph";
import { Tooltip } from "antd";

const App = () => {
  const [metrics, setMetrics] = useState({
    closeness: 0,
    betweeness: 0,
    degree: { indegree: 0, outdegree: 0 }
  });
  const [report, setReport] = useState("");
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Tooltip title="Haga click en un nodo del grafo para obtener los datos asociados">
        <div style={{ display: "flex" }}>
          <h1 style={{ margin: 10 }}>
            Closeness:{metrics.closeness.toFixed(2)}
          </h1>
          <h1 style={{ margin: 10 }}>
            Betweennes:{metrics.betweeness.toFixed(2)}
          </h1>
          <h1 style={{ margin: 10 }}>Indegree:{metrics.degree.indegree}</h1>
          <h1 style={{ margin: 10 }}>Outdegree:{metrics.degree.outdegree}</h1>
        </div>
      </Tooltip>
      <Graph setMetrics={setMetrics} setReport={setReport} />
      {report && (
        <div style={{width: "60%"}}>
          <h1 style={{ margin: 10, textAlign: "center" }}>Reporte</h1>
          <textarea
            disabled
            name="textarea"
            style={{
              width: "100%",
              height: "40vh",
              padding: "1%",
              textAlign: "center"
            }}
          >
            {report}
          </textarea>
        </div>
      )}
    </div>
  );
};

export default App;
