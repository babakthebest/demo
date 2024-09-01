import React from "react";
import TreeDetail from "./treeDetail";
type ParamsWithCode = {
  params: {
    code: number;
  };
};

export default function page({ params: { code } }: ParamsWithCode) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-[90%] w-[70%] rounded-xl border border-white/20 bg-white bg-opacity-10 p-6 text-slate-50 shadow-lg backdrop-blur-md">
        <TreeDetail code={code} />
      </div>
    </div>
  );
}
