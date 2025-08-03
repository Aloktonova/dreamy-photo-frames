import { useState } from "react"
import { 
  Home, 
  Search, 
  Sparkles, 
  Image, 
  Video, 
  Settings, 
  User, 
  Grid3X3,
  BarChart3,
  Crown,
  Menu,
  X
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

const mainItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Generate", url: "/generate", icon: Sparkles },
  { title: "Showcase", url: "/showcase", icon: Grid3X3 },
  { title: "Explore", url: "/explore", icon: Search },
]

const analysisItems = [
  { title: "Image Analysis", url: "/explore?tab=image", icon: Image },
  { title: "Video Analysis", url: "/explore?tab=video", icon: Video },
]

const userItems = [
  { title: "Profile", url: "/profile", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
]

interface AppSidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

export function AppSidebar({ isCollapsed, onToggle }: AppSidebarProps) {
  const { user } = useAuth()
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/"
    return currentPath.startsWith(path)
  }

  const getNavCls = (path: string) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
      isActive(path)
        ? "bg-primary text-primary-foreground shadow-md"
        : "text-muted-foreground hover:bg-muted hover:text-foreground"
    }`

  const sidebarVariants = {
    expanded: {
      width: 280,
      transition: { duration: 0.3 }
    },
    collapsed: {
      width: 72,
      transition: { duration: 0.3 }
    }
  }

  const contentVariants = {
    expanded: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2, delay: 0.1 }
    },
    collapsed: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.2 }
    }
  }

  return (
    <motion.aside
      variants={sidebarVariants}
      animate={isCollapsed ? "collapsed" : "expanded"}
      className="fixed left-0 top-0 h-full bg-background border-r border-border z-40 flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                variants={contentVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  MediaGen AI
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-8 w-8 p-0"
          >
            {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        {/* Main Navigation */}
        <nav className="space-y-1">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.h3
                variants={contentVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2"
              >
                Main
              </motion.h3>
            )}
          </AnimatePresence>
          
          {mainItems.map((item) => (
            <NavLink key={item.url} to={item.url} className={getNavCls(item.url)}>
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.span
                    variants={contentVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    className="font-medium"
                  >
                    {item.title}
                  </motion.span>
                )}
              </AnimatePresence>
              {item.url === "/generate" && !isCollapsed && (
                <Badge variant="secondary" className="ml-auto text-xs">
                  New
                </Badge>
              )}
            </NavLink>
          ))}
        </nav>

        <Separator />

        {/* Analysis Tools */}
        <nav className="space-y-1">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.h3
                variants={contentVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2"
              >
                Analysis
              </motion.h3>
            )}
          </AnimatePresence>
          
          {analysisItems.map((item) => (
            <NavLink key={item.url} to={item.url} className={getNavCls(item.url)}>
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.span
                    variants={contentVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    className="font-medium"
                  >
                    {item.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </nav>

        {user && (
          <>
            <Separator />
            
            {/* User Menu */}
            <nav className="space-y-1">
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.h3
                    variants={contentVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2"
                  >
                    Account
                  </motion.h3>
                )}
              </AnimatePresence>
              
              {userItems.map((item) => (
                <NavLink key={item.url} to={item.url} className={getNavCls(item.url)}>
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <AnimatePresence mode="wait">
                    {!isCollapsed && (
                      <motion.span
                        variants={contentVariants}
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        className="font-medium"
                      >
                        {item.title}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </NavLink>
              ))}
            </nav>
          </>
        )}
      </div>

      {/* Footer */}
      {user && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Crown className="w-4 h-4 text-white" />
            </div>
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  variants={contentVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  className="flex-1"
                >
                  <p className="text-sm font-medium">Free Plan</p>
                  <p className="text-xs text-muted-foreground">5 generations daily</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </motion.aside>
  )
}