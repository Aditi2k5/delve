'use client'

import { motion } from 'framer-motion'

export function CodeBackground() {
  const codeSymbols = ['{', '}', '(', ')', '[', ']', '<', '>', '/', '*', '=', '+', '-', ':', ';']
  const codeTerms = ['function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'return', 'import', 'export', 'class', 'interface', 'type', 'enum']

  const generateRandomSymbol = () => codeSymbols[Math.floor(Math.random() * codeSymbols.length)]
  const generateRandomTerm = () => codeTerms[Math.floor(Math.random() * codeTerms.length)]

  const generateRandomPosition = () => ({
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
  })

  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-gray-700 text-opacity-20 pointer-events-none"
          initial={generateRandomPosition()}
          animate={{
            x: [
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
            ],
            y: [
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
            ],
          }}
          transition={{
            duration: Math.random() * 200 + 100,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {Math.random() > 0.5 ? generateRandomSymbol() : generateRandomTerm()}
        </motion.div>
      ))}
    </div>
  )
}

