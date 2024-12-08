"use client";

import { Button } from "@/components/ui/button";
import { Github, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-8">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with <Heart className="inline-block h-4 w-4 text-red-500" /> by{" "}
            <a
              href="https://hashirastudio.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4 hover:text-primary"
            >
              Hashira Studio
            </a>
            . © {currentYear} All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="h-9"
            onClick={() => window.open("https://github.com/hashirastudio/form-builder", "_blank")}
          >
            <Github className="mr-2 h-4 w-4" />
            Support on GitHub
          </Button>
        </div>
      </div>
    </footer>
  );
}