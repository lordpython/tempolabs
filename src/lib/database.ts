import {
  ref,
  get,
  set,
  onValue,
  off,
  DatabaseReference,
} from "firebase/database";
import { db } from "./firebase";

export interface DatabaseNode {
  id: string;
  name: string;
  type: "folder" | "file";
  children?: DatabaseNode[];
  value?: any;
}

export const convertToTreeStructure = (
  data: any,
  path = "",
): DatabaseNode[] => {
  if (!data) return [];

  return Object.entries(data).map(([key, value]) => {
    const isObject = typeof value === "object" && value !== null;
    return {
      id: path ? `${path}/${key}` : key,
      name: key,
      type: isObject ? "folder" : "file",
      ...(isObject
        ? {
            children: convertToTreeStructure(
              value,
              path ? `${path}/${key}` : key,
            ),
          }
        : { value }),
    };
  });
};

export const subscribeToDatabase = (
  callback: (data: DatabaseNode[]) => void,
) => {
  const dbRef = ref(db, "/");

  onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    const treeData = convertToTreeStructure(data);
    callback(treeData);
  });

  return () => off(dbRef);
};

export const getNodeData = async (path: string) => {
  const nodeRef = ref(db, path);
  const snapshot = await get(nodeRef);
  return snapshot.val();
};

export const updateNodeData = async (path: string, data: any) => {
  const nodeRef = ref(db, path);
  await set(nodeRef, data);
};
