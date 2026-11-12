
self.onmessage = (e) => {
    const n = e.data;
    let result = 0;

    // Calculate the sum in the background
    for (let i = 0; i < n; i++) {
        result += i;
    }

    // Send the result back to the webpage
    self.postMessage(`Sum 0 to ${n - 1} = ${result}`);
};
