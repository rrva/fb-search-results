# Facebook Search Results Scraper
### Work In Progress ...
* [Installation & Setup]()
* [Debugging]()
* [Disclaimer]()
![Fb Search Results Bot Scraper](https://i.imgur.com/Vac1qCi.png)

# Installation & Setup
### Clone the repository in your machine 
```
$ git clone https://github.com/alfonbots/fb-search-results.git
$ cd fb-search-results/
```
### Install the needed packages
```
$ npm install
```
### Add a valid Facebook.com account
```
$ echo "user@email.com;password" > account_data.txt
```
## Run the app
```
$ node fb.js
```
# Debugging
``DEBUG=nightmare node --harmony cnn.js --debug``
on Windows use ``DEBUG=nightmare & node cnn.js --debug``
