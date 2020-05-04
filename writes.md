---
layout: landing
---

<div style="font-size: 26px; text-align: center;" markdown="1">
[projects](..) | blog | [muses](../muses)
</div>

<h3>Blog</h3>
<ul>
  {% for post in site.posts %}
  {% if post.hidden != true %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a> ({{ post.date | date: '%B %Y' }})
    </li>
  {% endif %}
  {% endfor %}
</ul>
