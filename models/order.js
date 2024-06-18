import { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // one to many relations. user will create many orders
        // required: true,
    },
    cartItems: [
        {
          id: { type: String, required: true },
          name: { type: String, required: true },
          description: { type: String, required: false },
          price_id: { type: String, required: true },
          price: { type: Number, required: true },
          quantity: { type: Number, required: true },
          image: { type: String, required: true },
        },
      ],
    line_items: [{
        id: { type: String, required: true },
        name: { type: String, required: false },
        quantity: { type: Number, required: true },
        unit_amount:  { type: Number, required: true },
        currency:  { type: String, required: true },
        price_id: { type: String, required: true },
    }],
    cusId: {
        type: String,
    },
    paymentIntent: {
        type: String, 
        unique: [true, 'PaymentIntent ID already exists'],
        required: [true, 'PaymentIntent ID is required'],
    },
    status: {
        type: String,
        // required: true,
    },
    pi_created: {
        type: String,
        // required: true,
    },
    totalAmount: { 
        type: String, 
        // required: true 
    },
    receipt: { 
        type: String, 
        // required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});
    

//model object provided by mongoose.
// check if order model exists in DB, if not create new model
//becase this route gets call everytiem connection gets establish 
// from scratch so it need addtional check
const Order = models.Order || model("Order", OrderSchema);

export default Order;
