import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

/**
 * Represents a single selectable item (e.g., a language, IDE, or OS).
 */
export interface TechnologyItem {
  id: string; // Unique identifier for the technology, e.g., "nodejs", "vscode"
  name: string; // Display name, e.g., "Node.js", "Visual Studio Code"
  description?: string; // Optional short description
}

/**
 * Represents a category of technology items.
 */
export interface TechnologyCategory {
  id: string; // Unique identifier for the category, e.g., "languages", "ides"
  name: string; // Display name for the category, e.g., "Programming Languages", "IDEs"
  items: TechnologyItem[]; // Array of technology items belonging to this category
}

interface TechnologySelectorProps {
  /**
   * An array of technology categories to display.
   * Each category contains a list of selectable items.
   */
  categories: TechnologyCategory[];
  /**
   * An array of IDs of the currently selected technology items.
   */
  selectedTechnologyIds: string[];
  /**
   * Callback function invoked when the selection changes.
   * It receives an array of the new selected technology IDs.
   * @param selectedIds - An array of strings representing the IDs of the selected technologies.
   */
  onSelectionChange: (selectedIds: string[]) => void;
  /**
   * Optional title for the selector card.
   */
  title?: string;
  /**
   * Optional description for the selector card.
   */
  description?: string;
}

const TechnologySelector: React.FC<TechnologySelectorProps> = ({
  categories,
  selectedTechnologyIds,
  onSelectionChange,
  title = "Select Technologies",
  description = "Choose items to include in your .gitignore file.",
}) => {
  console.log('TechnologySelector component loaded');

  const handleCheckboxChange = (itemId: string, isChecked: boolean) => {
    const newSelectedIds = new Set(selectedTechnologyIds);
    if (isChecked) {
      newSelectedIds.add(itemId);
    } else {
      newSelectedIds.delete(itemId);
    }
    onSelectionChange(Array.from(newSelectedIds));
  };

  // Determine default open accordion items - open all by default
  const defaultOpenAccordionItems = categories.map(category => category.id);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {categories.length === 0 ? (
          <p className="text-sm text-muted-foreground">No technologies available for selection.</p>
        ) : (
          <Accordion type="multiple" className="w-full" defaultValue={defaultOpenAccordionItems}>
            {categories.map((category) => (
              <AccordionItem key={category.id} value={category.id}>
                <AccordionTrigger className="text-base font-medium hover:no-underline">
                  {category.name}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-3 pt-2">
                    {category.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-2 p-2 rounded-md transition-colors hover:bg-muted/50"
                      >
                        <Checkbox
                          id={`tech-${category.id}-${item.id}`}
                          checked={selectedTechnologyIds.includes(item.id)}
                          onCheckedChange={(checked) => {
                            handleCheckboxChange(item.id, !!checked);
                          }}
                          aria-label={item.name}
                        />
                        <Label
                          htmlFor={`tech-${category.id}-${item.id}`}
                          className="text-sm font-normal cursor-pointer flex-grow"
                          title={item.description}
                        >
                          {item.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
};

export default TechnologySelector;