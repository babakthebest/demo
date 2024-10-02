import React from "react";
import AddNodeOnEdgeDropWrapper from "./myGraph";
type ParamsWithCode = {
  params: {
    code: number;
  };
};

export default function page({ params: { code } }: ParamsWithCode) {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="h-[10%] w-full border-b border-b-slate-500 border-opacity-10 dark:border-opacity-60">
        {/* <TreeFormHeader code={code}></TreeFormHeader> */}
      </div>
      <div className="flex h-full w-full items-center justify-center">
        {/* <div className="h-[90%] w-[70%] rounded-xl border border-white/20 bg-white bg-opacity-10 p-6 text-slate-950 shadow-lg backdrop-blur-md dark:text-slate-50">
          <TreeDetail code={code} />
        </div> */}
        <AddNodeOnEdgeDropWrapper />
      </div>
    </div>
  );
}
