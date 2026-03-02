import type { Page } from "puppeteer";
import { WordDetail } from "./interfaces";

export const crawlerSingleWord = async (page: Page, url: string): Promise<WordDetail> => {
    await page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: 240000,
    });

    await page.waitForSelector(".headword", { timeout: 15000 });

    const detail: WordDetail = await page.evaluate(() => {
        const getText = (selector: string) => 
            document.querySelector(selector)?.textContent?.trim() || "";

        const word = getText(".headword");
        const pos = getText(".pos");
        const ipa = getText('.phons_br .phon');
        const definition = getText('.def');
        const example = getText('.x');
        
        // Ưu tiên lấy giọng UK như trong video hướng dẫn
        const audioUrl = document.querySelector('.sound.audio_play_button.pron-uk')
                ?.getAttribute('data-src-mp3') || undefined;

        return { word, pos, ipa, definition, example, audioUrl };
    });

    return detail;
}