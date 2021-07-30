
function data({ title, img, price, unit }, host) {

    let preference = {
        items: [
            {
                id: "1234",
                title: String(title),
                description: "Dispositivo móvil de Tienda e-commerce",
                picture_url: `${host}${img}`,
                unit_price: Number(price),
                quantity: Number(unit)
            }
        ],
        payer: {
            name: "Lalo",
            surname: "Landa",
            email: "test_user_63274575@testuser.com",
            date_created: "2015-06-02T12:58:41.425-04:00",
            phone: {
                area_code: "11",
                number: 22223333
            },

            identification: {
                type: "DNI",
                number: "12345678"
            },

            address: {
                street_name: "Falsa",
                street_number: 123,
                zip_code: "1111"
            }
        },
        back_urls: {
            "success": `${host}success`,
            "failure": `${host}failure`,
            "pending": `${host}pending`
        },
        auto_return: "approved",
        payment_methods: {
            excluded_payment_methods: [
                {
                    id: "amex"
                }
            ],
            excluded_payment_types: [
                {
                    id: "atm"
                }
            ],
            installments: 6
        },
        notification_url: `https://hookb.in/jeedzwe0bos9dlMMdknl`,
        external_reference: "sala.eliezer@gmail.com"
    };
    return preference
}
module.exports = {
    data
}