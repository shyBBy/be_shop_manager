export class CouponCreateDto {
  
  code: "10off",
  discount_type: "percent",
  description: '',
  date_expires: 'lub expires_gmt',
  usage_limit_per_user: 1,
  amount: "10",//wartość rabatu
  individual_use: true, //czyli nie może być używany z innymi kuponami
  exclude_sale_items: true,// czyli nie zadziala na produktach przecenionych
  minimum_amount: "100.00"//minimalna wartość koszyka
  // https://woocommerce.github.io/woocommerce-rest-api-docs/#coupon-properties
}