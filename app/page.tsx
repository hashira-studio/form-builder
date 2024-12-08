"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileCode, Eye } from "lucide-react";
import { JsonEditor } from "@/components/form-builder/json-editor";
import { PreviewForm } from "@/components/form-builder/preview-form";
import { CodePreview } from "@/components/form-builder/code-preview";
import { generateFormCode } from "@/lib/form-generator";
import type { FormConfig } from "@/lib/types";

export default function Home() {
  const [generatedCode, setGeneratedCode] = useState("");
  const [formConfig, setFormConfig] = useState<FormConfig | null>(null);

  const handleValidJson = (config: FormConfig) => {
    setFormConfig(config);
    const code = generateFormCode(config);
    setGeneratedCode(code);
  };

  return (
    <main className="container mx-auto py-4 sm:py-8 px-4">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center">Form Builder</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        <div className="order-1 lg:order-none">
          <JsonEditor onValidJson={handleValidJson} />
        </div>

        <Card className="p-4 sm:p-6 order-2 lg:order-none">
          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="mb-4 w-full justify-start">
              <TabsTrigger value="preview" className="flex-1 sm:flex-none items-center gap-2">
                <Eye className="w-4 h-4 hidden sm:inline" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="code" className="flex-1 sm:flex-none items-center gap-2">
                <FileCode className="w-4 h-4 hidden sm:inline" />
                Code
              </TabsTrigger>
            </TabsList>

            <TabsContent value="preview">
              <div className="min-h-[400px] p-2 sm:p-4 border rounded-lg">
                {formConfig ? (
                  <PreviewForm config={formConfig} />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground text-sm sm:text-base">
                    Generate a form to see the preview
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="code">
              <CodePreview code={generatedCode} />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </main>
  );
}