export const environment = {
    version: '1.0.0',
    //URL: 'http://localhost:8000/',
    URL: 'http://banco.coredomain.xyz/',
    
};

export const numeral = {
    type_user: {
        /** 1 */
        client: 1,
        /** 2 */
        admin: 2
    },
    status: {
        /** 1 */
        approved: 1,
        /** 2 */
        rejected: 2,
        /** 3 */
        pending: 3,
    },
    account_type: {
        /** 1 */
        corriente: 1,
        /** 2 */
        ahorro: 2
    },
    coin: [
        {
            id: 1,
            name: 'COP',
            value: 1
        },
        {
            id: 2,
            name: 'USD',
            value: 3500
        }
    ]
}
