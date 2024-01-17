import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Expand, Loader2 } from "lucide-react";
import SimpleBar from "simplebar-react";
import { useToast } from "./ui/use-toast";
import { Document, Page } from "react-pdf";
import { useResizeDetector } from "react-resize-detector";

interface PdfFullScreenProps {
  fileUrl: string;
}

const PdfFullScreen = ({ fileUrl }: PdfFullScreenProps) => {
  const { toast } = useToast();
  const { width, ref } = useResizeDetector();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [numPages, setNumPages] = useState<number>();
  const [currPage, setCurrPage] = useState<number>(1);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) setIsOpen(v);
      }}
    >
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        <Button aria-label="fullscreen" variant={"ghost"} className="gap-1.5">
          <Expand className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl w-full">
        <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)] mt-6">
          <div ref={ref}>
            <Document
              file={fileUrl}
              className="max-h-full"
              loading={
                <div className="flex justify-center">
                  <Loader2 className="my-24 h-6 w-6 animate-spin" />
                </div>
              }
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              onLoadError={() => {
                toast({
                  title: "Error loading PDF",
                  description: "Please try again later",
                  variant: "destructive",
                });
              }}
            >
              {new Array(numPages).fill(0).map((_, index) => (
                <Page key={index} width={width ?? 1} pageNumber={index + 1} />
              ))}
            </Document>
          </div>
        </SimpleBar>
      </DialogContent>
    </Dialog>
  );
};

export default PdfFullScreen;
