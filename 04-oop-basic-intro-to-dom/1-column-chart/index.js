export default class ColumnChart {
  element;
  elements = {};
  chartHeight = 50;

  constructor({
    data = [],
    label = '',
    link = '',
    value = 0
  } = {}) {
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = value;
    this.render();
  }

  getColumnBody(data) {
    return data.map(item => 
    {
      const scale = this.chartHeight / Math.max(...data); //считаем масштаб для колонок
      const percent = (item / Math.max(...data) * 100).toFixed(0); //считаем проценты
      return `<div style="--value: ${Math.floor(item * scale)}" data-tooltip="${percent}%"></div>`; // получаем стили для столбиков
    }).join('');
  }

  getLink() {
    return this.link ? `<a class="column-chart__link" href="${this.link}">View all</a>` : ''; //ссылочки ведущие в неизвестность
  }

  get block() {
    //скелет
    return `
      <div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
          Total ${this.label}
          ${this.getLink()}
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">
            ${this.value}
          </div>
          <div data-element="body" class="column-chart__chart">
            ${this.getColumnBody(this.data)}
          </div>
        </div>
      </div>
    `;
  }

  getelements(element) {
    const array = element.querySelectorAll('[data-element]');

    return [...array].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  //почистим
  remove() {
    this.element.remove(); 
  }

  destroy() {
    this.remove();
  }
  //нарисуем
  render() {
    const element = document.createElement('div');

    element.innerHTML = this.block;
    this.element = element.firstElementChild;

    if (this.data.length) {
      this.element.classList.remove('column-chart_loading');// O_o
    }

    this.elements = this.getelements(this.element);
  }
  //обновим
  update({headerData, bodyData}) {
    this.elements.header.textContent = headerData;
    this.elements.body.innerHTML = this.getColumnBody(bodyData);
  }
}
