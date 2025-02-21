const barsContainer = document.getElementById("bars-container");
let bars = [];

function generateArray() {
    barsContainer.innerHTML = "";
    bars = [];
    for (let i = 0; i < 30; i++) {
        const height = Math.floor(Math.random() * 200) + 50;
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${height}px`;
        bars.push(bar);
        barsContainer.appendChild(bar);
    }
}

async function bubbleSort() {
    let n = bars.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            bars[j].style.backgroundColor = "red";
            bars[j + 1].style.backgroundColor = "red";

            if (parseInt(bars[j].style.height) > parseInt(bars[j + 1].style.height)) {
                await swap(j, j + 1);
            }

            bars[j].style.backgroundColor = "steelblue";
            bars[j + 1].style.backgroundColor = "steelblue";
        }
    }
}

async function selectionSort() {
    let n = bars.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        bars[minIndex].style.backgroundColor = "green";
        for (let j = i + 1; j < n; j++) {
            bars[j].style.backgroundColor = "red";

            if (parseInt(bars[j].style.height) < parseInt(bars[minIndex].style.height)) {
                bars[minIndex].style.backgroundColor = "steelblue";
                minIndex = j;
                bars[minIndex].style.backgroundColor = "green";
            }

            await delay(50);
            bars[j].style.backgroundColor = "steelblue";
        }
        await swap(i, minIndex);
        bars[minIndex].style.backgroundColor = "steelblue";
    }
}

async function insertionSort() {
    let n = bars.length;
    for (let i = 1; i < n; i++) {
        let j = i;
        bars[j].style.backgroundColor = "red";
        while (j > 0 && parseInt(bars[j].style.height) < parseInt(bars[j - 1].style.height)) {
            await swap(j, j - 1);
            j--;
        }
        bars[j].style.backgroundColor = "steelblue";
    }
}

async function mergeSortWrapper() {
    await mergeSort(0, bars.length - 1);
}

async function mergeSort(left, right) {
    if (left >= right) return;
    let mid = Math.floor((left + right) / 2);
    await mergeSort(left, mid);
    await mergeSort(mid + 1, right);
    await merge(left, mid, right);
}

async function merge(left, mid, right) {
    let leftArr = [], rightArr = [];
    for (let i = left; i <= mid; i++) leftArr.push(parseInt(bars[i].style.height));
    for (let i = mid + 1; i <= right; i++) rightArr.push(parseInt(bars[i].style.height));

    let i = 0, j = 0, k = left;
    while (i < leftArr.length && j < rightArr.length) {
        bars[k].style.backgroundColor = "red";
        if (leftArr[i] < rightArr[j]) {
            bars[k].style.height = `${leftArr[i]}px`;
            i++;
        } else {
            bars[k].style.height = `${rightArr[j]}px`;
            j++;
        }
        await delay(100);
        bars[k].style.backgroundColor = "steelblue";
        k++;
    }
    
    while (i < leftArr.length) {
        bars[k].style.height = `${leftArr[i]}px`;
        i++; k++;
        await delay(100);
    }

    while (j < rightArr.length) {
        bars[k].style.height = `${rightArr[j]}px`;
        j++; k++;
        await delay(100);
    }
}

async function quickSortWrapper() {
    await quickSort(0, bars.length - 1);
}

async function quickSort(left, right) {
    if (left >= right) return;
    let pivotIndex = await partition(left, right);
    await quickSort(left, pivotIndex - 1);
    await quickSort(pivotIndex + 1, right);
}

async function partition(left, right) {
    let pivot = parseInt(bars[right].style.height);
    let i = left - 1;

    for (let j = left; j < right; j++) {
        bars[j].style.backgroundColor = "red";
        if (parseInt(bars[j].style.height) < pivot) {
            i++;
            await swap(i, j);
        }
        bars[j].style.backgroundColor = "steelblue";
    }

    await swap(i + 1, right);
    return i + 1;
}

async function heapSort() {
    let n = bars.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(n, i);
    }
    for (let i = n - 1; i > 0; i--) {
        await swap(0, i);
        await heapify(i, 0);
    }
}

async function heapify(n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && parseInt(bars[left].style.height) > parseInt(bars[largest].style.height)) {
        largest = left;
    }
    if (right < n && parseInt(bars[right].style.height) > parseInt(bars[largest].style.height)) {
        largest = right;
    }
    if (largest !== i) {
        await swap(i, largest);
        await heapify(n, largest);
    }
}

function swap(i, j) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let tempHeight = bars[i].style.height;
            bars[i].style.height = bars[j].style.height;
            bars[j].style.height = tempHeight;
            resolve();
        }, 100);
    });
}

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

generateArray();
