## getting started
Prerequisites:
- install windows terminal (I use ubuntu)
- install Git, command: `sudo apt install git-all`

### Installing Hugo:
Install hugo, command: `sudo apt install hugo`
Link for more info: https://gohugo.io/installation/linux/#snap

### Using Hugo:

#### For Local Development:
1. Enter the folder with the website
2. Initialize the theme submodule (first time only): `git submodule update --init --recursive`
3. Run the command `hugo serve`
4. A link should appear to open the local web link (typically http://localhost:1313)

**Important:** The `hugo serve` command is for development only! It includes live reload and uses localhost URLs.

#### For Production Build:
To build the site for production (as done by GitHub Actions):
1. Run `hugo --gc --minify`
2. The production-ready site will be generated in the `public/` directory

**Note:** The `public/` and `resources/` directories should NEVER be committed to git. They are build artifacts that are automatically generated during deployment by GitHub Actions.

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
