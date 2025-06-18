import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, FilePlus2 } from 'lucide-react';

export interface GitignoreTemplate {
  id: string;
  name: string;
  description: string;
  // category?: string; // Example: 'Language', 'IDE', 'OS'
  // content?: string; // Full template content, might be used by onUseTemplate or onView
}

interface TemplateCardProps {
  template: GitignoreTemplate;
  onView: (templateId: string) => void;
  onUseTemplate: (templateId: string) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onView, onUseTemplate }) => {
  console.log(`TemplateCard loaded for: ${template.name}`);

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{template.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-sm text-gray-600 line-clamp-3">
          {template.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="border-t p-4 bg-gray-50">
        <div className="flex w-full justify-between items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(template.id)}
            aria-label={`View details for ${template.name} template`}
            className="flex-1"
          >
            <Eye className="mr-2 h-4 w-4" />
            View
          </Button>
          <Button
            size="sm"
            onClick={() => onUseTemplate(template.id)}
            aria-label={`Use ${template.name} template`}
            className="flex-1"
          >
            <FilePlus2 className="mr-2 h-4 w-4" />
            Use Template
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TemplateCard;