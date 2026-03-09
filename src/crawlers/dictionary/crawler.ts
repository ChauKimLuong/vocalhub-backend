import { crawlerSingleWord } from "./crawlerSingleWord";
import puppeteer from 'puppeteer';
import fs from 'fs-extra';
import { WordDetail } from './interfaces';

const LINKS_PATH = './data/all_links.json';
const OUTPUT_PATH = './data/word_details.json';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getWordDetail = async () => {
    const links: string[] = await fs.readJson(LINKS_PATH);
    
    // Tối ưu browser với các flag em đã cung cấp
    const browser = await puppeteer.launch({
        protocolTimeout: 120_000,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--no-zygote',
            '--disable-background-networking',
            '--disable-extensions',
            '--js-flags=--max-old-space-size=512',
        ],
    });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    // Tuyệt chiêu: Chặn rác để tăng tốc và tránh ProtocolError
    await page.setRequestInterception(true);
    page.on('request', (req) => {
        if (['image', 'font', 'stylesheet', 'media'].includes(req.resourceType())) {
            req.abort();
        } else {
            req.continue();
        }
    });

    let results: WordDetail[] = [];
    if (await fs.pathExists(OUTPUT_PATH)) {
        results = await fs.readJson(OUTPUT_PATH);
    }

    for (let i = results.length; i < links.length; i++) {
        const url = links[i];
        try {
            console.log(`[${i + 1}/${links.length}]: Crawling: ${url}`);
            const detail = await crawlerSingleWord(page, url);
            
            results.push(detail);
            await fs.writeJson(OUTPUT_PATH, results, { spaces: 2 });
            
            console.log(`✅ Đã lưu: ${detail.word}`);
            await delay(1500);
        } catch (err) {
            console.error(`Lỗi: ${url}:`, err);
            console.log("Dừng chương trình !!!");
            await browser.close();
            return;
        }
    }

    await browser.close();
    console.log("Done!");
}

getWordDetail();