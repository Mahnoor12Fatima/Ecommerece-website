export interface product{
    name:string,
    price:number,
    category:string,
    color:string,
    image:string,
    description:string,
    id:number,
    quantity:undefined | number,
    productId:undefined|number,
    inStock: boolean,
    onSale: boolean,
    salePercentage:undefined | number, // Optional field
    isNewArrival: boolean
  }