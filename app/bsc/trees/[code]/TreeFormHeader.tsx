"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import useTreeDataStore from "../../components/treelist/useTreeDataStore";

export default function TreeFormHeader({ code }: { code: number }) {
  const {
    treeData,
    deleteNode,
    setShowAddChildForm,
    showAddChildForm,
    showEditForm,
    setShowAddEditForm,
    setShowDefaultForm,
  } = useTreeDataStore();
  async function removeNodeFromStateAndDb(code: number) {
    deleteNode(code);
  }

  return (
    <div className="flex h-full w-full justify-between">
      {" "}
      <div className="flex h-full w-full items-center justify-start gap-3 p-6">
        <Button className={`${showEditForm ? "shining-gradient-bg" : ""} `} onClick={() => setShowAddEditForm(true)}>
          Edit
        </Button>
        <Button
          className={`${showAddChildForm ? "shining-gradient-bg" : ""} `}
          onClick={() => setShowAddChildForm(true)}
        >
          Add Child
        </Button>
        <Button className="bg-my-gradient-1" onClick={() => removeNodeFromStateAndDb(code)}>
          Delete
        </Button>
      </div>
      <div className="flex h-full items-center pr-2">
        {(showEditForm || showAddChildForm) && (
          <Button className="bg-my-gradient-1" onClick={() => setShowDefaultForm(true)}>
            Cancle
          </Button>
        )}
      </div>
    </div>
  );
}
