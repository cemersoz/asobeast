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
      <DialogContent size="lg">
        <DialogHeader>
          <DialogTitle>How visibility is calculated</DialogTitle>
          <DialogDescription>
            A 0 to 100 score for how high your app ranks across its tracked
            keywords. 100 means first place for all of them.
          </DialogDescription>
        </DialogHeader>
        <DialogBody className="grid gap-6 text-sm sm:grid-cols-2">
          <div className="flex flex-col gap-4">
            <ol className="flex list-decimal flex-col gap-2 pl-6">
              <li>
                Each keyword earns 1 / log2(position + 1). Not found earns 0.
              </li>
              <li>Popular keywords count more.</li>
              <li>The score is the weighted average.</li>
            </ol>
            <p className="text-muted-foreground">
              Compare it over time, not between apps. Paused keywords are left
              out.
            </p>
          </div>
          <table className="numeric w-full self-start text-left">
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
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
