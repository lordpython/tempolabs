import React from "react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Save, History, RefreshCw, Play } from "lucide-react";

interface ActionToolbarProps {
  onSave?: () => void;
  onViewHistory?: () => void;
  onRefresh?: () => void;
  onPublish?: () => void;
  isSaving?: boolean;
  isPublishing?: boolean;
}

const ActionToolbar = ({
  onSave = () => {},
  onViewHistory = () => {},
  onRefresh = () => {},
  onPublish = () => {},
  isSaving = false,
  isPublishing = false,
}: ActionToolbarProps) => {
  return (
    <div className="w-full h-16 bg-background border-b flex items-center px-4 justify-between">
      <div className="flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onSave}
                disabled={isSaving}
              >
                <Save className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save changes</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={onViewHistory}>
                <History className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View history</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={onRefresh}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Refresh</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="default"
              onClick={onPublish}
              disabled={isPublishing}
              className="px-4"
            >
              <Play className="h-4 w-4 mr-2" />
              Publish
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Publish changes to live database</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ActionToolbar;
