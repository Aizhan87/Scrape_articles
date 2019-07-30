# Scrape_articles

Overview

In this assignment, I created a web app that lets users view and leave comments on the latest news. But I did not actually write any articles; instead, I flexed my Mongoose and Cheerio muscles to scrape news from another site.

Whenever a user visits the site, the app scrapes stories from a news outlet and displays them for the user. Each scraped article is saved at the application database. The app scrapes and displays title and URL for each article.

Users are able to leave comments on the articles displayed and revisit them later. The comments are saved to the database as well and associated with their articles. Users are able to delete comments left on articles. All stored comments are visible to every user.