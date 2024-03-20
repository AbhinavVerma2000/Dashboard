import { useState } from "react";
import { Handle, Position, } from "reactflow";

const TextUpdaterNode=({ data })=> {
    const [display, setDisplay] = useState()
    return (
      <div className="text-updater-node">
        <Handle type="target" position={Position.Left} isConnectable={true} />
        <div id='text' onMouseEnter={()=>{}} onMouseLeave={()=>{}}>
          {data}
        </div>
        <Handle
          type="source"
          position={Position.Right}
          id="a"
          isConnectable={true}
        />
      </div>
    );
  }
  export default TextUpdaterNode;