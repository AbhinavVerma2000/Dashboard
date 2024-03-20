import React, { useState, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import Head from "next/head";

const flowKey = "example-flow";

const getNodeId = () => `randomnode_${+new Date()}`;

const initialNodes = [];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const SaveRestore = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodecolor, setNodecolor] = useState("#ffffff");
  const [textcolor, setTextcolor] = useState("#000000");
  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  const onSave = useCallback(async () => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      try {
        let res = await fetch("/api/addnode", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(flow),
        });
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const res = await fetch("/api/getnode");
      const data = await res.json();
      let recent = data[Array.from(data).length - 1];
      setNodes(recent);
      if (recent) {
        const { x = 0, y = 0, zoom = 1 } = recent.viewport;
        setNodes(recent.nodes || []);
        setEdges(recent.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport, setEdges]);
  const onAdd = useCallback(() => {
    let a = prompt("Enter value of the Node");

    const newNode = {
      id: getNodeId(),
      data: { label: a },
      sourcePosition: "right",
      targetPosition: "left",
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
      },
      style: { backgroundColor: nodecolor, color: textcolor, fontSize: "18px" },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes, nodecolor, textcolor]);

  return (
    <div className="flex w-full h-full justify-between">
      <div className="w-[90vw] h-[90vh] bg-slate-200 rounded-xl">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setRfInstance}
        />
      </div>

      <div className="flex flex-col mt-20 ml-3">
        <button
          className="p-2 bg-slate-700 text-white mx-3 h-fit mb-5"
          onClick={onSave}
        >
          Save
        </button>
        <button
          className="p-2 bg-slate-700 text-white mx-3 h-fit mb-5"
          onClick={onRestore}
        >
          Restore
        </button>
        <button
          className="p-2 bg-slate-700 text-white mx-3 h-fit mb-5"
          onClick={onAdd}
        >
          Add Node
        </button>
        <label htmlFor="text">Text Colour:</label>
        <input
          type="color"
          id="text"
          value={textcolor}
          onChange={(e) => setTextcolor(e.target.value)}
        />
        <label htmlFor="background">Node Colour:</label>
        <input
          type="color"
          id="background"
          value={nodecolor}
          onChange={(e) => setNodecolor(e.target.value)}
        />
      </div>
    </div>
  );
};

const FWP = () => {
  
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="bg-blue-500 font-bold text-white text-2xl p-2">
        myDashboard
      </div>
      <div className="flex justify-evenly h-[80%] mt-2">
        <div className="rounded-xl bg-blue-500 text-white w-[15%]"><div className="mx-auto w-3/4 bg-blue-400 rounded-3xl mt-20 py-3 text-center cursor-pointer">Dashboard</div><div className="mx-auto w-3/4 mt-5 mb-5 py-3 hover:bg-blue-600 transition-colors rounded-3xl text-center cursor-pointer">Profile</div><div className="mx-auto w-3/4 mt-5 mb-5 py-3 hover:bg-blue-600 transition-colors rounded-3xl text-center cursor-pointer">Notifications</div><div className="mx-auto w-3/4 mt-5 mb-5 py-3 hover:bg-blue-600 transition-colors rounded-3xl text-center cursor-pointer">Settings</div></div>
        <div className="w-[80%] rounded-xl">
          <ReactFlowProvider>
            <SaveRestore />
          </ReactFlowProvider>
        </div>
      </div>
    </>
  );
};

export default FWP;