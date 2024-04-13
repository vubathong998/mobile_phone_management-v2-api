function getLine() {
    const e = new Error();
    const regex = /\((.*):(\d+):(\d+)\)$/;
    const match = regex.exec(e.stack?.split('\n')[2] || '');
    return {
        filepath: match && match[1],
        line: match && match[2]
        // column: match && match[3]
    };
}

export { getLine };
