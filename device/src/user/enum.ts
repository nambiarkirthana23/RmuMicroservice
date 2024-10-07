export enum UserRole {
    SUPERADMIN = 'superadmin',
    ADMIN = 'admin',
    SUPERUSER = 'superuser',
    USER = 'user',
}



// NOTE: Dont change name of databases
export enum DB {
    host = "127.0.0.1",
    port = "3306",
    user = "root",
    password = "password",
    database = "rmucloud",
}

// export enum MqCreds {
//     HOST = "mqtt://localhost",
//     PORT = "1883",
//     USERNAME = "rotomag",
//     PASSWORD = "mqtt_rotomag"
// }

//134.209.148.188
// FLFLUX Cloud 
// export enum FluxCloud {
//     HOST = 'http://134.209.148.188',
//     EMAIL = 'fountlab@gmail.com',
//     PWD = '12345678',
//     BROKER = '134.209.148.188',
//     PORT = '1883'
// }


// export enum RotoFluxCloud {
//     HOST = 'http://134.209.148.188',
//     PORT = '3002',
// }


// export enum FluxCloud {
//     HOST = 'http://flflux.io',
//     EMAIL = 'rotomag@gmail.com',
//     PWD = '12345678',
//     BROKER = 'flflux.io',
//     PORT = '1883'
// }

export enum FluxCloud {
    HOST = 'http://magpil.com',
    EMAIL = 'rotomag@gmail.com',
    PWD = '12345678',
    BROKER = 'magpil.com',
    PORT = '1883'
}


export enum RotoFluxCloud {
    HOST = 'http://rotoflux.io',
    PORT = '3002',
}
