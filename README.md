## getting started
Prerequisites:
install windows terminal (I use ubuntu)
install Git, command: $sudo apt install git-all

installing hugo:
install hugo, command: $sudo apt install hugo
link for more info https://gohugo.io/installation/linux/#snap

 using hugo:
 enter the folder with the website
 run the command $hugo serve
 a link should appear to open the local web link

 ## making changes
 Sidebar edits:
 - Sidebars are found under the /layouts/partials/sidebars/ and are written in html
 - markdown files have a sidebar_left and sidebar_right options where the sidebars are rendered
 Markdown additions and edits:
 - all markdown files are found under /content/ 
 - to add a new markdown file to the main bar, add this to the top
   "---
   menu: main
   title: "New Name"
   description: "add a description for the gray text above the image"
   image: "image path"
   ---"
Adding to submenu:
 1. to add a new markdown file to the archives, add the markdown file to /content/archives/
 2. set the menu to archives (menu:archives)
 3. go to /config/_default/menus.toml/ and add
    "[[main]]
    parent = "ARCHIVES"
    name = "NEW FILE NAME"
     url = "/archives/NEW FILE NAME/"
    weight = above name weight + 1"
Adding new image:
- add image to /static/images/
- use images/image_name.png as the path in markdown
  *Note: images being added in html '{{absURL "images/DocumentImages/overviewOverlay.jpg"}}' or it will not render in github pages*
CSS Edits:
- do NOT use the CSS in the theme, go to /assets/sass/custom.scss to make changes.
