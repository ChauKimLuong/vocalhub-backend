import puppeteer from "puppeteer"
import fs from "fs-extra"

const url = `https://www.oxfordlearnersdictionaries.com/wordlists/oxford3000-5000`;

const getLinks = async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    try {
        console.log("Connecting to Oxford Learner’s Dictionaries...");
        await page.goto(url, {
            waitUntil: "domcontentloaded",
            timeout: 90000,
        })

        const links = await page.evaluate(() => {
            const items = document.querySelectorAll("ul.top-g li a");
            return Array.from(items).map(a => (a as HTMLAnchorElement).href);
        })
        
        await fs.ensureDir("./data");
        await fs.writeJson("./data/all_links.json", links);

        console.log(`Geted ${links.length} links.`)
    } catch (error) {
        console.error("An error occurred while crawling Oxford:", error);
    } finally {
        browser.close();
        console.log("Browser closed.");
    }
}

getLinks();