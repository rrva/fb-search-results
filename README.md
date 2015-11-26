# Facebook Search Results Scraper
Work In Progress ...

* [Installation & Setup]()
* [Debugging]()
* [Disclaimer]()
![Fb Search Results Bot Scraper](https://i.imgur.com/Vac1qCi.png)

# Installation & Setup
Clone the repository in your machine 
```
$ git clone https://github.com/alfonbots/fb-search-results.git
$ cd fb-search-results/
```
Install the needed packages
```
$ npm install
```
Add a valid Facebook.com account
```
$ echo "user@email.com;password" > account_data.txt
```
Run the app
```
$ node fb.js
```
# Debugging
There are two ways to get more information and know what's happening inside the bot.

1. ``node fb.js --debug``
2. ``DEBUG=nightmare node --harmony fb.js --debug`` (on Windows use ``DEBUG=nightmare & node fb.js --debug``)

# Disclaimer
