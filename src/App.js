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

      <Graph setMetrics={setMetrics} />
    </div>
  );
};

export default App;
