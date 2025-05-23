import { useState } from 'react'
import './App.css'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const menuName = ['self introduction', 'professional experience', 'philosophy', 'hobby', 'voicee']
const innerHtml = [
  "",
  "",
  "",
  "",
  "",
]
function App() {
  const [activeSection, setActiveSection] = useState('self introduction')
  const [contentHtml, setContentHtml] = useState('<p>Welcome to my profile. Click on a navigation item to see content.</p>')

  const handleNavClick = (section: string) => {
    let html = "";
    setActiveSection(section)
    switch (section) {
      case menuName[0]:
        html = innerHtml[0]
        break;
      case menuName[1]:
        html = innerHtml[1]
        break;
      case menuName[2]:
        html = innerHtml[2]
        break;
      case menuName[3]:
        html = innerHtml[3]
        break;
      case menuName[4]:
        html = innerHtml[4]
        break;
      default:
        break;
    }
    setContentHtml(html)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main container with thick padding */}
      <div className="p-8 md:p-12 lg:p-16 flex-1 flex flex-col">
        {/* Navigation bar */}
        <div className="w-full mb-8">
          <NavigationMenu className="w-full justify-start">
            <NavigationMenuList className="w-full justify-start flex-wrap gap-2">
              {menuName.map((item) => (
                <NavigationMenuItem key={item}>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      activeSection === item ? "bg-zinc-200 dark:bg-zinc-800" : ""
                    )}
                    onClick={() => handleNavClick(item)}
                  >
                    {item}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Gray content area */}
        <div className="flex-1 bg-gray-200 rounded-lg p-6 md:p-8">
          {/* Content div where innerHTML can be added */}
          <div
            className="content-area h-full"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </div>
    </div>
  )
}

export default App
