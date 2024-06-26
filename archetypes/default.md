+++
title = '{{ replace .File.ContentBaseName "-" " " | title }}'
date = {{ .Date }}
draft = true
import markdown

parser = markdown.Markdown(extensions=["markdown_image_caption.plugin"])
+++
