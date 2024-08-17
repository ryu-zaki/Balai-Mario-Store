
const CreateField = (question, answer) => {

    return ({
        question,
        answer
    })
}

const source = [
    CreateField(
        "How do I reserve a food?", 
        "You can reserve a food by clicking a checkout button in a cart modal, or clicking the order now button on a particular product page"
    ),
    CreateField(
        "What are the available payments methods?", 
        "We are accepting payments via Paypal, GCASH, and debit/credit cards"
    ),
    CreateField(
        "Can I modify or cancel my reservation?", 
        `Yes, you can modify or cancel your reservation by logging into your account and accessing the "My Reservations" section. Please note that cancellations made within 24 hours of the reservation time may incur a fee.`
    ),
    CreateField(
        "Do I need to create an account to make a reservation?", 
        "Creating an account is required, it is for a better experience. With an account, you can easily manage your reservations, track your order history, and receive special offers."
    ),
    CreateField(
        "Is my payment information secure?", 
        "Yes, we use industry-standard encryption and secure payment gateways to ensure that your payment information is safe and secure."
    ),

    CreateField(
        "Can I order food for delivery or takeaway?", 
    `Yes, our eCommerce platform allows you to place orders for both delivery and takeaway. Simply select the "Order Now" button, and specify your preference for delivery or takeaway.`),

    CreateField(
        "How can I check the status of my order?", 
        `You can check the status of your order by logging into your account and navigating to the "My Orders" section. You will also receive email and SMS updates about your order status.`),

    CreateField(
        "Do you offer any discounts or promotions?",
        `Yes, we frequently offer discounts and promotions. You can find the latest offers on our "Promotions" page or by subscribing to our newsletter. Account holders may also receive exclusive deals.`
    ),

    CreateField(
        "How can I provide feedback about my dining experience or order?", 
       `We value your feedback and encourage you to share your experience with us. You can provide feedback through our website's "Contact Us" page or by leaving a review on individual product page. Your input helps us improve our services.`
    )
]

export default source;