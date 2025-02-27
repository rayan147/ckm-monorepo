import * as _ckm_db from '@ckm/db';
import * as _ts_rest_core from '@ts-rest/core';

declare const api: {
    orgs: {
        createOrganization: (args: {
            body: {
                name: string;
                imageUrl?: string | null | undefined;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 201;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                imageUrl?: string | null | undefined;
            };
            headers: Headers;
        } | {
            status: 400;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 200 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getOrganizations: (args?: {
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            query?: {
                skip?: string | undefined;
                take?: string | undefined;
                orderBy?: string | undefined;
            } | undefined;
        } | undefined) => Promise<{
            status: 200;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                imageUrl?: string | null | undefined;
            }[];
            headers: Headers;
        } | {
            status: 201 | 400 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getOrganization: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                imageUrl?: string | null | undefined;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        updateOrganization: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            body?: {
                name?: string | undefined;
                imageUrl?: string | null | undefined;
            } | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                imageUrl?: string | null | undefined;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        deleteOrganization: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                imageUrl?: string | null | undefined;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
    };
    users: {
        createUser: (args: {
            body: _ckm_db.Prisma.UserCreateWithoutRestaurantInput;
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 201;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                restaurantId: number | null;
                email: string;
                organizationId: number | null;
                sub: number | null;
                passwordHash: string;
                firstName: string;
                lastName: string;
                profileImage: string | null;
                verified: boolean;
                role: "ADMIN" | "MANAGER" | "CHEF" | "STAFF" | "VENDOR";
            };
            headers: Headers;
        } | {
            status: 400;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 200 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getUsers: (args?: {
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            query?: {
                skip?: string | undefined;
                take?: string | undefined;
                orderBy?: string | undefined;
            } | undefined;
        } | undefined) => Promise<{
            status: 200;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                restaurantId: number | null;
                email: string;
                organizationId: number | null;
                sub: number | null;
                passwordHash: string;
                firstName: string;
                lastName: string;
                profileImage: string | null;
                verified: boolean;
                role: "ADMIN" | "MANAGER" | "CHEF" | "STAFF" | "VENDOR";
            }[];
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getUser: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                restaurantId: number | null;
                email: string;
                organizationId: number | null;
                sub: number | null;
                passwordHash: string;
                firstName: string;
                lastName: string;
                profileImage: string | null;
                verified: boolean;
                role: "ADMIN" | "MANAGER" | "CHEF" | "STAFF" | "VENDOR";
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        updateUser: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            body?: _ckm_db.Prisma.UserUpdateInput | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                restaurantId: number | null;
                email: string;
                organizationId: number | null;
                sub: number | null;
                passwordHash: string;
                firstName: string;
                lastName: string;
                profileImage: string | null;
                verified: boolean;
                role: "ADMIN" | "MANAGER" | "CHEF" | "STAFF" | "VENDOR";
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        deleteUser: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                restaurantId: number | null;
                email: string;
                organizationId: number | null;
                sub: number | null;
                passwordHash: string;
                firstName: string;
                lastName: string;
                profileImage: string | null;
                verified: boolean;
                role: "ADMIN" | "MANAGER" | "CHEF" | "STAFF" | "VENDOR";
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
    };
    orders: {
        createOrder: (args: {
            body: _ckm_db.Prisma.OrderUncheckedCreateInput;
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 201;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                restaurantId: number;
                status: "CANCELLED" | "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED";
                vendorId: number;
            };
            headers: Headers;
        } | {
            status: 400;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 200 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getOrders: (args?: {
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            query?: {
                status?: "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED" | "CANCELLED" | undefined;
                skip?: number | undefined;
                take?: number | undefined;
                orderBy?: string | undefined;
                restaurantId?: number | undefined;
                vendorId?: number | undefined;
            } | undefined;
        } | undefined) => Promise<{
            status: 200;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                restaurantId: number;
                status: "CANCELLED" | "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED";
                vendorId: number;
            }[];
            headers: Headers;
        } | {
            status: 201 | 400 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getOrder: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                restaurantId: number;
                status: "CANCELLED" | "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED";
                vendorId: number;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        updateOrder: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            body?: _ckm_db.Prisma.OrderUncheckedUpdateInput | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                restaurantId: number;
                status: "CANCELLED" | "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED";
                vendorId: number;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        deleteOrder: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                restaurantId: number;
                status: "CANCELLED" | "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED";
                vendorId: number;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
    };
    orderItem: {
        createOrderItem: (args: {
            body: {
                orderId: number;
                ingredientId: number;
                quantity: number;
                unit: string;
                price: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 201;
            body: {
                id: number;
                orderId: number;
                ingredientId: number;
                quantity: number;
                unit: string;
                price: number;
            };
            headers: Headers;
        } | {
            status: 400;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 200 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getOrderItems: (args?: {
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            query?: {
                skip?: string | undefined;
                take?: string | undefined;
                orderId?: string | undefined;
            } | undefined;
        } | undefined) => Promise<{
            status: 200;
            body: {
                id: number;
                orderId: number;
                ingredientId: number;
                quantity: number;
                unit: string;
                price: number;
            }[];
            headers: Headers;
        } | {
            status: 201 | 400 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getOrderItem: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                orderId: number;
                ingredientId: number;
                quantity: number;
                unit: string;
                price: number;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        updateOrderItem: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            body?: {
                ingredientId?: number | undefined;
                quantity?: number | undefined;
                unit?: string | undefined;
                price?: number | undefined;
            } | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                orderId: number;
                ingredientId: number;
                quantity: number;
                unit: string;
                price: number;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        deleteOrderItem: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                orderId: number;
                ingredientId: number;
                quantity: number;
                unit: string;
                price: number;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
    };
    restaurant: {
        createRestaurant: (args: {
            body: _ckm_db.Prisma.RestaurantCreateInput;
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 201;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                imageUrl: string | null;
                address: string;
                city: string;
                zipCode: string;
                state: string;
                owner: string;
                organizationId: number | null;
                foodCost: number | null;
                isDeleted: boolean;
                deleted: Date | null;
            };
            headers: Headers;
        } | {
            status: 400;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 200 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getRestaurants: (args?: {
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            query?: {
                skip?: string | undefined;
                take?: string | undefined;
                organizationId?: string | undefined;
            } | undefined;
        } | undefined) => Promise<{
            status: 200;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                imageUrl: string | null;
                address: string;
                city: string;
                zipCode: string;
                state: string;
                owner: string;
                organizationId: number | null;
                foodCost: number | null;
                isDeleted: boolean;
                deleted: Date | null;
            }[];
            headers: Headers;
        } | {
            status: 201 | 400 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getRestaurant: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                imageUrl: string | null;
                address: string;
                city: string;
                zipCode: string;
                state: string;
                owner: string;
                organizationId: number | null;
                foodCost: number | null;
                isDeleted: boolean;
                deleted: Date | null;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        updateRestaurant: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            body?: _ckm_db.Prisma.RestaurantUpdateInput | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                imageUrl: string | null;
                address: string;
                city: string;
                zipCode: string;
                state: string;
                owner: string;
                organizationId: number | null;
                foodCost: number | null;
                isDeleted: boolean;
                deleted: Date | null;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        deleteRestaurant: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                imageUrl: string | null;
                address: string;
                city: string;
                zipCode: string;
                state: string;
                owner: string;
                organizationId: number | null;
                foodCost: number | null;
                isDeleted: boolean;
                deleted: Date | null;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
    };
    shifts: {
        createShift: (args: {
            body: _ckm_db.Prisma.ShiftUncheckedCreateInput;
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 201;
            body: {
                id: number;
                status: "COMPLETED" | "CANCELLED" | "SCHEDULED";
                startTime: Date;
                endTime: Date;
                userId: number;
            };
            headers: Headers;
        } | {
            status: 400;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 200 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getShifts: (args?: {
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            query?: {
                status?: "CANCELLED" | "SCHEDULED" | "COMPLETED" | undefined;
                skip?: number | undefined;
                take?: number | undefined;
                userId?: number | undefined;
                startTime?: string | undefined;
                endTime?: string | undefined;
            } | undefined;
        } | undefined) => Promise<{
            status: 400;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 200;
            body: {
                id: number;
                status: "COMPLETED" | "CANCELLED" | "SCHEDULED";
                startTime: Date;
                endTime: Date;
                userId: number;
            }[];
            headers: Headers;
        } | {
            status: 500;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 404 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getShift: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                status: "COMPLETED" | "CANCELLED" | "SCHEDULED";
                startTime: Date;
                endTime: Date;
                userId: number;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        updateShift: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            body?: _ckm_db.Prisma.ShiftUncheckedUpdateInput | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                status: "COMPLETED" | "CANCELLED" | "SCHEDULED";
                startTime: Date;
                endTime: Date;
                userId: number;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        deleteShift: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                status: "COMPLETED" | "CANCELLED" | "SCHEDULED";
                startTime: Date;
                endTime: Date;
                userId: number;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
    };
    recipe: {
        createRecipe: (args: {
            body: _ckm_db.Prisma.RecipeCreateInput;
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 201;
            body: {
                id: number;
                description: string | null;
                prepTime: number;
                cookTime: number;
                restaurantId: number;
                name: string;
                frequency: number | null;
                foodCost: number | null;
                isDeleted: boolean;
                imageUrls: string[];
                servings: number;
                cookBookId: number;
                isPublished: boolean;
                publishedAt: Date | null;
                language: string;
                skillLevel: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
            };
            headers: Headers;
        } | {
            status: 400;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 200 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        uploadFileS3: (args: {
            body: string | FormData;
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 201;
            body: {
                url: string;
            };
            headers: Headers;
        } | {
            status: 400;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 200 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getRecipes: (args?: {
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            query?: {
                skip?: number | undefined;
                take?: number | undefined;
                restaurantId?: number | undefined;
                searchTerm?: string | undefined;
            } | undefined;
        } | undefined) => Promise<{
            status: 200;
            body: {
                recipes: {
                    id: number;
                    description: string | null;
                    prepTime: number;
                    cookTime: number;
                    restaurantId: number;
                    name: string;
                    frequency: number | null;
                    foodCost: number | null;
                    isDeleted: boolean;
                    imageUrls: string[];
                    servings: number;
                    cookBookId: number;
                    isPublished: boolean;
                    publishedAt: Date | null;
                    language: string;
                    skillLevel: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
                }[];
                totalCount: number;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getRecipe: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                description: string | null;
                prepTime: number;
                cookTime: number;
                restaurantId: number;
                name: string;
                frequency: number | null;
                foodCost: number | null;
                isDeleted: boolean;
                imageUrls: string[];
                servings: number;
                cookBookId: number;
                isPublished: boolean;
                publishedAt: Date | null;
                language: string;
                skillLevel: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        updateRecipe: (args: {
            params: {
                id: number;
            };
            body: {
                data: _ckm_db.Prisma.RecipeUpdateInput;
                deleteIds?: {
                    ingredientIds: number[];
                    instructionIds: number[];
                };
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 400;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 200;
            body: {
                id: number;
                description: string | null;
                prepTime: number;
                cookTime: number;
                restaurantId: number;
                name: string;
                frequency: number | null;
                foodCost: number | null;
                isDeleted: boolean;
                imageUrls: string[];
                servings: number;
                cookBookId: number;
                isPublished: boolean;
                publishedAt: Date | null;
                language: string;
                skillLevel: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        deleteRecipe: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                description: string | null;
                prepTime: number;
                cookTime: number;
                restaurantId: number;
                name: string;
                frequency: number | null;
                foodCost: number | null;
                isDeleted: boolean;
                imageUrls: string[];
                servings: number;
                cookBookId: number;
                isPublished: boolean;
                publishedAt: Date | null;
                language: string;
                skillLevel: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        addIngredientToRecipe: (args: {
            params: {
                recipeId: number;
            };
            body: _ckm_db.Prisma.RecipeIngredientUncheckedCreateInput;
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 400;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 200;
            body: {
                id: number;
                recipeId: number;
                unit: string;
                notes: string | null;
                cost: number | null;
                ingredientId: number;
                quantity: number;
                processingInstructions: string | null;
                substituteIngredients: number[];
                isOptional: boolean;
                density: number | null;
                yield: number | null;
                joinAt: Date;
                recipeVersionId: number | null;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        removeIngredientFromRecipe: (args: {
            params: {
                id: number;
                recipeId: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                recipeId: number;
                unit: string;
                notes: string | null;
                cost: number | null;
                ingredientId: number;
                quantity: number;
                processingInstructions: string | null;
                substituteIngredients: number[];
                isOptional: boolean;
                density: number | null;
                yield: number | null;
                joinAt: Date;
                recipeVersionId: number | null;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        updateIngredientInRecipe: (args: {
            params: {
                id: number;
                recipeId: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            body?: _ckm_db.Prisma.RecipeIngredientUncheckedUpdateInput | undefined;
        }) => Promise<{
            status: 400;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 200;
            body: {
                id: number;
                recipeId: number;
                unit: string;
                notes: string | null;
                cost: number | null;
                ingredientId: number;
                quantity: number;
                processingInstructions: string | null;
                substituteIngredients: number[];
                isOptional: boolean;
                density: number | null;
                yield: number | null;
                joinAt: Date;
                recipeVersionId: number | null;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getRecipeIngredients: (args: {
            params: {
                recipeId: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                recipeId: number;
                unit: string;
                notes: string | null;
                cost: number | null;
                ingredientId: number;
                quantity: number;
                processingInstructions: string | null;
                substituteIngredients: number[];
                isOptional: boolean;
                density: number | null;
                yield: number | null;
                joinAt: Date;
                recipeVersionId: number | null;
            }[];
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getRecipeIngredient: (args: {
            params: {
                id: number;
                recipeId: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                recipeId: number;
                unit: string;
                notes: string | null;
                cost: number | null;
                ingredientId: number;
                quantity: number;
                processingInstructions: string | null;
                substituteIngredients: number[];
                isOptional: boolean;
                density: number | null;
                yield: number | null;
                joinAt: Date;
                recipeVersionId: number | null;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        addInstructionToRecipe: (args: {
            params: {
                recipeId: number;
            };
            body: _ckm_db.Prisma.RecipeInstructionCreateInput;
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 400;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 200;
            body: {
                id: number;
                recipeId: number;
                stepNumber: number;
                temperature: number | null;
                isCritical: boolean;
                imageUrl: string | null;
                recipeVersionId: number | null;
                instruction: string;
                timeInMinutes: number | null;
                temperatureUnit: string | null;
                techniqueTips: string | null;
                warningNotes: string | null;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        removeInstructionFromRecipe: (args: {
            params: {
                id: number;
                recipeId: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                recipeId: number;
                stepNumber: number;
                temperature: number | null;
                isCritical: boolean;
                imageUrl: string | null;
                recipeVersionId: number | null;
                instruction: string;
                timeInMinutes: number | null;
                temperatureUnit: string | null;
                techniqueTips: string | null;
                warningNotes: string | null;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        updateInstructionInRecipe: (args: {
            params: {
                id: number;
                recipeId: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            body?: _ckm_db.Prisma.RecipeInstructionUpdateInput | undefined;
        }) => Promise<{
            status: 400;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 200;
            body: {
                id: number;
                recipeId: number;
                stepNumber: number;
                temperature: number | null;
                isCritical: boolean;
                imageUrl: string | null;
                recipeVersionId: number | null;
                instruction: string;
                timeInMinutes: number | null;
                temperatureUnit: string | null;
                techniqueTips: string | null;
                warningNotes: string | null;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getRecipeInstruction: (args: {
            params: {
                id: number;
                recipeId: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                recipeId: number;
                stepNumber: number;
                temperature: number | null;
                isCritical: boolean;
                imageUrl: string | null;
                recipeVersionId: number | null;
                instruction: string;
                timeInMinutes: number | null;
                temperatureUnit: string | null;
                techniqueTips: string | null;
                warningNotes: string | null;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getRecipeInstructions: (args: {
            params: {
                recipeId: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                recipeId: number;
                stepNumber: number;
                temperature: number | null;
                isCritical: boolean;
                imageUrl: string | null;
                recipeVersionId: number | null;
                instruction: string;
                timeInMinutes: number | null;
                temperatureUnit: string | null;
                techniqueTips: string | null;
                warningNotes: string | null;
            }[];
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        calculateFoodCost: (args: {
            params: {
                recipeId: number;
            };
            body: {
                ingredientPrices: {
                    ingredientId: number;
                    price: number;
                }[];
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                totalCost: number;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getFoodCostHistory: (args: {
            params: {
                recipeId: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                recipeId: number;
                createdAt: Date;
                updatedAt: Date;
                date: Date;
                cost: number;
            }[];
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        calculateRecipePrice: (args: {
            params: {
                recipeId: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            body?: {
                profitMargin?: number | undefined;
            } | undefined;
        }) => Promise<{
            status: 200;
            body: {
                price: number;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getRecipePrice: (args: {
            params: {
                recipeId: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            query?: {
                profitMargin?: number | undefined;
            } | undefined;
        }) => Promise<{
            status: 200;
            body: {
                price: number;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
    };
    vendor: {
        createVendor: (args: {
            body: {
                name: string;
                contact: string;
                email: string;
                phone: string;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 201;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                orders: {
                    status?: "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED" | "CANCELLED" | undefined;
                    restaurantId?: number | undefined;
                    vendorId?: number | undefined;
                    vendor?: {
                        id: number;
                        name: string;
                    } | undefined;
                    items?: {
                        id: number;
                        orderId: number;
                        ingredientId: number;
                        quantity: number;
                        unit: string;
                        price: number;
                    }[] | undefined;
                }[];
                contact: string;
                email: string;
                phone: string;
            };
            headers: Headers;
        } | {
            status: 400;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 200 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getVendors: (args?: {
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            query?: {
                name?: string | undefined;
                skip?: string | undefined;
                take?: string | undefined;
            } | undefined;
        } | undefined) => Promise<{
            status: 200;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                orders: {
                    status?: "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED" | "CANCELLED" | undefined;
                    restaurantId?: number | undefined;
                    vendorId?: number | undefined;
                    vendor?: {
                        id: number;
                        name: string;
                    } | undefined;
                    items?: {
                        id: number;
                        orderId: number;
                        ingredientId: number;
                        quantity: number;
                        unit: string;
                        price: number;
                    }[] | undefined;
                }[];
                contact: string;
                email: string;
                phone: string;
            }[];
            headers: Headers;
        } | {
            status: 201 | 400 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getVendor: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                orders: {
                    status?: "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED" | "CANCELLED" | undefined;
                    restaurantId?: number | undefined;
                    vendorId?: number | undefined;
                    vendor?: {
                        id: number;
                        name: string;
                    } | undefined;
                    items?: {
                        id: number;
                        orderId: number;
                        ingredientId: number;
                        quantity: number;
                        unit: string;
                        price: number;
                    }[] | undefined;
                }[];
                contact: string;
                email: string;
                phone: string;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        updateVendor: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            body?: {
                name?: string | undefined;
                contact?: string | undefined;
                email?: string | undefined;
                phone?: string | undefined;
            } | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                orders: {
                    status?: "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED" | "CANCELLED" | undefined;
                    restaurantId?: number | undefined;
                    vendorId?: number | undefined;
                    vendor?: {
                        id: number;
                        name: string;
                    } | undefined;
                    items?: {
                        id: number;
                        orderId: number;
                        ingredientId: number;
                        quantity: number;
                        unit: string;
                        price: number;
                    }[] | undefined;
                }[];
                contact: string;
                email: string;
                phone: string;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        deleteVendor: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                orders: {
                    status?: "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED" | "CANCELLED" | undefined;
                    restaurantId?: number | undefined;
                    vendorId?: number | undefined;
                    vendor?: {
                        id: number;
                        name: string;
                    } | undefined;
                    items?: {
                        id: number;
                        orderId: number;
                        ingredientId: number;
                        quantity: number;
                        unit: string;
                        price: number;
                    }[] | undefined;
                }[];
                contact: string;
                email: string;
                phone: string;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
    };
    prepBoard: {
        createPrepBoard: (args: {
            body: _ckm_db.Prisma.PrepBoardCreateInput;
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 201;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                status: "COMPLETED" | "CANCELLED" | "PENDING" | "MISSING_ITEM" | "ON_PROGRESS" | "POSTPONE";
            };
            headers: Headers;
        } | {
            status: 400;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 200 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getPrepBoards: (args?: {
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            query?: {
                skip?: number | undefined;
                take?: number | undefined;
                orderBy?: Record<string, "asc" | "desc"> | undefined;
                where?: Record<string, any> | undefined;
            } | undefined;
        } | undefined) => Promise<{
            status: 200;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                status: "COMPLETED" | "CANCELLED" | "PENDING" | "MISSING_ITEM" | "ON_PROGRESS" | "POSTPONE";
            }[];
            headers: Headers;
        } | {
            status: 201 | 400 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getPrepBoard: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                status: "COMPLETED" | "CANCELLED" | "PENDING" | "MISSING_ITEM" | "ON_PROGRESS" | "POSTPONE";
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        updatePrepBoard: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            body?: _ckm_db.Prisma.PrepBoardUpdateInput | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                status: "COMPLETED" | "CANCELLED" | "PENDING" | "MISSING_ITEM" | "ON_PROGRESS" | "POSTPONE";
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        deletePrepBoard: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
    };
    auth: {
        resendCode: (args: {
            body: {
                email: string;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                code: string;
            };
            headers: Headers;
        } | {
            status: 401;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 404 | 500 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        login: (args: {
            body: {
                email: string;
                password: string;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                code: string;
                csrfToken?: string | undefined;
            };
            headers: Headers;
        } | {
            status: 401;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 404 | 500 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        verifyLoginCode: (args: {
            body: {
                code: string;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                accessToken: string;
                user: {
                    sub: number | null;
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    restaurantId: number | null;
                    organizationId: number | null;
                    email: string;
                    role: "ADMIN" | "MANAGER" | "CHEF" | "STAFF" | "VENDOR";
                    firstName: string;
                    lastName: string;
                    profileImage: string | null;
                    verified: boolean;
                };
            };
            headers: Headers;
        } | {
            status: 401;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 404 | 500 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        register: (args: {
            body: _ckm_db.Prisma.UserUncheckedCreateInput;
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 201;
            body: {
                sub: number | null;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                restaurantId: number | null;
                organizationId: number | null;
                email: string;
                role: "ADMIN" | "MANAGER" | "CHEF" | "STAFF" | "VENDOR";
                firstName: string;
                lastName: string;
                profileImage: string | null;
                verified: boolean;
            };
            headers: Headers;
        } | {
            status: 400;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 200 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        changePassword: (args: {
            params: {
                userId: number;
            };
            body: {
                oldPassword: string;
                newPassword: string;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 400;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 200;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        logout: (args: {
            body: {
                userId: number;
                accessToken: string;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 400;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 200;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        forgotPassword: (args: {
            body: {
                email: string;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 400;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 200;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        resetPassword: (args: {
            body: {
                newPassword: string;
                resetToken: string;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 400;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 200;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
    };
    earlyAccess: {
        storeEmail: (args: {
            body: {
                email: string;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 401;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 404 | 500 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        deleteEmail: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                email: string;
            };
            headers: Headers;
        } | {
            status: 401;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 404 | 500 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getEmails: (args?: {
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            query?: {
                skip?: string | undefined;
                take?: string | undefined;
                orderBy?: string | undefined;
                isEmailSent?: boolean | undefined;
            } | undefined;
        } | undefined) => Promise<{
            status: 201;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                isEmailSent: boolean;
            }[];
            headers: Headers;
        } | {
            status: 400;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 200 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getEmail: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                isEmailSent: boolean;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
    };
    menu: {
        createMenu: (args: {
            body: {
                name: string;
                restaurantId: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 201;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                restaurantId: number;
                name: string;
            };
            headers: Headers;
        } | {
            status: 400;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 200 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getMenus: (args?: {
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            query?: {
                skip?: number | undefined;
                take?: number | undefined;
                restaurantId?: number | undefined;
            } | undefined;
        } | undefined) => Promise<{
            status: 200;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                restaurantId: number;
                name: string;
            }[];
            headers: Headers;
        } | {
            status: 201 | 400 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getMenu: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                restaurantId: number;
                name: string;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        updateMenu: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            body?: {
                name?: string | undefined;
            } | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                restaurantId: number;
                name: string;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        deleteMenu: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
    };
    menuItem: {
        createMenuItem: (args: {
            body: _ckm_db.Prisma.MenuItemCreateInput;
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 201;
            body: {
                id: number;
                description: string | null;
                price: number;
                name: string;
                menuId: number;
                isActive: boolean;
                foodCost: number;
                recipeIds: number[];
                recipeServingsAmount: number[];
                recipeServingsCost: number[];
                allergens: string[];
                categoryId: number | null;
            };
            headers: Headers;
        } | {
            status: 400;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 200 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getMenuItems: (args?: {
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            query?: {
                skip?: number | undefined;
                take?: number | undefined;
                menuId?: number | undefined;
            } | undefined;
        } | undefined) => Promise<{
            status: 200;
            body: {
                id: number;
                description: string | null;
                price: number;
                name: string;
                menuId: number;
                isActive: boolean;
                foodCost: number;
                recipeIds: number[];
                recipeServingsAmount: number[];
                recipeServingsCost: number[];
                allergens: string[];
                categoryId: number | null;
            }[];
            headers: Headers;
        } | {
            status: 201 | 400 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getMenuItem: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                description: string | null;
                price: number;
                name: string;
                menuId: number;
                isActive: boolean;
                foodCost: number;
                recipeIds: number[];
                recipeServingsAmount: number[];
                recipeServingsCost: number[];
                allergens: string[];
                categoryId: number | null;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        updateMenuItem: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            body?: _ckm_db.Prisma.MenuItemUpdateInput | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                description: string | null;
                price: number;
                name: string;
                menuId: number;
                isActive: boolean;
                foodCost: number;
                recipeIds: number[];
                recipeServingsAmount: number[];
                recipeServingsCost: number[];
                allergens: string[];
                categoryId: number | null;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        deleteMenuItem: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        addRecipeToMenuItem: (args: {
            body: {
                recipeId: number;
                menuItemId: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                description: string | null;
                price: number;
                name: string;
                menuId: number;
                isActive: boolean;
                foodCost: number;
                recipeIds: number[];
                recipeServingsAmount: number[];
                recipeServingsCost: number[];
                allergens: string[];
                categoryId: number | null;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getMenuItemByRecipeId: (args: {
            params: {
                recipeId: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                description: string | null;
                price: number;
                name: string;
                menuId: number;
                isActive: boolean;
                foodCost: number;
                recipeIds: number[];
                recipeServingsAmount: number[];
                recipeServingsCost: number[];
                allergens: string[];
                categoryId: number | null;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        calculateMenuItemPrice: (args: {
            params: {
                menuItemId: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: number;
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        calculateMenuItemFoodCostPercentage: (args: {
            params: {
                menuItemId: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: number;
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        calculateItemsFoodCostPercentage: (args: {
            query: {
                menuItemIds: number[];
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: number;
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
    };
    analytics: {
        getFoodCostHistory: (args: {
            query: {
                recipeId: string;
                startDate: string;
                endDate: string;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                recipeId: number;
                createdAt: Date;
                updatedAt: Date;
                date: Date;
                cost: number;
            }[];
            headers: Headers;
        } | {
            status: 201 | 400 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getPrepHistory: (args: {
            query: {
                recipeId: string;
                startDate: string;
                endDate: string;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                recipeId: number;
                createdAt: Date;
                updatedAt: Date;
                date: Date;
                quantity: number;
            }[];
            headers: Headers;
        } | {
            status: 201 | 400 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getMenuAnalytics: (args: {
            query: {
                menuId: string;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                lowestCostItem: {
                    id: number;
                    description: string | null;
                    price: number;
                    name: string;
                    menuId: number;
                    isActive: boolean;
                    foodCost: number;
                    recipeIds: number[];
                    recipeServingsAmount: number[];
                    recipeServingsCost: number[];
                    allergens: string[];
                    categoryId: number | null;
                };
                highestCostItem: {
                    id: number;
                    description: string | null;
                    price: number;
                    name: string;
                    menuId: number;
                    isActive: boolean;
                    foodCost: number;
                    recipeIds: number[];
                    recipeServingsAmount: number[];
                    recipeServingsCost: number[];
                    allergens: string[];
                    categoryId: number | null;
                };
                averageFoodCost: number;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getRecipeAnalytics: (args: {
            query: {
                recipeId: string;
                startDate: string;
                endDate: string;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                averageFoodCost: number;
                averagePrepsPerWeek: number;
                totalPrepCount: number;
                foodCostTrend: {
                    date: string;
                    cost: number;
                }[];
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getRestaurantAnalytics: (args: {
            query: {
                restaurantId: string;
                startDate: string;
                endDate: string;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                averageFoodCost: number;
                foodCostTrend: {
                    date: string;
                    cost: number;
                }[];
                totalRecipes: number;
                totalMenuItems: number;
                mostPreparedRecipes: {
                    recipe: {
                        id: number;
                        description: string | null;
                        prepTime: number;
                        cookTime: number;
                        restaurantId: number;
                        name: string;
                        frequency: number | null;
                        foodCost: number | null;
                        isDeleted: boolean;
                        imageUrls: string[];
                        servings: number;
                        cookBookId: number;
                        isPublished: boolean;
                        publishedAt: Date | null;
                        language: string;
                        skillLevel: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
                    };
                    prepCount: number;
                }[];
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
    };
    cookbook: {
        createCookBook: (args: {
            body: {
                name: string;
                category: string;
                imageUrl?: string | undefined;
                restaurantId?: number | undefined;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 201;
            body: {
                id: number;
                restaurantId: number | null;
                name: string;
                imageUrl: string | null;
                category: string;
            };
            headers: Headers;
        } | {
            status: 400;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 200 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getCookBooks: (args?: {
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            query?: {
                skip?: number | undefined;
                take?: number | undefined;
                restaurantId?: number | undefined;
            } | undefined;
        } | undefined) => Promise<{
            status: 200;
            body: {
                id: number;
                restaurantId: number | null;
                name: string;
                imageUrl: string | null;
                category: string;
            }[];
            headers: Headers;
        } | {
            status: 201 | 400 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getCookBook: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                restaurantId: number | null;
                name: string;
                imageUrl: string | null;
                category: string;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        updateCookBook: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            body?: {
                name?: string | undefined;
                imageUrl?: string | undefined;
                restaurantId?: number | undefined;
                category?: string | undefined;
            } | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                restaurantId: number | null;
                name: string;
                imageUrl: string | null;
                category: string;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        deleteCookBook: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
    };
    ingredient: {
        createIngredient: (args: {
            body: {
                name: string;
                price: number;
                category: string;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 201;
            body: {
                id: number;
                price: number;
                name: string;
                category: string;
                dietaryRestrictionId: number | null;
            };
            headers: Headers;
        } | {
            status: 400;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 200 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getIngredients: (args?: {
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            query?: {
                skip?: number | undefined;
                take?: number | undefined;
                orderBy?: Record<string, "asc" | "desc"> | undefined;
                where?: Record<string, any> | undefined;
            } | undefined;
        } | undefined) => Promise<{
            status: 200;
            body: {
                id: number;
                price: number;
                name: string;
                category: string;
                dietaryRestrictionId: number | null;
            }[];
            headers: Headers;
        } | {
            status: 201 | 400 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getIngredient: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                price: number;
                name: string;
                category: string;
                dietaryRestrictionId: number | null;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        updateIngredient: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            body?: {
                name?: string | undefined;
                price?: number | undefined;
                category?: string | undefined;
            } | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                price: number;
                name: string;
                category: string;
                dietaryRestrictionId: number | null;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        deleteIngredient: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
    };
    prepItem: {
        createPrepItem: (args: {
            body: _ckm_db.Prisma.PrepItemCreateInput;
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 201;
            body: {
                id: number;
                recipeId: number;
                status: "COMPLETED" | "CANCELLED" | "PENDING" | "MISSING_ITEM" | "ON_PROGRESS" | "POSTPONE";
                quantity: number;
                assignedToId: number;
                prepBoardId: number;
            };
            headers: Headers;
        } | {
            status: 400;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 200 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getPrepItems: (args?: {
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            query?: {
                skip?: number | undefined;
                take?: number | undefined;
                orderBy?: Record<string, "asc" | "desc"> | undefined;
                where?: Record<string, any> | undefined;
            } | undefined;
        } | undefined) => Promise<{
            status: 200;
            body: {
                id: number;
                recipeId: number;
                status: "COMPLETED" | "CANCELLED" | "PENDING" | "MISSING_ITEM" | "ON_PROGRESS" | "POSTPONE";
                quantity: number;
                assignedToId: number;
                prepBoardId: number;
            }[];
            headers: Headers;
        } | {
            status: 201 | 400 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getPrepItem: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                recipeId: number;
                status: "COMPLETED" | "CANCELLED" | "PENDING" | "MISSING_ITEM" | "ON_PROGRESS" | "POSTPONE";
                quantity: number;
                assignedToId: number;
                prepBoardId: number;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        updatePrepItem: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            body?: _ckm_db.Prisma.PrepItemUpdateInput | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                recipeId: number;
                status: "COMPLETED" | "CANCELLED" | "PENDING" | "MISSING_ITEM" | "ON_PROGRESS" | "POSTPONE";
                quantity: number;
                assignedToId: number;
                prepBoardId: number;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        deletePrepItem: (args: {
            params: {
                id: number;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
    };
};

export { api };
