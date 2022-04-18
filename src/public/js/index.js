function copyToClipboard(id) {
    const range = document.createRange();
    range.selectNode(document.getElementById(id));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    try {
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        document.querySelector('.copy').innerText = 'Kopieret!';
    } catch (err) {
        console.log('Unable to copy!');
    }
}