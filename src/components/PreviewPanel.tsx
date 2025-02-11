import React from "react";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface PreviewPanelProps {
  data?: any;
  isLoading?: boolean;
}

const PreviewPanel = ({
  data = { example: { nested: "value" } },
  isLoading = false,
}: PreviewPanelProps) => {
  return (
    <Card className="h-full w-full bg-white border-l">
      <div className="p-4 h-full flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Preview</h2>

        <Tabs defaultValue="tree" className="flex-1">
          <TabsList className="mb-4">
            <TabsTrigger value="tree">Tree View</TabsTrigger>
            <TabsTrigger value="raw">Raw</TabsTrigger>
          </TabsList>

          <TabsContent value="tree" className="h-[calc(100%-2rem)]">
            <ScrollArea className="h-full rounded-md border p-4">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
                </div>
              ) : (
                <div className="space-y-2">{renderTreeView(data)}</div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="raw" className="h-[calc(100%-2rem)]">
            <ScrollArea className="h-full rounded-md border bg-gray-50 p-4">
              <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};

const renderTreeView = (data: any, depth = 0) => {
  if (typeof data !== "object" || data === null) {
    return (
      <div className="text-sm" style={{ marginLeft: `${depth * 1.5}rem` }}>
        <span className="text-gray-500">{String(data)}</span>
      </div>
    );
  }

  return Object.entries(data).map(([key, value]) => (
    <div key={key}>
      <div
        className="text-sm font-medium"
        style={{ marginLeft: `${depth * 1.5}rem` }}
      >
        {key}:
      </div>
      {renderTreeView(value, depth + 1)}
    </div>
  ));
};

export default PreviewPanel;
