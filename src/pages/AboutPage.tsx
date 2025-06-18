import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Github, BookText, Settings2, LayoutList } from 'lucide-react'; // Icons for navigation

const AboutPage = () => {
  console.log('AboutPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            .gitignore Helper
          </Link>
          <div className="space-x-2 md:space-x-4">
            <Link
              to="/"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
            >
              <Settings2 className="mr-1 h-4 w-4" /> Generator
            </Link>
            <Link
              to="/templates"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
            >
              <LayoutList className="mr-1 h-4 w-4" /> Templates
            </Link>
            <Link
              to="/analyzer"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
            >
              <BookText className="mr-1 h-4 w-4" /> Analyzer
            </Link>
            <Link
              to="/about"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 px-3 py-2 rounded-md text-sm flex items-center"
            >
              About
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <ScrollArea className="flex-grow">
        <main className="container mx-auto px-4 py-8 md:py-12">
          <Card className="w-full max-w-3xl mx-auto shadow-xl dark:bg-gray-800">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-800 dark:text-gray-100">About .gitignore Helper</CardTitle>
              <CardDescription className="text-md text-gray-600 dark:text-gray-400 mt-2">
                Streamlining .gitignore file management for developers.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed p-6 md:p-8">
              <section>
                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Our Mission</h2>
                <p>
                  Welcome to .gitignore Helper! Our mission is to simplify the creation, understanding, and management of 
                  <code>.gitignore</code> files for developers. We aim to provide intuitive tools that help you generate 
                  tailored ignore files for your projects, prevent accidental commits of unwanted files, and promote cleaner, 
                  more efficient repositories.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">How to Use Our Tools</h2>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>
                    <strong>Generator:</strong> Navigate to the <Link to="/" className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300">Generator</Link> page. 
                    Select the technologies, frameworks, IDEs, and operating systems relevant to your project. 
                    Instantly, a comprehensive <code>.gitignore</code> file will be crafted for you. You can then copy it or download it.
                  </li>
                  <li>
                    <strong>Templates:</strong> Explore our <Link to="/templates" className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300">Templates</Link> section 
                    to find pre-configured <code>.gitignore</code> files for common project types and setups. 
                    This is great for a quick start or for finding specific configurations.
                  </li>
                  <li>
                    <strong>Analyzer:</strong> Got an existing <code>.gitignore</code> file? Use our <Link to="/analyzer" className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300">Analyzer</Link> tool 
                    (or upcoming feature) to paste your content and get insights into its rules, helping you understand what each line does.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Inspiration</h2>
                <p>
                  This tool is inspired by the invaluable service provided by <a href="https://www.toptal.com/developers/gitignore" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300">gitignore.io</a> (from Toptal) 
                  and the collective wisdom of the developer community regarding best practices for ignoring files. We strive to build upon these foundations to offer a user-friendly experience.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Acknowledgements & Contact</h2>
                <p>
                  .gitignore Helper is a project built with passion for the developer community. 
                  We welcome feedback, suggestions, and contributions!
                </p>
                <p className="mt-2">
                  You can find the source code and contribute on <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300 flex items-center">
                    <Github className="mr-1 h-4 w-4" /> GitHub (placeholder link)
                  </a>.
                </p>
                <p className="mt-1">
                  For direct inquiries or support, please contact us at: <a href="mailto:contact@example.com" className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300">contact@example.com</a> (placeholder email).
                </p>
              </section>
            </CardContent>
          </Card>
        </main>
      </ScrollArea>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} .gitignore Helper. All rights reserved.
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
          Helping you keep your repositories clean.
        </p>
      </footer>
    </div>
  );
};

export default AboutPage;