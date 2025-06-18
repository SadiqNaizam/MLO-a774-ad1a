import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import RuleExplanationDisplay from '@/components/RuleExplanationDisplay'; // Custom component
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { GitBranch, Github, HelpCircle, Settings2, FileText } from 'lucide-react';

interface AnalyzedRule {
  id: string;
  rule: string;
  explanation: string;
}

const AnalyzerPage = () => {
  const [gitIgnoreContent, setGitIgnoreContent] = useState<string>('');
  const [analyzedRules, setAnalyzedRules] = useState<AnalyzedRule[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log('AnalyzerPage loaded');

  const handleAnalyze = () => {
    if (!gitIgnoreContent.trim()) {
      setAnalyzedRules([]);
      return;
    }
    setIsLoading(true);
    // Simulate analysis delay
    setTimeout(() => {
      const lines = gitIgnoreContent.split('\n').filter(line => line.trim() !== '' && !line.trim().startsWith('#'));
      const rules: AnalyzedRule[] = lines.map((line, index) => {
        let explanation = "This rule's specific effect depends on Git's pattern matching rules. ";
        if (line.endsWith('/')) {
          explanation += `It typically ignores a directory named '${line.slice(0, -1)}' and its contents.`;
        } else if (line.startsWith('*.')) {
          explanation += `It ignores all files with the '${line.substring(2)}' extension.`;
        } else if (line.includes('*')) {
          explanation += "The asterisk '*' acts as a wildcard for any sequence of characters.";
        } else {
          explanation += `It ignores files or directories named '${line}'.`;
        }
        if (line.startsWith('!')) {
            explanation = `The exclamation mark '!' negates a previous pattern. This rule re-includes files or directories matching '${line.substring(1)}' that might have been excluded by a prior rule.`;
        }
        return {
          id: `${index}-${Date.now()}`,
          rule: line,
          explanation: explanation,
        };
      });
      setAnalyzedRules(rules);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-gray-100">
      {/* Header */}
      <header className="py-4 px-6 shadow-md bg-slate-900/80 backdrop-blur-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-sky-400 hover:text-sky-300 transition-colors">
            <GitBranch className="h-8 w-8" />
            <span>GitIgnore.Dev</span>
          </Link>
          <nav className="space-x-4 flex items-center">
            <Link to="/" className="text-gray-300 hover:text-sky-400 transition-colors flex items-center space-x-1">
              <Settings2 className="h-4 w-4" /> <span>Generator</span>
            </Link>
            <Link to="/analyzer" className="text-sky-400 font-semibold flex items-center space-x-1">
              <FileText className="h-4 w-4" /> <span>Analyzer</span>
            </Link>
            <Link to="/templates" className="text-gray-300 hover:text-sky-400 transition-colors flex items-center space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-list"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/><line x1="14" x2="21" y1="4" y2="4"/><line x1="14" x2="21" y1="9" y2="9"/><line x1="14" x2="21" y1="15" y2="15"/><line x1="14" x2="21" y1="20" y2="20"/></svg>
                <span>Templates</span>
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-sky-400 transition-colors flex items-center space-x-1">
              <HelpCircle className="h-4 w-4" /> <span>About</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8 flex flex-col items-center">
        <Card className="w-full max-w-3xl bg-slate-800 border-slate-700 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-sky-400">.gitignore Analyzer</CardTitle>
            <CardDescription className="text-gray-400 mt-2">
              Paste your .gitignore content below to get an explanation of each rule.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="gitignore-input" className="block text-sm font-medium mb-1 text-gray-300">
                .gitignore Content:
              </Label>
              <Textarea
                id="gitignore-input"
                value={gitIgnoreContent}
                onChange={(e) => setGitIgnoreContent(e.target.value)}
                placeholder="Paste your .gitignore content here...\n\n# Lines starting with '#' are comments\nnode_modules/\n*.log\n!important.log"
                rows={10}
                className="w-full bg-slate-700 border-slate-600 text-gray-200 focus:ring-sky-500 focus:border-sky-500 placeholder-gray-500 font-mono text-sm"
              />
            </div>
            <Button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 text-base transition-all duration-150 ease-in-out transform active:scale-95"
            >
              {isLoading ? 'Analyzing...' : 'Analyze Content'}
            </Button>

            {analyzedRules.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-sky-400">Analysis Results:</h2>
                <ScrollArea className="h-[400px] w-full border border-slate-700 rounded-md p-4 bg-slate-900/50">
                  {analyzedRules.map((item) => (
                    <RuleExplanationDisplay
                      key={item.id}
                      rule={item.rule}
                      explanation={item.explanation}
                    />
                  ))}
                </ScrollArea>
              </div>
            )}
            {!isLoading && analyzedRules.length === 0 && gitIgnoreContent.trim() !== '' && (
                 <p className="text-center text-gray-400 mt-4">No rules found to analyze. Make sure your content is not empty or only comments.</p>
            )}
             {!isLoading && analyzedRules.length === 0 && gitIgnoreContent.trim() === '' && (
                 <p className="text-center text-gray-400 mt-4">Enter some .gitignore content above and click "Analyze Content".</p>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 text-center bg-slate-900/80 border-t border-slate-700">
        <div className="container mx-auto text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} GitIgnore.Dev. All rights reserved.</p>
          <p className="mt-1">
            <Link to="/about" className="hover:text-sky-400 transition-colors">About</Link> | 
            <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer" className="ml-2 hover:text-sky-400 transition-colors flex items-center justify-center">
              <Github className="h-4 w-4 mr-1" /> GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AnalyzerPage;