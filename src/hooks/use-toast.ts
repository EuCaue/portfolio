"use client"

import { useEffect, useState } from "react"

type ToastProps = {
  message: string
  type: "success" | "error" | "info"
  duration?: number
}

export function useToast() {
  const [toast, setToast] = useState<ToastProps | null>(null)

  const showToast = ({ message, type, duration = 3000 }: ToastProps) => {
    setToast({ message, type, duration })
  }

  const hideToast = () => {
    setToast(null)
  }

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        hideToast()
      }, toast.duration)

      return () => clearTimeout(timer)
    }
  }, [toast])

  return { toast, showToast, hideToast }
}

