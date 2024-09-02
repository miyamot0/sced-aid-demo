import { SCDDecisionNode } from "@/hooks/use-storage";
import methodology_nodes from "@/node-tree/methodology.json";

export const MethodologyNodes = methodology_nodes.map((node) => {
  return {
    ...node,
    category: "methodology",
    Yes: node.Yes.trim().length > 0 ? node.Yes : undefined,
    No: node.No.trim().length > 0 ? node.No : undefined,
    Resources: node.Resources.trim().length > 0 ? node.Resources : undefined,
    End: node.End === "TRUE",
  } satisfies SCDDecisionNode;
});
