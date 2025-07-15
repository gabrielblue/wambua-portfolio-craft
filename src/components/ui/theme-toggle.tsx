import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/ui/theme-provider"
import { useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [isClicked, setIsClicked] = useState(false)

  const toggleTheme = () => {
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 300)
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`relative h-10 w-10 rounded-full transition-all duration-300 hover:scale-110 group overflow-hidden ${
        isClicked ? 'animate-pulse scale-95' : ''
      }`}
    >
      {/* Animated background */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
      
      {/* Glow effect */}
      <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
        theme === 'dark' 
          ? 'bg-gradient-to-r from-yellow-400/30 to-orange-400/30 shadow-lg shadow-yellow-400/20' 
          : 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 shadow-lg shadow-blue-400/20'
      } ${isClicked ? 'scale-150 opacity-0' : 'scale-0 opacity-100'}`}></div>
      
      {/* Icons with enhanced animations */}
      <Sun className={`h-5 w-5 transition-all duration-500 ${
        theme === 'dark' 
          ? 'rotate-90 scale-0 opacity-0' 
          : 'rotate-0 scale-100 opacity-100'
      } ${isClicked ? 'animate-spin' : ''} text-yellow-500`} />
      
      <Moon className={`absolute h-5 w-5 transition-all duration-500 ${
        theme === 'dark' 
          ? 'rotate-0 scale-100 opacity-100' 
          : '-rotate-90 scale-0 opacity-0'
      } ${isClicked ? 'animate-bounce' : ''} text-blue-400`} />
      
      {/* Click ripple effect */}
      {isClicked && (
        <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping"></div>
      )}
      
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}