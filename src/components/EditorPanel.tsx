import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { ScrollArea } from "./ui/scroll-area";
import { Save, Copy, Undo, Redo } from "lucide-react";

interface EditorPanelProps {
  content?: string;
  onSave?: (content: string) => void;
  onCopy?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
}

const EditorPanel = ({
  content = `{
  "example": {
    "key": "value",
    "nested": {
      "data": "here"
    }
  }
}`,

  onSave = () => {},
  onCopy = () => {},
  canUndo = false,
  canRedo = false,
  onUndo = () => {},
  onRedo = () => {},
}: EditorPanelProps) => {
  const [editorContent, setEditorContent] = useState(content);

  return (
    <Card className="h-full w-full bg-background border-0 rounded-none flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-semibold">JSON Editor</h2>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onUndo()}
                  disabled={!canUndo}
                >
                  <Undo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Undo</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onRedo()}
                  disabled={!canRedo}
                >
                  <Redo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Redo</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => onCopy()}>
                  <Copy className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy to Clipboard</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="default"
                  size="icon"
                  onClick={() => onSave(editorContent)}
                >
                  <Save className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Save Changes</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <ScrollArea className="flex-grow p-4">
        <textarea
          className="w-full h-full min-h-[500px] font-mono text-sm bg-muted/50 p-4 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          value={editorContent}
          onChange={(e) => setEditorContent(e.target.value)}
          spellCheck="false"
        />
      </ScrollArea>
    </Card>
  );
};

export default EditorPanel;
