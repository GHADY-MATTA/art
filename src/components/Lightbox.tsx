import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

type Props = {
  src: string;
  alt?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function Lightbox({ src, alt = "", open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-0 p-0 bg-black/90 max-w-[96vw] sm:max-w-[90vw] md:max-w-[80vw]">
        <button
          type="button"
          aria-label="Close"
          onClick={() => onOpenChange(false)}
          className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative">
          <img
            src={src}
            alt={alt}
            className="max-h-[90vh] w-full object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
