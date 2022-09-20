import Sparkline from 'sparklines';

class ListView {
  #parentElement = document.querySelector('.table');
  #data;

  clear() {
    this.#parentElement.innerHTML = '';
  }

  render(data) {
    this.#data = data;
    this.#generateMarkup();
  }

  renderSpinner() {
    const markup = `
      <tr class="spinnerRow">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>
          <div class="spinner">
            <span class="material-icons"> refresh </span>
          </div>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    `;

    this.#parentElement.insertAdjacentHTML('beforeend', markup);
  }

  formatCurrency(value) {
    const currency = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      roundingPriority: 'lessPrecision',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      minimumSignificantDigits: 3,
    }).format(value);
    return currency;
  }

  formatPercentage(value) {
    const percentage = new Intl.NumberFormat('en-GB', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      signDisplay: 'exceptZero',
    }).format(value);

    let style = '';
    if (value > 0) style = ' class="percentageIncrease"';
    if (value < 0) style = ' class="percentageDecrease"';

    return `<p${style}>${percentage}</p$>`;
  }

  formatSupply(value) {
    const supply = new Intl.NumberFormat('en-GB', {
      maximumFractionDigits: 0,
    }).format(value);

    return supply;
  }

  renderSparkline(id, data) {
    let colour = '';
    if (data[0] > data[data.length - 1]) colour = 'crimson';
    if (data[0] < data[data.length - 1]) colour = 'green';

    const sparkline = new Sparkline(document.getElementById(`${id}`), {
      lineColor: `${colour}`,
      height: 35,
      endColor: 'transparent',
    });
    sparkline.draw(data);
  }

  #generateMarkup() {
    //Remove spinner
    document.querySelector('.spinnerRow').remove();
    //Render the data
    this.#data.forEach(element => {
      this.#parentElement.insertAdjacentHTML(
        'beforeend',
        `      
        <tr>
          <td>${element.market_cap_rank}</td>
          <td><img class="coinIcon" src="${element.image}" alt="Icon"/></td>
          <td>${element.name}</td>
          <td>${element.symbol.toUpperCase()}</td>
          <td>${this.formatCurrency(element.current_price)}</td>
          <td>${this.formatPercentage(
            element.price_change_percentage_24h_in_currency
          )}%</td>
          <td>${this.formatPercentage(
            element.price_change_percentage_7d_in_currency
          )}%</td>
          <td>${this.formatPercentage(
            element.price_change_percentage_30d_in_currency
          )}%</td>
          <td>${this.formatCurrency(element.market_cap)}</td>
          <td>${this.formatSupply(
            element.circulating_supply
          )} ${element.symbol.toUpperCase()}</td>
          <td id="${element.symbol}">data</td>
        </tr>`
      );
      this.renderSparkline(element.symbol, element.sparkline_in_7d.price);
    });
  }
}
export default new ListView();
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#specifications
