const puppeteer = require('puppeteer');

module.exports = {
    run: async function() {
        console.log("here");
        const browser = await puppeteer.launch( {
            headless: false
        }
        );
        const page = await browser.newPage();

        await page.goto('https://yelp.com/');
        //----------------Log in part-----------------------//
        const KEYWORD = '#find_desc';
        const LOCATION = '#dropperText_Mast';
        const BUTTON_SELECTOR = '#header-search-submit';
        await page.waitFor(2000);
        await page.click(KEYWORD);
        await page.keyboard.type('dispensaries');

        await page.click(LOCATION);
        await page.keyboard.type('91387');

        await page.click(BUTTON_SELECTOR);

        await page.waitFor(10000);
        console.log("Search redirect");
        //----------------Getting into pages-------------------//

        var info = await page.evaluate(() => {
            const itemsQuery = '.mapColumnTransition__373c0__10KHB li>div>div>div:nth-child(1)>div:nth-child(2)>div';
            var items = $(itemsQuery);
            var totalItem = 0;
            var result = [];
            var buff = {};
            console.log(items);
            for (var i=0 ; i<items.length; i++) {
                var item = items[i];
                console.log(i);
                if(item.className.indexOf('largerScrollablePhotos') > -1) {
                    console.log(item);
                    console.log('main frame');
                    buff.name = item.querySelector('a').innerText;
                    console.log('name');
                    buff.review = item.querySelectorAll('span')[1].innerText;
                    console.log('review');
                    buff.priceCategory = '';
                    var hrefItem = item.querySelectorAll('a');
                    for(var j=1; j<hrefItem.length; j++) {
                        buff.priceCategory += hrefItem[j].innerText + ',';
                    }
                    if(buff.priceCategory.length > 1) {
                        buff.priceCategory = buff.priceCategory.substring(0, buff.priceCategory.length -1 );
                    }
                    console.log('priceCategory');
                    if(item.querySelector('address')) {
                        buff.address = item.querySelector('address').innerText;
                    }
                    var pItems = item.querySelectorAll('div:nth-child(2)>div p');
                    if(pItems[0].className.indexOf('K_MKN') > -1) {
                        buff.phone = item.querySelector('div:nth-child(2)>div p').innerText;
                    } else {
                        buff.phone = pItems[1].innerText;
                    }
                    console.log('phone');
                    if(buff.address == '' && pItems.length == 2) {
                        buff.area = pItems[1].innerText;
                    } else if(buff.address != '' && pItems.length == 3) {
                        buff.area = pItems[2].innerText;
                    }
                }
                if(item.className.indexOf('u-space-t2') > -1) {
                    console.log('description');
                    if(item.querySelector('p')) {
                        buff.description = item.querySelector('p').innerText;
                    }
                    result[totalItem] = buff;
                    buff = {};
                    totalItem ++;
                }
            }
            return result;
        });

        console.log(info);
        var info = { success: true };
        // browser.close();
        return info;
    }
}