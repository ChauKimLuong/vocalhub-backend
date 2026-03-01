export interface WordDetail {
    word: string;
    pos: string; // v, n, adj
    ipa?: string;
    definition: string;
    example?: string;
    audioUrl?: string;
    localAudioPath?: string;
} 