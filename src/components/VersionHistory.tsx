import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Clock, RotateCcw } from "lucide-react";

interface Version {
  id: string;
  timestamp: string;
  changes: string;
}

interface VersionHistoryProps {
  isOpen?: boolean;
  onClose?: () => void;
  versions?: Version[];
  onVersionSelect?: (version: Version) => void;
}

const defaultVersions: Version[] = [
  {
    id: "1",
    timestamp: "2024-03-20 14:30:00",
    changes: "Updated user preferences",
  },
  {
    id: "2",
    timestamp: "2024-03-20 13:15:00",
    changes: "Modified product catalog",
  },
  {
    id: "3",
    timestamp: "2024-03-20 11:45:00",
    changes: "Added new category structure",
  },
];

const VersionHistory = ({
  isOpen = true,
  onClose = () => {},
  versions = defaultVersions,
  onVersionSelect = () => {},
}: VersionHistoryProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[400px] bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Version History
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[500px] w-full pr-4">
          <div className="space-y-4">
            {versions.map((version) => (
              <div
                key={version.id}
                className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => onVersionSelect(version)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {version.timestamp}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onVersionSelect(version);
                    }}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
                <p className="mt-2 text-sm">{version.changes}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default VersionHistory;
