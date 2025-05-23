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
<h3>XYZ Corporation</h3> 2020-01-01 ~ 2022-12-31
<hr>
* Contribution1 <br>
* Contribution1 <br>
* Contribution1 <br>
* Contribution1 <br>
* Contribution1 <br>`,
    
    `<h3>My Philosophy</h3> 2018-01-01 ~ Present
<hr>
* User-centered design approach <br>
* Continuous learning and improvement <br>
* Building scalable and maintainable solutions <br>
* Creating intuitive and accessible user experiences <br>
* Focusing on performance and optimization <br>`,
    
    `<h3>Hobbies</h3> 2010-01-01 ~ Present
<hr>
* Photography - 2015-01-01 ~ Present <br>
* Hiking - 2018-06-15 ~ Present <br>
* Playing guitar - 2010-03-22 ~ Present <br>
* Reading - 2005-01-01 ~ Present <br>
* Cooking - 2019-05-10 ~ Present <br>`,
    
    `<h3>Voice Samples</h3> 2023-05-10 ~ Present
<hr>
* English narration samples <br>
* Podcast recordings <br>
* Voice acting demos <br>
* Technical presentations <br>
* Educational content <br>`
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
        <div className="w-full mb-8 overflow-x-auto nav-scroll-container">
          <NavigationMenu className="w-full justify-start">
            <NavigationMenuList className="w-full justify-start flex-nowrap gap-2 min-w-max">
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
