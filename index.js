/* 
    Code Author -- ShumakManohar
    github -- https://github.com/shumakmanohar
    Instagram -- https://www.instagram.com/shumakmanohar/
    Date -- 07/10/2020


    ToDo -- Handle The error 
*/


const puppeteer = require('puppeteer');

async function keralaCovidDataScraping(callback) {
    const browser = await puppeteer.launch({headless : false , width : '1366' });
    const page = await browser.newPage();
    //Home Page
    try
    {
        await page.goto('https://dashboard.kerala.gov.in/index.php');
        await page.waitForTimeout(3000); // Delaying the click 
        await page.evaluate(_ => {
            //Clicking the Data link --
            document.querySelector("body > div.wrapper > div.content-wrapper > section.content > div > div:nth-child(1) > div:nth-child(1) > div > a").click()
        })
        await page.waitForTimeout(3000); // Delaying the click 
        const result = await page.evaluate(_ => 
        {
             //Step - 1
            var table = document.querySelector("#wrapper2 > table > tbody:nth-child(2)")
            //Step - 2  
            var allrows = table.children
            //step - 3
            const coviddata = [];
            // step -4 
            const dataObj = (district , confirmed, recovered, death , active ) =>({district , confirmed, recovered, death , active })
            // step -5 
            Array.from(allrows).forEach(row => { 
                var district = row.childNodes[0].textContent
                var confirmed = row.childNodes[1].textContent
                var recovered = row.childNodes[2].textContent
                var death = row.childNodes[3].textContent
                var active = row.childNodes[4].textContent
                var obj = dataObj (district , confirmed , recovered , death , active)
                coviddata.push(obj)
            })
            //step - 6
            var secondTable = document.querySelector("#wrapper2 > table > tbody:nth-child(3)")
            //step - 7
            var secondTableChildren = secondTable.children
            //Step - 8 
            Array.from(secondTableChildren).forEach(row => { 
                var district = row.childNodes[0].textContent
                var confirmed = row.childNodes[1].textContent
                var recovered = row.childNodes[2].textContent
                var death = row.childNodes[3].textContent
                var active = row.childNodes[4].textContent
                var obj = dataObj (district , confirmed , recovered , death , active)
                coviddata.push(obj)
            } )
            //step final
            //console.log(coviddata)
            return coviddata
        });
        callback(result)
        await browser.close();  
    }
    catch (err)
    {
        console.log(err)
    }
    
}

keralaCovidDataScraping(callBack)














function callBack(data)
{
    console.log(data)
}
