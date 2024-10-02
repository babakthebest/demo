"use client";
import React, { useCallback, useRef } from "react";
import { ReactFlow, useNodesState, useEdgesState, addEdge, useReactFlow, ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./index.css";
const initialNodes = [
  {
    id: "0",
    type: "input",
    data: { label: "Node" },
    position: { x: 0, y: 0 },
  },
];

let id = 1;
const getId = () => `${id++}`;
const nodeOrigin = [0.0, 0.5];

const AddNodeOnEdgeDrop: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback((params: any) => setEdges((eds: any) => addEdge(params, eds)), []);

  const onConnectEnd = useCallback(
    (event: MouseEvent | TouchEvent, connectionState: any) => {
      // when a connection is dropped on the pane it's not valid
      if (!connectionState.isValid) {
        const id = getId();
        const { clientX, clientY } = "changedTouches" in event ? event.changedTouches[0] : event;
        const newNode = {
          id,
          position: screenToFlowPosition({
            x: clientX,
            y: clientY,
          }),
          data: { label: `Node ${id}` },
          origin: [0.5, 0.0],
        };

        setNodes((nds: any) => nds.concat(newNode));
        setEdges((eds: any) => eds.concat({ id, source: connectionState.fromNode.id, target: id }));
      }
    },
    [screenToFlowPosition],
  );
  console.log("nodes", nodes);
  console.log("edges", edges);

  return (
    <div className="wrapper" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        fitView
        fitViewOptions={{ padding: 2 }}
        nodeOrigin={nodeOrigin}
      />
    </div>
  );
};

// Assign the arrow function to a variable
const AddNodeOnEdgeDropWrapper: React.FC = () => (
  <ReactFlowProvider>
    <AddNodeOnEdgeDrop />
  </ReactFlowProvider>
);

// Export the named variable
export default AddNodeOnEdgeDropWrapper;
