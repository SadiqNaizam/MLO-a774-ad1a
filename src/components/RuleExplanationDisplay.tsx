import React from 'react';

interface RuleExplanationDisplayProps {
  rule: string;
  explanation: string;
}

const RuleExplanationDisplay: React.FC<RuleExplanationDisplayProps> = ({ rule, explanation }) => {
  console.log('RuleExplanationDisplay loaded for rule:', rule);

  return (
    <div className="py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <div className="mb-2">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Rule:</span>
        <code className="block bg-gray-100 dark:bg-gray-800 p-3 rounded-md text-sm text-gray-800 dark:text-gray-200 break-all mt-1 font-mono">
          {rule}
        </code>
      </div>
      <div>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Explanation:</span>
        <p className="mt-1 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          {explanation}
        </p>
      </div>
    </div>
  );
};

export default RuleExplanationDisplay;