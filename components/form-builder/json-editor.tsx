"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { formSchema } from "@/lib/types";
import { formatJson } from "@/lib/utils";
import { Loader2, Wand2 } from "lucide-react";
import { FORM_EXAMPLES } from "@/lib/examples";

interface JsonEditorProps {
  onValidJson: (json: any) => void;
}

export function JsonEditor({ onValidJson }: JsonEditorProps) {
  const [jsonInput, setJsonInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (value: string) => {
    setJsonInput(value);
    toast.dismiss();
  };

  const handlePrettify = () => {
    try {
      const formattedJson = formatJson(jsonInput);
      setJsonInput(formattedJson);
      toast.success("JSON formatted successfully!");
    } catch (error) {
      toast.error("Invalid JSON structure");
    }
  };

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      const formattedJson = formatJson(jsonInput);
      setJsonInput(formattedJson);
      const parsedJson = JSON.parse(formattedJson);
      const validatedConfig = formSchema.parse(parsedJson);
      await new Promise(resolve => setTimeout(resolve, 500));
      onValidJson(validatedConfig);
      toast.success("Form generated successfully!");
    } catch (error) {
      if (error instanceof SyntaxError) {
        const errorMessage = error.message.replace(/^JSON\.parse: /, '');
        toast.error(`JSON Syntax Error: ${errorMessage}`);
      } else if (error instanceof Error) {
        toast.error(`Validation Error: ${error.message}`);
      } else {
        toast.error("Invalid JSON structure");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const loadExample = (key: keyof typeof FORM_EXAMPLES) => {
    const example = FORM_EXAMPLES[key];
    const formattedExample = JSON.stringify(example.value, null, 2);
    setJsonInput(formattedExample);
  };

  const isJsonEmpty = !jsonInput.trim();

  return (
    <Card className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold">JSON Structure</h2>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="flex-1 sm:flex-none">
            <Select onValueChange={loadExample}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Load example" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(FORM_EXAMPLES).map(([key, example]) => (
                  <SelectItem key={key} value={key}>
                    {example.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button 
            variant="outline"
            onClick={handlePrettify}
            className="w-full sm:w-auto"
            disabled={isJsonEmpty || isGenerating}
          >
            <Wand2 className="w-4 h-4 mr-2" />
            Prettify JSON
          </Button>
        </div>
      </div>
      <Textarea
        value={jsonInput}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Paste your JSON form structure here..."
        className="min-h-[300px] sm:min-h-[400px] font-mono text-sm mb-4"
        disabled={isGenerating}
      />
      <Button 
        onClick={handleGenerate}
        className="w-full"
        disabled={isJsonEmpty || isGenerating}
        size="lg"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          'Generate Form'
        )}
      </Button>
    </Card>
  );
}