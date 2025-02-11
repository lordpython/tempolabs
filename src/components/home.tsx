import React, { useState, useEffect } from "react";
import {
  subscribeToDatabase,
  getNodeData,
  updateNodeData,
} from "@/lib/database";
import { DatabaseNode } from "@/lib/database";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import DatabaseSidebar from "./DatabaseSidebar";
import EditorPanel from "./EditorPanel";
import PreviewPanel from "./PreviewPanel";
import ActionToolbar from "./ActionToolbar";
import VersionHistory from "./VersionHistory";

interface HomeProps {
  initialData?: any;
}

const Home = ({
  initialData = { example: { nested: "value" } },
}: HomeProps) => {
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [treeData, setTreeData] = useState<DatabaseNode[]>([]);
  const [currentPath, setCurrentPath] = useState<string>("");
  const [currentData, setCurrentData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToDatabase(setTreeData);
    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    if (!currentPath) return;

    setIsSaving(true);
    try {
      await updateNodeData(currentPath, currentData);
    } catch (error) {
      console.error("Error saving data:", error);
    }
    setIsSaving(false);
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    // Simulate publish operation
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsPublishing(false);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <ActionToolbar
        onSave={handleSave}
        onViewHistory={() => setShowVersionHistory(true)}
        onRefresh={() => {}}
        onPublish={handlePublish}
        isSaving={isSaving}
        isPublishing={isPublishing}
      />

      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={20} minSize={15}>
          <DatabaseSidebar
            data={treeData}
            onNodeSelect={async (node) => {
              if (node.type === "file") {
                setIsLoading(true);
                setCurrentPath(node.id);
                try {
                  const data = await getNodeData(node.id);
                  setCurrentData(data);
                } catch (error) {
                  console.error("Error fetching node data:", error);
                }
                setIsLoading(false);
              }
            }}
          />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={40} minSize={30}>
          <EditorPanel
            content={JSON.stringify(currentData, null, 2)}
            onSave={(content) => {
              try {
                const parsed = JSON.parse(content);
                setCurrentData(parsed);
              } catch (e) {
                console.error("Invalid JSON");
              }
            }}
          />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={40} minSize={30}>
          <PreviewPanel data={currentData} isLoading={isLoading} />
        </ResizablePanel>
      </ResizablePanelGroup>

      <VersionHistory
        isOpen={showVersionHistory}
        onClose={() => setShowVersionHistory(false)}
        onVersionSelect={(version) => {
          console.log("Selected version:", version);
          setShowVersionHistory(false);
        }}
      />
    </div>
  );
};

export default Home;
