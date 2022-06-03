import { nanoid } from 'nanoid';

import './style.css';

const app = document.querySelector<HTMLDivElement>('#app')!;

const mark = document.querySelector<HTMLInputElement>('#mark')!;
const weight = document.querySelector<HTMLInputElement>('#weight')!;

const form = document.querySelector<HTMLFormElement>('#form')!;

const marksContainer = document.querySelector<HTMLUListElement>('#marks')!;

const average = document.querySelector<HTMLHeadingElement>('#average')!;

type Mark = {
    id: string;
    mark: number;
    weight: number;
};

const markList: Mark[] = [];

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const markAsNumber = mark.valueAsNumber;
    const weightAsNumber = weight.valueAsNumber;

    if (
        !Number(markAsNumber) ||
        Number(markAsNumber) < 0 ||
        Number(markAsNumber) > 6
    )
        return alert('Please enter a proper mark (1 - 6).');

    if (!Number(weightAsNumber) || Number(weightAsNumber) < 0)
        return alert('Please enter a proper weight ( >0 ).');

    //Everything is OK! Adding to the list.
    const newMark: Mark = {
        id: nanoid(),
        mark: markAsNumber,
        weight: weightAsNumber
    };

    markList.push(newMark);
    createMarkElement(newMark);

    calculateAverage();

    //All done. Clearing inputs.
    mark.value = '';
    weight.value = '';
});

const getSumOfMarks = (_markList: Mark[]) => {
    return _markList.reduce((acc: number, mark: Mark) => {
        return acc + mark.mark * mark.weight;
    }, 0);
};

const getSumOfWeights = (_markList: Mark[]) => {
    return _markList.reduce((acc: number, mark: Mark) => {
        return acc + mark.weight;
    }, 0);
};

const createMarkElement = ({ id, mark, weight }: Mark) => {
    const li = document.createElement('li');

    const markContainer = document.createElement('div');
    const weightContainer = document.createElement('div');
    const removeButton = document.createElement('button');

    removeButton.innerText = 'DELETE';
    removeButton.addEventListener('click', () => removeMarkFromList(id));

    markContainer.innerText = `Mark: ${mark.toString()}`;
    weightContainer.innerText = `Weight: ${weight.toString()}`;

    li.appendChild(markContainer);
    li.appendChild(weightContainer);
    li.appendChild(removeButton);

    marksContainer?.appendChild(li);
};

const redrawMarks = () => {
    marksContainer.textContent = '';

    markList.forEach((mark: Mark) => {
        createMarkElement(mark);
    });
};

const calculateAverage = () => {
    if (markList.length <= 0) {
        average.innerText = `Average: 0`;
        return;
    }

    const calculatedAverage: number =
        getSumOfMarks(markList) / getSumOfWeights(markList);

    const roundedCalculatedAverage = calculatedAverage.toFixed(2);

    average.innerText = `Average: ${roundedCalculatedAverage}`;
};

const removeMarkFromList = (id: string) => {
    const markToRemove = markList.find((mark: Mark) => mark.id === id);

    if (markToRemove) {
        const index = markList.findIndex((mark: Mark) => mark === markToRemove);
        markList.splice(index, 1);
        console.log(markList);

        redrawMarks();
        calculateAverage();
    }
};
