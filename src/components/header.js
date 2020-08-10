import React from "react";
import { Typography, Select, Button } from "antd";
import ReactFileReader from "react-file-reader";
const { Text } = Typography;
const { Option } = Select;

const Header = ({
  setLayout,
  layout,
  setReport,
  handleFiles,
  fileData,
  generateReport,
  source,
  setSource
}) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <div>
        <Text>Seleccione layout de grafo</Text>
        <Select
          style={{ width: 120, margin: 10 }}
          value={layout}
          onChange={value => setLayout(value)}
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
          value={source}
          onChange={value => setSource(value)}
        >
          <Option value={"example1"}>Ejemplo 1</Option>
          <Option value={"example2"}>Ejemplo 2 </Option>
          {fileData && <Option value={"file"}>Archivo </Option>}
        </Select>
      </div>
      <div style={{ margin: "auto", display: "flex", flexWrap: "wrap" }}>
        <Button onClick={generateReport}>Generar Reporte</Button>
        <ReactFileReader
          fileTypes={[".json"]}
          base64={false}
          multipleFiles={false}
          handleFiles={handleFiles}
        >
          <Button> Cargar desde archivo</Button>
        </ReactFileReader>
      </div>
    </div>
  );
};

export default Header;
