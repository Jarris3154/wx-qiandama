const moment = require('moment');

function getDiscount() {
  let discount = 10;

  let now = moment();
  //get today 19:00
  let today19 = moment().hour(16).minute(0).second(0);
  //30min period ms.
  let period30min = 30 * 60 * 1000;

  let diffMillis = now.diff(today19, "millisecond");

  if (now > today19) {
    let step = parseInt(diffMillis / period30min);
    discount -= step;
    discount = discount / 10;
  }

  return discount;
}

//计算价格
function calPrice(orders) {
  let total = 0;

  orders.forEach((item) => {
    total += item.price * item.discount;
  });
  return total;
}

//收集订单
function assembleOrder() {
  let orders = [];

  orders.push(
    {
      price: 2.89,
      discount: getDiscount(),
    },
    {
      price: 2.89,
      discount: getDiscount(),
    }
  );
  return orders;
}

module.exports.getDiscount = getDiscount; 