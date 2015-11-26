var fs = require('fs'),
    vo = require('vo'),
    sleep = require('sleep'),
    colors = require('colors'),
    cheerio = require('cheerio'),
    prompt = require('readline-sync'),
    Nightmare = require('nightmare');

var currentTimeStamp = Date.now();

var botDebugMode = false;
var args = process.argv.slice(2);
if (args.length > 0 && args[0] === '--debug') { botDebugMode = true; }

init();

function init() {
    console.log('----------------------------------');
    console.log('    FB Search Scraper BOT v0.1    '.bold.green);
    console.log('----------------------------------');
    if (botDebugMode === true) { console.log('* Bot initiated in mode debug.'.bold.yellow); }
    setStatus('Running bot..');
    main();
}

function main() {
    var targetUrl = prompt.question('Insert a target url: '.bold);
    logInFacebook(getAccountData(), function(loginStatus) {
        if (loginStatus === true) {
            scrapeFbResultsData(targetUrl);
        }
    });
}

function logInFacebook(accountData, callback) {
    setStatus('Logging to Facebook.com..');
    var nightmare = new Nightmare({
        width: 800,
        height: 600,
        'use-content-size': true,
        show: botDebugMode,
        'web-preferences': {
            partition: 'persist:' + currentTimeStamp,
            images: false,
            webaudio: false,
            webgl: false,
            'page-visibility': true
        }
    });
    vo(function*() {
        yield nightmare
            .useragent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36')
            .goto('https://m.facebook.com')
            .type('input[name="email"]', accountData[0])
            .type('input[name="pass"]', accountData[1])
            .click('button[name="login"]')
            .wait(1250)
        var loginStatus = yield nightmare.exists('form[action="/friends/center/search/"]')
        yield nightmare
            .run(function(err, nightmare) {
                if (err) {
                    console.log(err);
                    process.exit();
                }
            })
        yield nightmare.end()
        if (loginStatus === true) {
            setStatus('Bot logged on Facebook with ' + accountData[0].bold + ' successfully..');
            callback(true);
        } else {
            setError("Bot can't login to Facebook.com, check your account.");
            callback(false);
            process.exit();
        }
    })(function() {});
}

function scrapeFbResultsData(targetUrl) {
    verifyTargetUrl(targetUrl, function(targetUrlVerification) {
        if (targetUrlVerification === true) {
            var nightmare = new Nightmare({
                width: 800,
                height: 600,
                'use-content-size': true,
                show: botDebugMode,
                'web-preferences': {
                    partition: 'persist:' + currentTimeStamp,
                    images: false,
                    webaudio: false,
                    webgl: false,
                    'page-visibility': true
                }
            });
            vo(function*() {
            	setStatus('Navigating to target url..');
                yield nightmare
                    .useragent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36')
                    .goto(targetUrl)
                    .wait(1000)
                var pageHeight = yield nightmare.evaluate(function() { return document.body.scrollHeight });
                var bottomDetected = false;
                var t0 = new Date().getTime();
                var scrollDownCount = 1;
                var scrapedFbIds = {};
                var elementsToHide = {};
                var numFbIdsLastRound = 0;
                var WAIT_CONST = 525;
                do {
                    var scrapedResults = yield nightmare.evaluate(function() {
                        var currentScrapedIds = [];
                        var currentElements = document.querySelectorAll('div[data-xt]');
                        for (var i = 0; i < currentElements.length; i++) {
                            if (currentElements[i].getAttribute('style') === null) {
                                currentScrapedIds.push(currentElements[i].childNodes[0].lastChild.getAttribute('data-store'));
                            }
                        }
                        return {
                            'scrapedIds': currentScrapedIds,
                        }
                    });
                    if (scrapedResults.scrapedIds.length > 0) {
                        for (var n = 0; n < scrapedResults.scrapedIds.length; n++) {
                            var calcObjPos = {
                                1: {
                                    "obj": "scrapedFbIds",
                                    "length": Object.keys(scrapedFbIds).length
                                },
                                2: {
                                    "obj": "elementsToHide",
                                    "length": Object.keys(elementsToHide).length
                                }
                            };
                            scrapedFbIds[calcObjPos[1].length] = JSON.parse(scrapedResults.scrapedIds[n]);
                            elementsToHide[calcObjPos[2].length] = JSON.parse(scrapedResults.scrapedIds[n]);
                        }
                    }
                    setStatus('* Scrolling down in search results... #' + scrollDownCount);
                    yield nightmare
                        .scrollTo(pageHeight, 0)
                    if (Object.keys(elementsToHide).length > 0) {
                        var numElementsToHide = Object.keys(elementsToHide).length;
                        for (var i = 0; i < numElementsToHide; i++) {
                            yield nightmare
                                .wait(WAIT_CONST)
                                .evaluate(function(elementId) {
                                    document.querySelector('div[data-xt*="' + elementId + '"]').style.display = 'none';
                                }, elementsToHide[i].result_id)
                            delete elementsToHide[i];
                        }
                    }
                    if (Object.keys(scrapedFbIds).length === numFbIdsLastRound) { endOfResultsDetected = true; } else { endOfResultsDetected = false; }
                    if (endOfResultsDetected === true) {
                        yield nightmare.end();
                        bottomDetected = true;
                        setStatus('Facebook end of results detected..');
                        if (Object.keys(scrapedFbIds).length > 0) {
                            var t2 = new Date().getTime();
                            var timeOperation = t2 - t0;
                            saveScrapedResultsToTxt(scrapedFbIds);
                            console.log('------------------------------------------------------------');
                            console.log('Total results scraped: ' + colors.bold.green('%s'), Object.keys(scrapedFbIds).length);
                            console.log('Scraping operation done in ' + colors.bold.yellow('%s'), timeOperation + 'ms');
                            console.log('Scraped results have been saved in results_' + currentTimeStamp + '.txt');
                            console.log('------------------------------------------------------------');
                        } else {
                            setError('0 urls have been scraped, check the target url you inserted.');
                            process.exit();
                        }
                    }
                    numFbIdsLastRound = Object.keys(scrapedFbIds).length;
                    scrollDownCount++;
                }
                while (bottomDetected === false);
            })(function() {});
        } else {
            process.exit();
        }
    });
}

function verifyTargetUrl(targetUrl, callback) {
    var targetUrlCallBack = false;
    setStatus('Verifying target url..');
    if (targetUrl.length > 0) {
        if (targetUrl.indexOf('m.facebook.com') > -1) {
            setStatus('Target url is valid..');
            targetUrlCallBack = true;
        } else {
            setError("Target url must contain m.facebook.com domain.");
        }
    } else {
        setError("Target URL can't be empty.");
    }
    callback(targetUrlCallBack);
}

function saveScrapedResultsToTxt(results) {
    setStatus('Saving scraped results to txt file..');
    var file = fs.createWriteStream('results_' + currentTimeStamp + '.txt');
    file.on('error', function(err) {
        console.log(err);
        process.exit();
    });
    for (var i = 0; i < Object.keys(results).length; i++) {
        if (i + 1 === Object.keys(results).length) {
            file.write('https://m.facebook.com/' + results[i].result_id);
        } else {
            file.write('https://m.facebook.com/' + results[i].result_id + '\n');
        }
    }
    file.end();
}

function setStatus(text) {
    console.log('Status: ' + text.strikethrough.cyan);
}

function setError(text) {
    console.log('Error: ' + text.bold.red);
}

function getAccountData() {
    setStatus('Checking account data file..');
    if (fs.existsSync('account_data.txt')) {
        setStatus('Account data file found and loaded..');
        return fs.readFileSync('account_data.txt').toString().split(";");
    } else {
        console.log('Error: account_data.txt file not exists.'.bold.red);
        process.exit();
    }
}
