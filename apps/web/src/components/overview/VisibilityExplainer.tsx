"use client";

import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const EXAMPLE_POSITIONS = [1, 2, 3, 5, 10, 20, 50, 100];

const positionShare = (position: number): number =>
  Math.round(100 / Math.log2(position + 1));

export function VisibilityExplainer() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="How visibility is calculated"
          className="print:hidden"
        >
          <Info aria-hidden className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>How visibility is calculated</DialogTitle>
          <DialogDescription>
            A score from 0 to 100 for how close to the top of search your app
            sits across its tracked keywords. 100 means first place for every
            one of them.
          </DialogDescription>
        </DialogHeader>
        <DialogBody className="flex flex-col gap-4 text-sm">
          <ol className="flex list-decimal flex-col gap-2 pl-6">
            <li>
              Every active tracked keyword earns a share from its position, 1 /
              log2(position + 1). A keyword your app was not found for earns
              nothing and still counts.
            </li>
            <li>
              Each share is weighted by the keyword&apos;s popularity, so a
              popular keyword moves the score more. A keyword that has no
              popularity score yet barely counts.
            </li>
            <li>The score is the weighted average of those shares.</li>
          </ol>
          <table className="numeric w-full text-left">
            <caption className="pb-2 text-left text-muted-foreground">
              What one keyword earns at each position
            </caption>
            <thead>
              <tr className="border-b text-muted-foreground">
                <th scope="col" className="py-1 font-medium">
                  Position
                </th>
                <th scope="col" className="py-1 font-medium">
                  Share
                </th>
              </tr>
            </thead>
            <tbody>
              {EXAMPLE_POSITIONS.map((position) => (
                <tr key={position} className="border-b last:border-b-0">
                  <td className="py-1 font-mono">{position}</td>
                  <td className="py-1 font-mono">{positionShare(position)}%</td>
                </tr>
              ))}
              <tr>
                <td className="py-1">Not found</td>
                <td className="py-1 font-mono">0%</td>
              </tr>
            </tbody>
          </table>
          <p className="text-muted-foreground">
            The score depends on which keywords you track, so compare it with
            itself over time and not between apps. Tracking keywords your app
            does not rank for lowers it, and paused keywords are left out.
          </p>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
