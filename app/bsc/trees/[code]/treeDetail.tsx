"use client";
import useTreeDataStore from "../../components/treelist/useTreeDataStore";
import DefaultTreeDetails from "./DefaultTreeDetails";
import Treeform from "./Treeform";

export default function TreeDetail({ code }: { code: number }) {
  const { showAddChildForm, showEditForm } = useTreeDataStore();

  if (showAddChildForm || showEditForm) {
    return <Treeform code={code} />;
  } else {
    return <DefaultTreeDetails code={code} />;
  }
}
