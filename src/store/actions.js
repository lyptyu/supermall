import {
  ADD_COUNTER, ADD_TO_CART
} from "./mutation-types"

export default {
  addCart(context, payload) {
    let oldproduct = context.state.cartList.find(item=>item.iid===payload.iid)
    //判断oldProduct
    if(oldproduct){
      // oldproduct.count+=1
      context.commit(ADD_COUNTER,oldproduct)
    }else{
      payload.count=1
      // context.cartList.push(payload)
      context.commit(ADD_TO_CART,payload)
    }

  }
}