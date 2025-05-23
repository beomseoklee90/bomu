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
    
    `<h3>DENZAI</h3> 2025-03 ~ now
<hr>
* built scrapping logic to collect about 10,000 pictures that transformed 3 months work into 1 week task. <br>
⦁	security standard certification consulting company selection strategy document - contributed to decision making for executives<br>
⦁	Identified the origin of the problem and solved it from the 3rd party SaaS platform by the way of problem-solving thoughts through the communication with technical support team that had not been solved for more than 1 month within 1 week.  <br>
<h3>Axrossroad</h3> 2023-10 ~ 2024-12
<hr>
⦁	Accomodation reservation system <br>
⦁	Reflected clients requirements in a design document, developed the feature, wrote test specification document, blackbox tested with the all possible input patterns, added new tables and new data, deployed the source code<br>
⦁	Java Struts, MySQL, Jquery, Jenkins based system <br>
<h3>Human Resocia</h3> 2022-11 ~ 2023-8
<hr>
* express highway patrol system <br>
⦁	Jquery, Bootstrap new version source migration task, built validation annotation class and applied to every datepickers, developed Junit unit test, trouble-shooted errors, deployed the source code  sing Jenkins, Database data input, whitebox test, blackbox tested<br>
⦁	Java Spring Boot, MySQL, Jquery, Bootstrap, Jenklns based system <br>
* Creating intuitive and accessible user experiences <br>
* Focusing on performance and optimization <br>
<h3>Powertask</h3> 2020-10 ~ 2021-11
<hr>
⦁	Low code platform <br>
* designed, developed, maintained cloud/backend from scratch, set VPC, route table, subnet, Load Balancer, EC2 WAS, KMS, Route53, ACM, Typescript, whitebox, blackbox tested, MongoDB, MySQL, Reactjs <br>`,
    
    `<h2>I believe that insights are the energy that make me grow</h2> <br>
I try to learn whatever I can experience.
<hr>
⦁	I consider coworkers and bosses as partners that I sincerely support and cheer up. After behaving like this, the working life have become happy. After I realized that it is valuable, I have less conflicts with them with genuine mutual respect. Even if a conflict occurs, I can understand and acknowledge their complains easily, I can politely express my opinion in a way they can accept comfortably.<br>
⦁	Having a pure motivation to contribute to my company without pressure to do well have been my driving force to produce meaningful achievements in my company. Previously when I was less professional, I was stressed out easily, being obsessed with satisfying the expectation from the coworkers and boss. Now, I work as if I were a innocent kid, and creating meaningful results to my company.<br>
⦁	Everyday I reflect on myself. I analyze all the things I have done in a day. In terms of work, I check whether the way of cooperation was appropriate, whether I did best, what I have learned, whether I managed my emotion. With these insights I improve myself tomorrow<br>`,
    
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
