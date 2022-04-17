export default function generateParagraphs(numberOfParagraphs, lorem) {
    const paragraphs = []
    for (let index = 0; index < numberOfParagraphs; index++) {
        paragraphs.push(lorem)
    }
    return paragraphs
}