interface SeoBlock {
    title?: string;
    text?: string;
    ul?: string[];
    ol?: string[];
}

export type SeoContent = {
    image: string,
    content: SeoBlock[]
};