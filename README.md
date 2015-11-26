# Facebook Search Results Scraper
Scrape thousands of Facebook search places results.

[Facebook Graph API](https://developers.facebook.com/docs/graph-api) has a limit of 400-450 results per query so this why I have decided to make this bot and get all results without limits.

- [Installation](#installation)
  - [Usage](#usage)
  - [How the bot works]()
- [Debugging](#debugging)
- [Disclaimer](#disclaimer)
![Fb Search Results Bot Scraper](https://i.imgur.com/Vac1qCi.png)

# Installation

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
- **Target url**
  - The target url must follow this format: <br> [**https://m.facebook.com/search/str/**](https://m.facebook.com/search/str/keyword here/keywords_places)``keyword here``[**/keywords_places**](https://m.facebook.com/search/str/keyword here/keywords_places)
  - Example of a valid target url: **https://m.facebook.com/search/str/Bartending%2BService%2BColorado/keywords_places**
- **Adjust bot speed**
  - Depending of your machine environment you will need to increment/decrease the wait time var (``525ms`` by default)
  - An incorrect value (too low mainly) will result in less results scraped
  - You can find this variable ``var WAIT_CONST = 525`` in line [**107**](https://github.com/alfonbots/fb-search-results/blob/master/fb.js#L107)
 

### How the bot works

I'll try to simplify how the bot works, if you want to know how it works exactly, take a look to the [**code**](https://github.com/alfonbots/fb-search-results/blob/master/fb.js).


**Behavior:**<br>
The bot prompts for a ``target url``, logins to Facebook.com with the account data from ``account_data.txt`` file, if the bot logins successfully then verifies the ``target url``, if the ``target url`` is valid then navigates to the ``target url``, now will scrape all current results visibles, scroll down in the page to load more results, hide the previous results scraped changing their CSS display Property class to 'none', check if ``endOfResultsDetected`` is true, if it is true (if it isn't true then will keep repeating the same actions until ``endOfResultsDetected`` is true) then will save the scraped results to a .txt file and display the total results scraped number and the duration time of the scraping operation (in milliseconds).

# Debugging
There are two ways to get more information and know what's happening inside the bot.

1. ``node fb.js --debug``
2. ``DEBUG=nightmare node --harmony fb.js --debug`` (on Windows use ``DEBUG=nightmare & node fb.js --debug``)

The first option shows a window of the bot working, so you can see what's doing.

The second option does the same like the previous option but this option also will give you more depth information about the bot actions.

# Disclaimer
This bot is only for educational purposes. Read [Facebook.com scraping policy](https://www.facebook.com/apps/site_scraping_tos_terms.php) before use it.
