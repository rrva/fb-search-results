# Facebook Search Results Scraper

* [Installation & Setup]()
* [Debugging]()
* [Disclaimer]()

# Installation & Setup
### Clone the repository in your machine 
```
$ git clone https://github.com/alfonbots/fb-search-results
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
