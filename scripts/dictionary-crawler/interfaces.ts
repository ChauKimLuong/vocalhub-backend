export interface WordDetail {
    word: string;
    lever: string;
    pos: string; // a1, a2, b1, ..
    ipa?: string;
    definition: string;
    example?: string;
    audioUrl?: string;
    localAudioPath?: string;
} 