import puppeteer from 'puppeteer';
import fs from 'fs-extra';

async function getAllLinks() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    
    // Giả lập trình duyệt thật để không bị Oxford soi
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    try {
        console.log("Đang kết nối tới Oxford...");
        await page.goto('https://www.oxfordlearnersdictionaries.com/wordlists/oxford3000-5000', {
            waitUntil: 'domcontentloaded',
            timeout: 90000 // Thầy để hẳn 90s cho chắc ăn
        });

        const links = await page.evaluate(() => {
            const items = document.querySelectorAll('ul.top-g li a');
            return Array.from(items).map(a => (a as HTMLAnchorElement).href);
        });

        await fs.ensureDir('./data'); // Đảm bảo thư mục data đã tồn tại
        await fs.writeJson('./data/all_links.json', links);
        console.log(`Thành công! Đã lấy xong ${links.length} links.`);
    } catch (error) {
        console.error("Lỗi rồi em ơi:", error);
    } finally {
        await browser.close();
    }
}

getAllLinks();
