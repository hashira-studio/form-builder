"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface JsonInputProps {
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
}

export function JsonInput({ value, onChange, onGenerate }: JsonInputProps) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">JSON Structure</h2>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your JSON form structure here..."
        className="min-h-[400px] font-mono"
      />
      <Button 
        onClick={onGenerate}
        className="mt-4 w-full"
      >
        Generate Form
      </Button>
    </Card>
  );
}