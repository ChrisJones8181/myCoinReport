class ListView {
  #parentElement = document.querySelector('.table');
  #data;

  #clear() {
    this.#parentElement.innerHTML = '';
  }

  render(data) {
    this.#data = data;
    this.#generateMarkup();
  }

  renderSpinner() {
    const markup = `
      <tr>  
        <div class="spinner">
         <span class="material-icons"> refresh </span>
        </div>
      <tr>
    `;
    // this._clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  formatCurrency(value) {
    const currency = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      // roundingPriority: 'lessPrecision',
      // maximumFractionDigits: 2,
      // minimumFractionDigits: 2,
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

  #generateMarkup() {
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
          <td>data</td>
        </tr>`
      );
    });
  }
}
export default new ListView();
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#specifications
