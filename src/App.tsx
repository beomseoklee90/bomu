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

function App() {
  const menuItems = [
    'self introduction',
    'professional experience',
    'philosophy',
    'hobby',
    'voicee'
  ]

  const htmlContents = [
    `<p>Welcome to my profile. This is my self introduction.</p>`,
    
    `<h3>ABC Company</h3> 2020-01-01 ~ 2022-12-31
     <hr>
      * Contribution1 <br>
      * Contribution1 <br>
      * Contribution1 <br>
      * Contribution1 <br>
      * Contribution1 <br>
    <h3>ABC Company</h3> 2020-01-01 ~ 2022-12-31
     <hr>
      * Contribution1 <br>
      * Contribution1 <br>
      * Contribution1 <br>
      * Contribution1 <br>
      * Contribution1 <br>
     ` 
    
    `<h2>My Philosophy</h2>
    <p>I believe in creating intuitive and accessible user experiences.</p>
    <ul>
      <li>User-centered design approach</li>
      <li>Continuous learning and improvement</li>
      <li>Building scalable and maintainable solutions</li>
    </ul>`,
    
    `<h2>Hobbies</h2>
    <ul>
      <li>Photography - 2015-01-01 ~ Present</li>
      <li>Hiking - 2018-06-15 ~ Present</li>
      <li>Playing guitar - 2010-03-22 ~ Present</li>
    </ul>`,
    
    `<h2>Voice Samples</h2>
    <p>2023-05-10 ~ Present</p>
    <ul>
      <li>English narration samples</li>
      <li>Podcast recordings</li>
      <li>Voice acting demos</li>
    </ul>`
  ]

  const [activeSection, setActiveSection] = useState(menuItems[0])
  const [contentHtml, setContentHtml] = useState(htmlContents[0])

  const handleNavClick = (section: string) => {
    setActiveSection(section)
    const index = menuItems.indexOf(section)
    setContentHtml(htmlContents[index])
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main container with thick padding */}
      <div className="p-8 md:p-12 lg:p-16 flex-1 flex flex-col">
        {/* Navigation bar */}
        <div className="w-full mb-8">
          <NavigationMenu className="w-full justify-start">
            <NavigationMenuList className="w-full justify-start flex-wrap gap-2">
              {menuItems.map((item) => (
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
