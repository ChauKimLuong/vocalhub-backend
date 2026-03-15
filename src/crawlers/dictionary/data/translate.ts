import fs from "fs";
import axios from "axios";

interface Word {
    word: string;
    pos: string;
    ipa: string;
    definition: string;
    example: string;
    audioUrl: string;

    definition_vi?: string;
    meaning_vi?: string;
}

async function translate(text: string): Promise<string> {
    try {
        const res = await axios.get(
            "https://translate.googleapis.com/translate_a/single",
            {
                params: {
                    client: "gtx",
                    sl: "en",
                    tl: "vi",
                    dt: "t",
                    q: text,
                },
            },
        );

        return res.data[0][0][0];
    } catch (err) {
        console.error("Translate error:", text);
        return "";
    }
}

// xử lý 1 word
async function processWord(w: Word): Promise<Word> {
    const [definition_vi, meaning_vi] = await Promise.all([
        translate(w.definition),
        translate(w.word),
    ]);

    return {
        ...w,
        definition_vi,
        meaning_vi,
    };
}

async function main() {
    const words: Word[] = JSON.parse(fs.readFileSync("words_detail.json", "utf-8"));

    const batchSize = 50;
    const results: Word[] = [];

    for (let i = 0; i < words.length; i += batchSize) {
        const batch = words.slice(i, i + batchSize);

        console.log(
            `Processing ${i + 1} - ${i + batch.length} / ${words.length}`,
        );

        const processedBatch = await Promise.all(batch.map(processWord));

        results.push(...processedBatch);
    }

    fs.writeFileSync("words_vi.json", JSON.stringify(results, null, 2));

    console.log("DONE ✔");
}

main();
