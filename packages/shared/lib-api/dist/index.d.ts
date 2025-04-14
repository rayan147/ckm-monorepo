import * as _ts_rest_core from '@ts-rest/core';
import { ApiFetcherArgs } from '@ts-rest/core';
import * as _ckm_db from '@ckm/db';

declare const api: {
    orgs: {
        createOrganization: (args: {
            body: _ckm_db.Prisma.OrganizationCreateInput;
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
                imageUrl: string | null;
            }[];
            headers: Headers;
        } | {
            status: 201 | 400 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getOrganization: (args: {
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            body?: _ckm_db.Prisma.OrganizationUpdateInput | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                imageUrl: string | null;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            body: _ckm_db.Prisma.UserCreateInput & {
                password: string;
                role?: "ADMIN" | "MANAGER" | "CHEF" | "STAFF" | "VENDOR" | undefined;
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
                restaurantId: number | null;
                email: string;
                organizationId: number | null;
                sub: number | null;
                firstName: string;
                lastName: string;
                profileImage: string | null;
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
                firstName: string;
                lastName: string;
                profileImage: string | null;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
                firstName: string;
                lastName: string;
                profileImage: string | null;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 500;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getAuthUser: (args: {
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                sub: number | null;
                id: number;
                email: string;
                firstName: string;
                lastName: string;
                profileImage: string | null;
                organizationId: number | null;
                restaurantId: number | null;
                createdAt: Date;
                updatedAt: Date;
                auth: {
                    id: string;
                    userId: number;
                    passwordHash: string;
                    role: "ADMIN" | "MANAGER" | "CHEF" | "STAFF" | "VENDOR";
                }[];
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 500;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        updateUser: (args: {
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
                firstName: string;
                lastName: string;
                profileImage: string | null;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
                firstName: string;
                lastName: string;
                profileImage: string | null;
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
            body: _ckm_db.Prisma.OrderCreateInput;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            body?: _ckm_db.Prisma.OrderUpdateInput | undefined;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            body: _ckm_db.Prisma.OrderItemCreateInput;
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 201;
            body: {
                id: number;
                unit: string;
                price: number;
                ingredientId: number;
                quantity: number;
                orderId: number;
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
                unit: string;
                price: number;
                ingredientId: number;
                quantity: number;
                orderId: number;
            }[];
            headers: Headers;
        } | {
            status: 201 | 400 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getOrderItem: (args: {
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                unit: string;
                price: number;
                ingredientId: number;
                quantity: number;
                orderId: number;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            body?: _ckm_db.Prisma.OrderItemUpdateInput | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                unit: string;
                price: number;
                ingredientId: number;
                quantity: number;
                orderId: number;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                unit: string;
                price: number;
                ingredientId: number;
                quantity: number;
                orderId: number;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            body: any;
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
                category: "APPETIZER" | "SOUP" | "SALAD" | "MAIN_COURSE" | "SIDE_DISH" | "DESSERT" | "BEVERAGE" | "BREAKFAST" | "BRUNCH" | "LUNCH" | "DINNER" | "SNACK" | "BAKED_GOOD" | "SAUCE" | "CONDIMENT" | "SPECIAL";
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
                    category: "APPETIZER" | "SOUP" | "SALAD" | "MAIN_COURSE" | "SIDE_DISH" | "DESSERT" | "BEVERAGE" | "BREAKFAST" | "BRUNCH" | "LUNCH" | "DINNER" | "SNACK" | "BAKED_GOOD" | "SAUCE" | "CONDIMENT" | "SPECIAL";
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
                category: "APPETIZER" | "SOUP" | "SALAD" | "MAIN_COURSE" | "SIDE_DISH" | "DESSERT" | "BEVERAGE" | "BREAKFAST" | "BRUNCH" | "LUNCH" | "DINNER" | "SNACK" | "BAKED_GOOD" | "SAUCE" | "CONDIMENT" | "SPECIAL";
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            body?: _ckm_db.Prisma.RecipeUpdateInput | undefined;
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
                category: "APPETIZER" | "SOUP" | "SALAD" | "MAIN_COURSE" | "SIDE_DISH" | "DESSERT" | "BEVERAGE" | "BREAKFAST" | "BRUNCH" | "LUNCH" | "DINNER" | "SNACK" | "BAKED_GOOD" | "SAUCE" | "CONDIMENT" | "SPECIAL";
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
                category: "APPETIZER" | "SOUP" | "SALAD" | "MAIN_COURSE" | "SIDE_DISH" | "DESSERT" | "BEVERAGE" | "BREAKFAST" | "BRUNCH" | "LUNCH" | "DINNER" | "SNACK" | "BAKED_GOOD" | "SAUCE" | "CONDIMENT" | "SPECIAL";
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
            body: _ckm_db.Prisma.RecipeIngredientUncheckedCreateInput;
            cache?: RequestCache | undefined;
            params: {
                recipeId: number;
            };
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
                density: number | null;
                processingInstructions: string | null;
                substituteIngredients: number[];
                isOptional: boolean;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
                recipeId: number;
            };
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
                density: number | null;
                processingInstructions: string | null;
                substituteIngredients: number[];
                isOptional: boolean;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
                recipeId: number;
            };
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
                density: number | null;
                processingInstructions: string | null;
                substituteIngredients: number[];
                isOptional: boolean;
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
            cache?: RequestCache | undefined;
            params: {
                recipeId: number;
            };
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
                density: number | null;
                processingInstructions: string | null;
                substituteIngredients: number[];
                isOptional: boolean;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
                recipeId: number;
            };
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
                density: number | null;
                processingInstructions: string | null;
                substituteIngredients: number[];
                isOptional: boolean;
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
            body: _ckm_db.Prisma.RecipeInstructionCreateInput;
            cache?: RequestCache | undefined;
            params: {
                recipeId: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
                recipeId: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
                recipeId: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
                recipeId: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                recipeId: number;
            };
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
            body: {
                ingredientPrices: {
                    ingredientId: number;
                    price: number;
                }[];
            };
            cache?: RequestCache | undefined;
            params: {
                recipeId: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                recipeId: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                recipeId: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                recipeId: number;
            };
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
            body: _ckm_db.Prisma.VendorCreateInput;
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
                email: string;
                contact: string;
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
                skip?: string | undefined;
                take?: string | undefined;
                name?: string | undefined;
            } | undefined;
        } | undefined) => Promise<{
            status: 200;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                email: string;
                contact: string;
                phone: string;
            }[];
            headers: Headers;
        } | {
            status: 201 | 400 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getVendor: (args: {
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
                email: string;
                contact: string;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            body?: _ckm_db.Prisma.VendorUpdateInput | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                email: string;
                contact: string;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
                email: string;
                contact: string;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
        login: (args: {
            body: {
                password: string;
                email: string;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                success: boolean;
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
                verificationCode: string;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                sessionToken: string;
                user: {
                    sub: number | null;
                    id: number;
                    email: string;
                    firstName: string;
                    lastName: string;
                    profileImage: string | null;
                    organizationId: number | null;
                    restaurantId: number | null;
                    createdAt: Date;
                    updatedAt: Date;
                    auth: ({
                        id: string;
                        userId: number;
                        passwordHash: string;
                        role: "ADMIN" | "MANAGER" | "CHEF" | "STAFF" | "VENDOR";
                    } | undefined)[];
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
            body: {
                password: string;
                email: string;
                firstName: string;
                lastName: string;
                role?: "ADMIN" | "MANAGER" | "CHEF" | "STAFF" | "VENDOR" | undefined;
                profileImage?: string | undefined;
                isOrganization?: boolean | undefined;
                organizationInput?: {
                    name: string;
                    imageUrl?: string | undefined;
                } | undefined;
                restaurantsInput?: {
                    name: string;
                    address: string;
                    city: string;
                    zipCode: string;
                    state: string;
                    owner: string;
                    imageUrl?: string | undefined;
                }[] | undefined;
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
                restaurantId: number | null;
                email: string;
                organizationId: number | null;
                sub: number | null;
                firstName: string;
                lastName: string;
                profileImage: string | null;
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
            body: {
                oldPassword: string;
                newPassword: string;
            };
            cache?: RequestCache | undefined;
            params: {
                userId: number;
            };
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
        validateSessionToken: (args: {
            body: {
                sessionToken: string;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 400;
            body: {
                success: boolean;
            };
            headers: Headers;
        } | {
            status: 200;
            body: {
                user: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    restaurantId: number | null;
                    email: string;
                    organizationId: number | null;
                    sub: number | null;
                    firstName: string;
                    lastName: string;
                    profileImage: string | null;
                };
                session: {
                    id: string;
                    createdAt: Date;
                    userId: number;
                    verificationCode: string;
                    verified: boolean;
                    expiresAt: Date;
                };
            } | {
                user: null;
                session: null;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
                restaurantId: number;
                name: string;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                recipeId: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                menuItemId: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                menuItemId: number;
            };
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
            cache?: RequestCache | undefined;
            query: {
                menuItemIds: number[];
            };
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
            cache?: RequestCache | undefined;
            query: {
                recipeId: string;
                startDate: string;
                endDate: string;
            };
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
            cache?: RequestCache | undefined;
            query: {
                recipeId: string;
                startDate: string;
                endDate: string;
            };
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
            cache?: RequestCache | undefined;
            query: {
                menuId: string;
            };
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
            cache?: RequestCache | undefined;
            query: {
                recipeId: string;
                startDate: string;
                endDate: string;
            };
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
            cache?: RequestCache | undefined;
            query: {
                restaurantId: string;
                startDate: string;
                endDate: string;
            };
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
                        category: "APPETIZER" | "SOUP" | "SALAD" | "MAIN_COURSE" | "SIDE_DISH" | "DESSERT" | "BEVERAGE" | "BREAKFAST" | "BRUNCH" | "LUNCH" | "DINNER" | "SNACK" | "BAKED_GOOD" | "SAUCE" | "CONDIMENT" | "SPECIAL";
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
                restaurantId?: number | undefined;
                imageUrl?: string | undefined;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            body?: {
                restaurantId?: number | undefined;
                name?: string | undefined;
                imageUrl?: string | undefined;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
                price: number;
                name: string;
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
                calories: number | null;
                protein: number | null;
                carbohydrates: number | null;
                fat: number | null;
                fiber: number | null;
                sugar: number | null;
                sodium: number | null;
                price: number;
                name: string;
                category: string;
                density: number | null;
                dietaryRestrictionId: number | null;
                usdaFoodId: string | null;
                nutritionSource: "CUSTOM" | "MANUAL" | "USDA" | "ESTIMATED" | null;
                nutritionUpdatedAt: Date | null;
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
                calories: number | null;
                protein: number | null;
                carbohydrates: number | null;
                fat: number | null;
                fiber: number | null;
                sugar: number | null;
                sodium: number | null;
                price: number;
                name: string;
                category: string;
                density: number | null;
                dietaryRestrictionId: number | null;
                usdaFoodId: string | null;
                nutritionSource: "CUSTOM" | "MANUAL" | "USDA" | "ESTIMATED" | null;
                nutritionUpdatedAt: Date | null;
            }[];
            headers: Headers;
        } | {
            status: 201 | 400 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getIngredient: (args: {
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                calories: number | null;
                protein: number | null;
                carbohydrates: number | null;
                fat: number | null;
                fiber: number | null;
                sugar: number | null;
                sodium: number | null;
                price: number;
                name: string;
                category: string;
                density: number | null;
                dietaryRestrictionId: number | null;
                usdaFoodId: string | null;
                nutritionSource: "CUSTOM" | "MANUAL" | "USDA" | "ESTIMATED" | null;
                nutritionUpdatedAt: Date | null;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            body?: {
                price?: number | undefined;
                name?: string | undefined;
                category?: string | undefined;
            } | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                calories: number | null;
                protein: number | null;
                carbohydrates: number | null;
                fat: number | null;
                fiber: number | null;
                sugar: number | null;
                sodium: number | null;
                price: number;
                name: string;
                category: string;
                density: number | null;
                dietaryRestrictionId: number | null;
                usdaFoodId: string | null;
                nutritionSource: "CUSTOM" | "MANUAL" | "USDA" | "ESTIMATED" | null;
                nutritionUpdatedAt: Date | null;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
    nutrition: {
        getRecipeNutrition: (args: {
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
                servingSize: number;
                servingUnit: string;
                calories: number;
                protein: number;
                carbohydrates: number;
                fat: number;
                fiber: number;
                sugar: number;
                sodium: number;
                containsGluten: boolean;
                containsDairy: boolean;
                containsNuts: boolean;
                containsEggs: boolean;
                containsSoy: boolean;
                containsFish: boolean;
                containsShellfish: boolean;
                containsSesame: boolean;
            };
            headers: Headers;
        } | {
            status: 201 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        calculateRecipeNutrition: (args: {
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
                servingSize: number;
                servingUnit: string;
                calories: number;
                protein: number;
                carbohydrates: number;
                fat: number;
                fiber: number;
                sugar: number;
                sodium: number;
                containsGluten: boolean;
                containsDairy: boolean;
                containsNuts: boolean;
                containsEggs: boolean;
                containsSoy: boolean;
                containsFish: boolean;
                containsShellfish: boolean;
                containsSesame: boolean;
            };
            headers: Headers;
        } | {
            status: 201 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        ingredientNutrition: (args: {
            cache?: RequestCache | undefined;
            query: {
                query: string;
                pageSize: number;
            };
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
                foods?: {
                    description: string;
                    fdcId: string | number;
                    dataType?: string | undefined;
                    foodCategory?: string | undefined;
                    brandOwner?: string | undefined;
                    foodNutrients?: {
                        value?: number | undefined;
                        unitName?: string | undefined;
                        nutrient?: {
                            id: number;
                            name: string;
                            unitName?: string | undefined;
                        } | undefined;
                        nutrientId?: number | undefined;
                        nutrientName?: string | undefined;
                        amount?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                totalHits?: number | undefined;
                currentPage?: number | undefined;
                totalPages?: number | undefined;
            };
            headers: Headers;
        } | {
            status: 201 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        importUSDANutrition: (args: {
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            body?: {
                usdaFoodId?: string | undefined;
            } | undefined;
        }) => Promise<{
            status: 400;
            body: {
                message: string;
                success: boolean;
            };
            headers: Headers;
        } | {
            status: 200;
            body: {
                message: string;
                success: boolean;
                ingredient?: any;
            };
            headers: Headers;
        } | {
            status: 201 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        updateManualNutrition: (args: {
            body: {
                calories: number;
                protein: number;
                carbohydrates: number;
                fat: number;
                fiber: number;
                sugar: number;
                sodium: number;
            };
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 400;
            body: {
                message: string;
                success: boolean;
            };
            headers: Headers;
        } | {
            status: 200;
            body: {
                message: string;
                success: boolean;
                ingredient?: any;
            };
            headers: Headers;
        } | {
            status: 201 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
    };
};
declare const createApiClient: (customFetch: typeof fetch) => {
    orgs: {
        createOrganization: (args: {
            body: _ckm_db.Prisma.OrganizationCreateInput;
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
                imageUrl: string | null;
            }[];
            headers: Headers;
        } | {
            status: 201 | 400 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getOrganization: (args: {
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            body?: _ckm_db.Prisma.OrganizationUpdateInput | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                imageUrl: string | null;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            body: _ckm_db.Prisma.UserCreateInput & {
                password: string;
                role?: "ADMIN" | "MANAGER" | "CHEF" | "STAFF" | "VENDOR" | undefined;
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
                restaurantId: number | null;
                email: string;
                organizationId: number | null;
                sub: number | null;
                firstName: string;
                lastName: string;
                profileImage: string | null;
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
                firstName: string;
                lastName: string;
                profileImage: string | null;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
                firstName: string;
                lastName: string;
                profileImage: string | null;
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 500;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getAuthUser: (args: {
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                sub: number | null;
                id: number;
                email: string;
                firstName: string;
                lastName: string;
                profileImage: string | null;
                organizationId: number | null;
                restaurantId: number | null;
                createdAt: Date;
                updatedAt: Date;
                auth: {
                    id: string;
                    userId: number;
                    passwordHash: string;
                    role: "ADMIN" | "MANAGER" | "CHEF" | "STAFF" | "VENDOR";
                }[];
            };
            headers: Headers;
        } | {
            status: 404;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 500;
            body: {
                message: string;
            };
            headers: Headers;
        } | {
            status: 201 | 400 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        updateUser: (args: {
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
                firstName: string;
                lastName: string;
                profileImage: string | null;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
                firstName: string;
                lastName: string;
                profileImage: string | null;
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
            body: _ckm_db.Prisma.OrderCreateInput;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            body?: _ckm_db.Prisma.OrderUpdateInput | undefined;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            body: _ckm_db.Prisma.OrderItemCreateInput;
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 201;
            body: {
                id: number;
                unit: string;
                price: number;
                ingredientId: number;
                quantity: number;
                orderId: number;
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
                unit: string;
                price: number;
                ingredientId: number;
                quantity: number;
                orderId: number;
            }[];
            headers: Headers;
        } | {
            status: 201 | 400 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getOrderItem: (args: {
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                unit: string;
                price: number;
                ingredientId: number;
                quantity: number;
                orderId: number;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            body?: _ckm_db.Prisma.OrderItemUpdateInput | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                unit: string;
                price: number;
                ingredientId: number;
                quantity: number;
                orderId: number;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                unit: string;
                price: number;
                ingredientId: number;
                quantity: number;
                orderId: number;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            body: any;
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
                category: "APPETIZER" | "SOUP" | "SALAD" | "MAIN_COURSE" | "SIDE_DISH" | "DESSERT" | "BEVERAGE" | "BREAKFAST" | "BRUNCH" | "LUNCH" | "DINNER" | "SNACK" | "BAKED_GOOD" | "SAUCE" | "CONDIMENT" | "SPECIAL";
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
                    category: "APPETIZER" | "SOUP" | "SALAD" | "MAIN_COURSE" | "SIDE_DISH" | "DESSERT" | "BEVERAGE" | "BREAKFAST" | "BRUNCH" | "LUNCH" | "DINNER" | "SNACK" | "BAKED_GOOD" | "SAUCE" | "CONDIMENT" | "SPECIAL";
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
                category: "APPETIZER" | "SOUP" | "SALAD" | "MAIN_COURSE" | "SIDE_DISH" | "DESSERT" | "BEVERAGE" | "BREAKFAST" | "BRUNCH" | "LUNCH" | "DINNER" | "SNACK" | "BAKED_GOOD" | "SAUCE" | "CONDIMENT" | "SPECIAL";
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            body?: _ckm_db.Prisma.RecipeUpdateInput | undefined;
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
                category: "APPETIZER" | "SOUP" | "SALAD" | "MAIN_COURSE" | "SIDE_DISH" | "DESSERT" | "BEVERAGE" | "BREAKFAST" | "BRUNCH" | "LUNCH" | "DINNER" | "SNACK" | "BAKED_GOOD" | "SAUCE" | "CONDIMENT" | "SPECIAL";
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
                category: "APPETIZER" | "SOUP" | "SALAD" | "MAIN_COURSE" | "SIDE_DISH" | "DESSERT" | "BEVERAGE" | "BREAKFAST" | "BRUNCH" | "LUNCH" | "DINNER" | "SNACK" | "BAKED_GOOD" | "SAUCE" | "CONDIMENT" | "SPECIAL";
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
            body: _ckm_db.Prisma.RecipeIngredientUncheckedCreateInput;
            cache?: RequestCache | undefined;
            params: {
                recipeId: number;
            };
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
                density: number | null;
                processingInstructions: string | null;
                substituteIngredients: number[];
                isOptional: boolean;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
                recipeId: number;
            };
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
                density: number | null;
                processingInstructions: string | null;
                substituteIngredients: number[];
                isOptional: boolean;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
                recipeId: number;
            };
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
                density: number | null;
                processingInstructions: string | null;
                substituteIngredients: number[];
                isOptional: boolean;
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
            cache?: RequestCache | undefined;
            params: {
                recipeId: number;
            };
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
                density: number | null;
                processingInstructions: string | null;
                substituteIngredients: number[];
                isOptional: boolean;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
                recipeId: number;
            };
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
                density: number | null;
                processingInstructions: string | null;
                substituteIngredients: number[];
                isOptional: boolean;
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
            body: _ckm_db.Prisma.RecipeInstructionCreateInput;
            cache?: RequestCache | undefined;
            params: {
                recipeId: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
                recipeId: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
                recipeId: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
                recipeId: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                recipeId: number;
            };
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
            body: {
                ingredientPrices: {
                    ingredientId: number;
                    price: number;
                }[];
            };
            cache?: RequestCache | undefined;
            params: {
                recipeId: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                recipeId: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                recipeId: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                recipeId: number;
            };
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
            body: _ckm_db.Prisma.VendorCreateInput;
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
                email: string;
                contact: string;
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
                skip?: string | undefined;
                take?: string | undefined;
                name?: string | undefined;
            } | undefined;
        } | undefined) => Promise<{
            status: 200;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                email: string;
                contact: string;
                phone: string;
            }[];
            headers: Headers;
        } | {
            status: 201 | 400 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getVendor: (args: {
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
                email: string;
                contact: string;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            body?: _ckm_db.Prisma.VendorUpdateInput | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                email: string;
                contact: string;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
                email: string;
                contact: string;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
        login: (args: {
            body: {
                password: string;
                email: string;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                success: boolean;
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
                verificationCode: string;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                sessionToken: string;
                user: {
                    sub: number | null;
                    id: number;
                    email: string;
                    firstName: string;
                    lastName: string;
                    profileImage: string | null;
                    organizationId: number | null;
                    restaurantId: number | null;
                    createdAt: Date;
                    updatedAt: Date;
                    auth: ({
                        id: string;
                        userId: number;
                        passwordHash: string;
                        role: "ADMIN" | "MANAGER" | "CHEF" | "STAFF" | "VENDOR";
                    } | undefined)[];
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
            body: {
                password: string;
                email: string;
                firstName: string;
                lastName: string;
                role?: "ADMIN" | "MANAGER" | "CHEF" | "STAFF" | "VENDOR" | undefined;
                profileImage?: string | undefined;
                isOrganization?: boolean | undefined;
                organizationInput?: {
                    name: string;
                    imageUrl?: string | undefined;
                } | undefined;
                restaurantsInput?: {
                    name: string;
                    address: string;
                    city: string;
                    zipCode: string;
                    state: string;
                    owner: string;
                    imageUrl?: string | undefined;
                }[] | undefined;
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
                restaurantId: number | null;
                email: string;
                organizationId: number | null;
                sub: number | null;
                firstName: string;
                lastName: string;
                profileImage: string | null;
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
            body: {
                oldPassword: string;
                newPassword: string;
            };
            cache?: RequestCache | undefined;
            params: {
                userId: number;
            };
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
        validateSessionToken: (args: {
            body: {
                sessionToken: string;
            };
            cache?: RequestCache | undefined;
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 400;
            body: {
                success: boolean;
            };
            headers: Headers;
        } | {
            status: 200;
            body: {
                user: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    restaurantId: number | null;
                    email: string;
                    organizationId: number | null;
                    sub: number | null;
                    firstName: string;
                    lastName: string;
                    profileImage: string | null;
                };
                session: {
                    id: string;
                    createdAt: Date;
                    userId: number;
                    verificationCode: string;
                    verified: boolean;
                    expiresAt: Date;
                };
            } | {
                user: null;
                session: null;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
                restaurantId: number;
                name: string;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                recipeId: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                menuItemId: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                menuItemId: number;
            };
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
            cache?: RequestCache | undefined;
            query: {
                menuItemIds: number[];
            };
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
            cache?: RequestCache | undefined;
            query: {
                recipeId: string;
                startDate: string;
                endDate: string;
            };
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
            cache?: RequestCache | undefined;
            query: {
                recipeId: string;
                startDate: string;
                endDate: string;
            };
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
            cache?: RequestCache | undefined;
            query: {
                menuId: string;
            };
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
            cache?: RequestCache | undefined;
            query: {
                recipeId: string;
                startDate: string;
                endDate: string;
            };
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
            cache?: RequestCache | undefined;
            query: {
                restaurantId: string;
                startDate: string;
                endDate: string;
            };
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
                        category: "APPETIZER" | "SOUP" | "SALAD" | "MAIN_COURSE" | "SIDE_DISH" | "DESSERT" | "BEVERAGE" | "BREAKFAST" | "BRUNCH" | "LUNCH" | "DINNER" | "SNACK" | "BAKED_GOOD" | "SAUCE" | "CONDIMENT" | "SPECIAL";
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
                restaurantId?: number | undefined;
                imageUrl?: string | undefined;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            body?: {
                restaurantId?: number | undefined;
                name?: string | undefined;
                imageUrl?: string | undefined;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
                price: number;
                name: string;
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
                calories: number | null;
                protein: number | null;
                carbohydrates: number | null;
                fat: number | null;
                fiber: number | null;
                sugar: number | null;
                sodium: number | null;
                price: number;
                name: string;
                category: string;
                density: number | null;
                dietaryRestrictionId: number | null;
                usdaFoodId: string | null;
                nutritionSource: "CUSTOM" | "MANUAL" | "USDA" | "ESTIMATED" | null;
                nutritionUpdatedAt: Date | null;
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
                calories: number | null;
                protein: number | null;
                carbohydrates: number | null;
                fat: number | null;
                fiber: number | null;
                sugar: number | null;
                sodium: number | null;
                price: number;
                name: string;
                category: string;
                density: number | null;
                dietaryRestrictionId: number | null;
                usdaFoodId: string | null;
                nutritionSource: "CUSTOM" | "MANUAL" | "USDA" | "ESTIMATED" | null;
                nutritionUpdatedAt: Date | null;
            }[];
            headers: Headers;
        } | {
            status: 201 | 400 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        getIngredient: (args: {
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                calories: number | null;
                protein: number | null;
                carbohydrates: number | null;
                fat: number | null;
                fiber: number | null;
                sugar: number | null;
                sodium: number | null;
                price: number;
                name: string;
                category: string;
                density: number | null;
                dietaryRestrictionId: number | null;
                usdaFoodId: string | null;
                nutritionSource: "CUSTOM" | "MANUAL" | "USDA" | "ESTIMATED" | null;
                nutritionUpdatedAt: Date | null;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            body?: {
                price?: number | undefined;
                name?: string | undefined;
                category?: string | undefined;
            } | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: number;
                calories: number | null;
                protein: number | null;
                carbohydrates: number | null;
                fat: number | null;
                fiber: number | null;
                sugar: number | null;
                sodium: number | null;
                price: number;
                name: string;
                category: string;
                density: number | null;
                dietaryRestrictionId: number | null;
                usdaFoodId: string | null;
                nutritionSource: "CUSTOM" | "MANUAL" | "USDA" | "ESTIMATED" | null;
                nutritionUpdatedAt: Date | null;
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
    nutrition: {
        getRecipeNutrition: (args: {
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
                servingSize: number;
                servingUnit: string;
                calories: number;
                protein: number;
                carbohydrates: number;
                fat: number;
                fiber: number;
                sugar: number;
                sodium: number;
                containsGluten: boolean;
                containsDairy: boolean;
                containsNuts: boolean;
                containsEggs: boolean;
                containsSoy: boolean;
                containsFish: boolean;
                containsShellfish: boolean;
                containsSesame: boolean;
            };
            headers: Headers;
        } | {
            status: 201 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        calculateRecipeNutrition: (args: {
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
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
                servingSize: number;
                servingUnit: string;
                calories: number;
                protein: number;
                carbohydrates: number;
                fat: number;
                fiber: number;
                sugar: number;
                sodium: number;
                containsGluten: boolean;
                containsDairy: boolean;
                containsNuts: boolean;
                containsEggs: boolean;
                containsSoy: boolean;
                containsFish: boolean;
                containsShellfish: boolean;
                containsSesame: boolean;
            };
            headers: Headers;
        } | {
            status: 201 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        ingredientNutrition: (args: {
            cache?: RequestCache | undefined;
            query: {
                query: string;
                pageSize: number;
            };
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
                foods?: {
                    description: string;
                    fdcId: string | number;
                    dataType?: string | undefined;
                    foodCategory?: string | undefined;
                    brandOwner?: string | undefined;
                    foodNutrients?: {
                        value?: number | undefined;
                        unitName?: string | undefined;
                        nutrient?: {
                            id: number;
                            name: string;
                            unitName?: string | undefined;
                        } | undefined;
                        nutrientId?: number | undefined;
                        nutrientName?: string | undefined;
                        amount?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                totalHits?: number | undefined;
                currentPage?: number | undefined;
                totalPages?: number | undefined;
            };
            headers: Headers;
        } | {
            status: 201 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        importUSDANutrition: (args: {
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
            body?: {
                usdaFoodId?: string | undefined;
            } | undefined;
        }) => Promise<{
            status: 400;
            body: {
                message: string;
                success: boolean;
            };
            headers: Headers;
        } | {
            status: 200;
            body: {
                message: string;
                success: boolean;
                ingredient?: any;
            };
            headers: Headers;
        } | {
            status: 201 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
        updateManualNutrition: (args: {
            body: {
                calories: number;
                protein: number;
                carbohydrates: number;
                fat: number;
                fiber: number;
                sugar: number;
                sodium: number;
            };
            cache?: RequestCache | undefined;
            params: {
                id: number;
            };
            fetchOptions?: _ts_rest_core.FetchOptions | undefined;
            extraHeaders?: Record<string, string | undefined> | undefined;
            overrideClientOptions?: Partial<_ts_rest_core.OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 400;
            body: {
                message: string;
                success: boolean;
            };
            headers: Headers;
        } | {
            status: 200;
            body: {
                message: string;
                success: boolean;
                ingredient?: any;
            };
            headers: Headers;
        } | {
            status: 201 | 404 | 500 | 401 | 100 | 101 | 102 | 202 | 203 | 204 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
    };
};
declare function tsRestCustomFetchApi({ route, path, method, headers, body, validateResponse, fetchOptions }: ApiFetcherArgs, customFetch?: typeof fetch): Promise<{
    status: number;
    body: any;
    headers: Headers;
}>;

export { api, createApiClient, tsRestCustomFetchApi };
