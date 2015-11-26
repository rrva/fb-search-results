# Facebook Search Results Scraper
Work In Progress ...

- [Installation & Setup]()
  - [Usage]()
- [Debugging]()
- [Disclaimer]()
![Fb Search Results Bot Scraper](https://i.imgur.com/Vac1qCi.png)

# Installation & Setup

**This project requires to [have Node.js installed](https://nodejs.org).**

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
### Usage

....

# Debugging
There are two ways to get more information and know what's happening inside the bot.

1. ``node fb.js --debug``
2. ``DEBUG=nightmare node --harmony fb.js --debug`` (on Windows use ``DEBUG=nightmare & node fb.js --debug``)

The first option shows a window of the bot working, so you can see what's doing.

The second option is like the previous option but this will give you more depth information about the bot actions.

# Disclaimer
