'use client'

import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
  className?: string
}

export function CodeBlock({
  code,
  language = 'typescript',
  filename,
  showLineNumbers = true,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={cn(
        'relative group rounded-xl overflow-hidden border border-gray-700 bg-gray-900',
        className
      )}
    >
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
          <span className="text-sm text-gray-400 font-mono">{filename}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1 text-xs rounded-md bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                Copy
              </>
            )}
          </button>
        </div>
      )}

      {!filename && (
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 z-10 flex items-center gap-2 px-3 py-1.5 text-xs rounded-md bg-gray-700/90 hover:bg-gray-600 text-gray-300 transition-all opacity-0 group-hover:opacity-100"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              Copy
            </>
          )}
        </button>
      )}

      <pre className="overflow-x-auto p-4">
        <code className="text-sm font-mono text-gray-100">{code}</code>
      </pre>
    </div>
  )
}

interface InlineCodeProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export function InlineCode({ children, className, ...props }: InlineCodeProps) {
  return (
    <code
      className={cn(
        'relative rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 font-mono text-sm text-brand-600 dark:text-brand-400',
        className
      )}
      {...props}
    >
      {children}
    </code>
  )
}
