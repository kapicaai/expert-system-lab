class Perceptron {
  constructor(bias = 1, learningRate = 0.1, weights = []) {
    this.bias = bias;
    this.learningRate = learningRate;
    this.weights = weights;
    this.trainingSet = [];
  }

  init(inputs, bias = this.bias) {
    // Инициализируем веса случайными значениями и добавляем сдвиговый вес
    this.weights = [...inputs.map(i => Math.random()), bias];
  }

  adjustWeights(inputs, expected) {
    const actual = this.evaluate(inputs);
    if (actual == expected) return true; // Если ошибки нет, возвращаем ничего не трогая
    // В противном случае корректируем веса, добавляя error * learningRate относительно очередного
    this.weights = this.weights.map(
      (w, i) => (w += this.delta(actual, expected, inputs[i]))
    );
  }

  // Вычисляем разницу между выводом и ожиданием для текущего ввода
  delta(actual, expected, input, learningRate = this.learningRate) {
    const error = expected - actual; // Насколько мы ошиблись
    return error * learningRate * input;
  }

  // Сумма inputs * weights
  weightedSum(inputs = this.inputs, weights = this.weights) {
    return inputs.map((inp, i) => inp * weights[i]).reduce((x, y) => x + y, 0);
  }

  // Вычисляем результат с текущими весами
  evaluate(inputs) {
    console.log('INPUTS', inputs);
    return this.activate(this.weightedSum(inputs));
  }

  // Heaviside в качестве функции активации
  activate(value) {
    console.log('VALUE', value);
    return value >= 0 ? 1 : 0;
  }

  getWeights() {
    return [...this.weights];
  }
}

let perceptron;

function getInstance() {
  if (!perceptron) {
    perceptron = new Perceptron();
  }
  return perceptron;
}

export default getInstance;
