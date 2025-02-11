import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronRight,
  Database,
  Folder,
  File,
} from "lucide-react";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";

interface TreeNode {
  id: string;
  name: string;
  type: "folder" | "file";
  children?: TreeNode[];
}

interface DatabaseSidebarProps {
  data?: TreeNode[];
  onNodeSelect?: (node: TreeNode) => void;
}

const defaultData: TreeNode[] = [
  {
    id: "1",
    name: "users",
    type: "folder",
    children: [
      {
        id: "2",
        name: "profiles",
        type: "file",
      },
      {
        id: "3",
        name: "settings",
        type: "file",
      },
    ],
  },
  {
    id: "4",
    name: "products",
    type: "folder",
    children: [
      {
        id: "5",
        name: "inventory",
        type: "file",
      },
    ],
  },
];

const TreeNode: React.FC<{
  node: TreeNode;
  level: number;
  onSelect: (node: TreeNode) => void;
}> = ({ node, level, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSelect = () => {
    onSelect(node);
  };

  return (
    <div>
      <div
        className={`flex items-center py-1 px-2 hover:bg-gray-100 cursor-pointer`}
        style={{ paddingLeft: `${level * 12}px` }}
        onClick={handleSelect}
      >
        {node.type === "folder" && (
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4"
            onClick={(e) => {
              e.stopPropagation();
              handleToggle();
            }}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        )}
        {node.type === "folder" ? (
          <Folder className="h-4 w-4 mr-2 text-blue-500" />
        ) : (
          <File className="h-4 w-4 mr-2 text-gray-500" />
        )}
        <span className="text-sm">{node.name}</span>
      </div>
      {node.children && isExpanded && (
        <div>
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const DatabaseSidebar: React.FC<DatabaseSidebarProps> = ({
  data = defaultData,
  onNodeSelect = () => {},
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-80 h-full border-r bg-white flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2 mb-4">
          <Database className="h-5 w-5 text-blue-500" />
          <h2 className="font-semibold">Database Explorer</h2>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search database..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          {data.map((node) => (
            <TreeNode
              key={node.id}
              node={node}
              level={0}
              onSelect={onNodeSelect}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default DatabaseSidebar;
