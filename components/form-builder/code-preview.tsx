"use client";

import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

interface CodePreviewProps {
  code: string;
}

export function CodePreview({ code }: CodePreviewProps) {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const loadPrism = async () => {
      const Prism = (await import('prismjs')).default;
      await import('prismjs/components/prism-typescript');
      await import('prismjs/components/prism-jsx');
      await import('prismjs/components/prism-tsx');
      
      if (codeRef.current) {
        Prism.highlightElement(codeRef.current);
      }
    };

    loadPrism();
  }, [code]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard!");
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-2 z-10"
        onClick={copyToClipboard}
      >
        <Copy className="w-4 h-4" />
      </Button>
      <pre className="min-h-[300px] sm:min-h-[400px] p-2 sm:p-4 bg-[#24292e] rounded-lg overflow-auto text-sm">
        <code ref={codeRef} className="language-tsx">
          {code || "// Generate a form to see the code"}
        </code>
      </pre>
    </div>
  );
}