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
          <td>${element.current_price}</td>
          <td>${element.price_change_percentage_24h}</td>
          <td>${element.market_cap}</td>
          <td>${element.circulating_supply}</td>
        </tr>`
      );
    });
  }
}
export default new ListView();
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#specifications
