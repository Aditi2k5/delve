'use client'

import React, { useEffect, useRef } from 'react'

const codeTerms = ['function', 'const', 'let', 'if', 'else', 'for', 'while', 'return', 'import', 'export', 'class', 'interface']

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    class CodeTerm {
      x: number
      y: number
      term: string
      speed: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.term = codeTerms[Math.floor(Math.random() * codeTerms.length)]
        this.speed = Math.random() * 0.5 + 0.1
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`
        ctx.font = '12px monospace'
        ctx.fillText(this.term, this.x, this.y)
      }

      update() {
        this.y += this.speed
        if (this.y > canvas!.height) {
          this.y = 0
          this.x = Math.random() * canvas!.width
        }
      }
    }

    const codeParticles: CodeTerm[] = []
    for (let i = 0; i < 100; i++) {
      codeParticles.push(new CodeTerm(Math.random() * canvas.width, Math.random() * canvas.height))
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, '#000000')
      gradient.addColorStop(0.5, '#00FFFF')
      gradient.addColorStop(1, '#FFFFFF')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      codeParticles.forEach((term) => {
        term.draw(ctx)
        term.update()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-[-1]" />
}

