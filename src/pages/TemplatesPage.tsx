import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TemplateCard, { GitignoreTemplate } from '@/components/TemplateCard';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Files, Search, Info, Settings, Home } from 'lucide-react';

const ITEMS_PER_PAGE = 9;

const initialTemplates: GitignoreTemplate[] = [
  { id: 'node', name: 'Node.js', description: 'A comprehensive .gitignore for Node.js projects, including common files like node_modules, .env, and logs.' },
  { id: 'python-django', name: 'Python (Django)', description: 'Template for Python Django projects, ignoring __pycache__, .env, staticfiles, media files, and virtual environment folders.' },
  { id: 'react', name: 'React (Create React App)', description: 'Standard .gitignore for projects bootstrapped with Create React App, covering build artifacts and local development files.' },
  { id: 'vscode', name: 'Visual Studio Code', description: 'Ignores VSCode specific workspace settings, history, and extension files stored in .vscode directory.' },
  { id: 'java-maven', name: 'Java (Maven)', description: 'Typical .gitignore for Java projects using Maven, ignoring target directories, IDE files, and log files.' },
  { id: 'ruby-rails', name: 'Ruby on Rails', description: 'Common .gitignore for Ruby on Rails applications, ignoring logs, tmp directories, and environment files.' },
  { id: 'go', name: 'Go', description: 'A .gitignore template for Go projects, ignoring build executables and vendor directories if using Go modules.' },
  { id: 'swift', name: 'Swift (iOS/macOS)', description: 'Template for Swift projects, especially for Xcode, ignoring build outputs and user-specific settings.' },
  { id: 'android', name: 'Android (Android Studio)', description: 'Standard .gitignore for Android projects, ignoring build folders, local properties, and IDE files.' },
  { id: 'unity', name: 'Unity', description: 'For Unity game development projects, ignoring Library, Temp, Obj, Build, and user settings.' },
  { id: 'macos', name: 'macOS', description: 'Ignores common macOS system files like .DS_Store, .Spotlight-V100, and .Trashes.' },
  { id: 'windows', name: 'Windows', description: 'Ignores common Windows system files like Thumbs.db, desktop.ini, and various log files.' },
  { id: 'linux', name: 'Linux', description: 'General .gitignore for Linux systems, ignoring common temporary and backup files.' },
  { id: 'docker', name: 'Docker', description: 'Ignores files related to Docker development, such as .dockerignore itself (if handled elsewhere) and local Docker volumes.' },
  { id: 'terraform', name: 'Terraform', description: 'For Terraform infrastructure-as-code projects, ignoring .terraform directories, plan files, and state file backups.' },
];

const TemplatesPage = () => {
  console.log('TemplatesPage loaded');
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [allTemplates] = useState<GitignoreTemplate[]>(initialTemplates);

  useEffect(() => {
    // Reset to first page if search term changes and current page becomes invalid
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredTemplates = useMemo(() => {
    return allTemplates.filter(template =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allTemplates, searchTerm]);

  const totalPages = Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE);

  const currentTemplates = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTemplates.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTemplates, currentPage]);

  const handleViewTemplate = (templateId: string) => {
    const template = allTemplates.find(t => t.id === templateId);
    toast.info(`Viewing template: ${template?.name}`, {
      description: template?.description,
    });
    // In a real app, this might open a modal with template content or navigate to a detail page.
    console.log('View template:', templateId);
  };

  const handleUseTemplate = (templateId: string) => {
    const template = allTemplates.find(t => t.id === templateId);
    toast.success(`Template "${template?.name}" selected!`, {
      description: "You can now use this template in the generator.",
      action: {
        label: "Go to Generator",
        onClick: () => navigate('/'), // Navigate to GeneratorPage
      },
    });
    // In a real app, this might copy the template content or navigate to the generator page with the template pre-selected.
    console.log('Use template:', templateId);
    // Potentially, navigate to GeneratorPage with templateId as a query param or state
    // navigate(`/?template=${templateId}`);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-gray-800/95">
        <div className="container flex h-14 items-center">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <Files className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block">Gitignore.io Clone</span>
          </Link>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Home className="mr-2 h-4 w-4" /> Generator
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/templates" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                     <Files className="mr-2 h-4 w-4" /> Templates
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/analyzer" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Search className="mr-2 h-4 w-4" /> Analyzer
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Info className="mr-2 h-4 w-4" /> About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
           <div className="flex flex-1 items-center justify-end space-x-2">
            {/* Future: Theme Toggle, User Profile */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">.gitignore Templates</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Browse and select from a curated list of .gitignore templates for various technologies and tools.
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-8 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search templates (e.g., Node, Python, VSCode)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 h-11 text-base"
            />
          </div>
        </div>

        {/* Templates Grid */}
        {currentTemplates.length > 0 ? (
          <ScrollArea className="h-[calc(100vh-400px)] pr-4"> {/* Adjust height as needed */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentTemplates.map(template => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onView={handleViewTemplate}
                  onUseTemplate={handleUseTemplate}
                />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-xl font-medium text-gray-900 dark:text-white">No templates found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Your search for "{searchTerm}" did not match any templates. Try a different keyword.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : undefined}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  // Basic pagination display logic (can be expanded for more complex scenarios)
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => { e.preventDefault(); handlePageChange(pageNum); }}
                          isActive={currentPage === pageNum}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  } else if (
                    (pageNum === currentPage - 2 && currentPage > 3) ||
                    (pageNum === currentPage + 2 && currentPage < totalPages - 2)
                  ) {
                    return <PaginationEllipsis key={`ellipsis-${pageNum}`} />;
                  }
                  return null;
                })}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : undefined}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </main>

      {/* Footer Section */}
      <footer className="py-8 text-center border-t bg-gray-100 dark:bg-gray-800">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Gitignore.io Clone. Built for demonstration.
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            Inspired by <a href="https://gitignore.io" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">gitignore.io</a> and <a href="https://toptal.com/developers/gitignore" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">toptal.com/developers/gitignore</a>.
        </p>
      </footer>
    </div>
  );
};

export default TemplatesPage;