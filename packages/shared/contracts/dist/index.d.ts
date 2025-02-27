import * as _ckm_db from '@ckm/db';
import * as zod from 'zod';

declare const contract: {
    orgs: {
        createOrganization: {
            summary: "Create a new organization";
            method: "POST";
            body: zod.ZodObject<Omit<{
                id: zod.ZodNumber;
                name: zod.ZodString;
                imageUrl: zod.ZodNullable<zod.ZodOptional<zod.ZodString>>;
                createdAt: zod.ZodDate;
                updatedAt: zod.ZodDate;
            }, "id" | "createdAt" | "updatedAt">, "strip", zod.ZodTypeAny, {
                name: string;
                imageUrl?: string | null | undefined;
            }, {
                name: string;
                imageUrl?: string | null | undefined;
            }>;
            path: "/api/v1/organizations";
            responses: {
                201: zod.ZodObject<{
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    imageUrl: zod.ZodNullable<zod.ZodOptional<zod.ZodString>>;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    imageUrl?: string | null | undefined;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    imageUrl?: string | null | undefined;
                }>;
                400: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        getOrganizations: {
            query: zod.ZodObject<{
                skip: zod.ZodOptional<zod.ZodString>;
                take: zod.ZodOptional<zod.ZodString>;
                orderBy: zod.ZodOptional<zod.ZodString>;
            }, "strip", zod.ZodTypeAny, {
                skip?: string | undefined;
                take?: string | undefined;
                orderBy?: string | undefined;
            }, {
                skip?: string | undefined;
                take?: string | undefined;
                orderBy?: string | undefined;
            }>;
            summary: "Get all organizations";
            method: "GET";
            path: "/api/v1/organizations";
            responses: {
                200: zod.ZodArray<zod.ZodObject<{
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    imageUrl: zod.ZodNullable<zod.ZodOptional<zod.ZodString>>;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    imageUrl?: string | null | undefined;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    imageUrl?: string | null | undefined;
                }>, "many">;
            };
        };
        getOrganization: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Get an organization by ID";
            method: "GET";
            path: "/api/v1/organizations/:id";
            responses: {
                200: zod.ZodObject<{
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    imageUrl: zod.ZodNullable<zod.ZodOptional<zod.ZodString>>;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    imageUrl?: string | null | undefined;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    imageUrl?: string | null | undefined;
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        updateOrganization: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Update an organization";
            method: "PUT";
            body: zod.ZodObject<{
                name: zod.ZodOptional<zod.ZodString>;
                imageUrl: zod.ZodOptional<zod.ZodNullable<zod.ZodOptional<zod.ZodString>>>;
            }, "strip", zod.ZodTypeAny, {
                name?: string | undefined;
                imageUrl?: string | null | undefined;
            }, {
                name?: string | undefined;
                imageUrl?: string | null | undefined;
            }>;
            path: "/api/v1/organizations/:id";
            responses: {
                200: zod.ZodObject<{
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    imageUrl: zod.ZodNullable<zod.ZodOptional<zod.ZodString>>;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    imageUrl?: string | null | undefined;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    imageUrl?: string | null | undefined;
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        deleteOrganization: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Delete an organization";
            method: "DELETE";
            path: "/api/v1/organizations/:id";
            responses: {
                200: zod.ZodObject<{
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    imageUrl: zod.ZodNullable<zod.ZodOptional<zod.ZodString>>;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    imageUrl?: string | null | undefined;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    imageUrl?: string | null | undefined;
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
    };
    users: {
        createUser: {
            summary: "Create a new user";
            method: "POST";
            body: zod.ZodType<_ckm_db.Prisma.UserCreateWithoutRestaurantInput, zod.ZodTypeDef, _ckm_db.Prisma.UserCreateWithoutRestaurantInput>;
            path: "/api/v1/users";
            responses: {
                201: zod.ZodObject<{
                    role: zod.ZodEnum<["ADMIN", "MANAGER", "CHEF", "STAFF", "VENDOR"]>;
                    id: zod.ZodNumber;
                    email: zod.ZodString;
                    sub: zod.ZodNullable<zod.ZodNumber>;
                    passwordHash: zod.ZodString;
                    firstName: zod.ZodString;
                    lastName: zod.ZodString;
                    profileImage: zod.ZodNullable<zod.ZodString>;
                    verified: zod.ZodBoolean;
                    organizationId: zod.ZodNullable<zod.ZodNumber>;
                    restaurantId: zod.ZodNullable<zod.ZodNumber>;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>;
                400: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        getUsers: {
            query: zod.ZodObject<{
                skip: zod.ZodOptional<zod.ZodString>;
                take: zod.ZodOptional<zod.ZodString>;
                orderBy: zod.ZodOptional<zod.ZodString>;
            }, "strip", zod.ZodTypeAny, {
                skip?: string | undefined;
                take?: string | undefined;
                orderBy?: string | undefined;
            }, {
                skip?: string | undefined;
                take?: string | undefined;
                orderBy?: string | undefined;
            }>;
            summary: "Get all users";
            method: "GET";
            path: "/api/v1/users";
            responses: {
                200: zod.ZodArray<zod.ZodObject<{
                    role: zod.ZodEnum<["ADMIN", "MANAGER", "CHEF", "STAFF", "VENDOR"]>;
                    id: zod.ZodNumber;
                    email: zod.ZodString;
                    sub: zod.ZodNullable<zod.ZodNumber>;
                    passwordHash: zod.ZodString;
                    firstName: zod.ZodString;
                    lastName: zod.ZodString;
                    profileImage: zod.ZodNullable<zod.ZodString>;
                    verified: zod.ZodBoolean;
                    organizationId: zod.ZodNullable<zod.ZodNumber>;
                    restaurantId: zod.ZodNullable<zod.ZodNumber>;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>, "many">;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        getUser: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Get a user by ID";
            method: "GET";
            path: "/api/v1/users/:id";
            responses: {
                200: zod.ZodObject<{
                    role: zod.ZodEnum<["ADMIN", "MANAGER", "CHEF", "STAFF", "VENDOR"]>;
                    id: zod.ZodNumber;
                    email: zod.ZodString;
                    sub: zod.ZodNullable<zod.ZodNumber>;
                    passwordHash: zod.ZodString;
                    firstName: zod.ZodString;
                    lastName: zod.ZodString;
                    profileImage: zod.ZodNullable<zod.ZodString>;
                    verified: zod.ZodBoolean;
                    organizationId: zod.ZodNullable<zod.ZodNumber>;
                    restaurantId: zod.ZodNullable<zod.ZodNumber>;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        updateUser: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Update a user";
            method: "PUT";
            body: zod.ZodType<_ckm_db.Prisma.UserUpdateInput, zod.ZodTypeDef, _ckm_db.Prisma.UserUpdateInput>;
            path: "/api/v1/users/:id";
            responses: {
                200: zod.ZodObject<{
                    role: zod.ZodEnum<["ADMIN", "MANAGER", "CHEF", "STAFF", "VENDOR"]>;
                    id: zod.ZodNumber;
                    email: zod.ZodString;
                    sub: zod.ZodNullable<zod.ZodNumber>;
                    passwordHash: zod.ZodString;
                    firstName: zod.ZodString;
                    lastName: zod.ZodString;
                    profileImage: zod.ZodNullable<zod.ZodString>;
                    verified: zod.ZodBoolean;
                    organizationId: zod.ZodNullable<zod.ZodNumber>;
                    restaurantId: zod.ZodNullable<zod.ZodNumber>;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        deleteUser: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Delete a user";
            method: "DELETE";
            path: "/api/v1/users/:id";
            responses: {
                200: zod.ZodObject<{
                    role: zod.ZodEnum<["ADMIN", "MANAGER", "CHEF", "STAFF", "VENDOR"]>;
                    id: zod.ZodNumber;
                    email: zod.ZodString;
                    sub: zod.ZodNullable<zod.ZodNumber>;
                    passwordHash: zod.ZodString;
                    firstName: zod.ZodString;
                    lastName: zod.ZodString;
                    profileImage: zod.ZodNullable<zod.ZodString>;
                    verified: zod.ZodBoolean;
                    organizationId: zod.ZodNullable<zod.ZodNumber>;
                    restaurantId: zod.ZodNullable<zod.ZodNumber>;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
    };
    orders: {
        createOrder: {
            summary: "Create a new order";
            method: "POST";
            body: zod.ZodType<_ckm_db.Prisma.OrderUncheckedCreateInput, zod.ZodTypeDef, _ckm_db.Prisma.OrderUncheckedCreateInput>;
            path: "/api/v1/orders";
            responses: {
                201: zod.ZodObject<{
                    status: zod.ZodEnum<["PENDING", "APPROVED", "ORDERED", "RECEIVED", "CANCELLED"]>;
                    id: zod.ZodNumber;
                    restaurantId: zod.ZodNumber;
                    vendorId: zod.ZodNumber;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    restaurantId: number;
                    status: "CANCELLED" | "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED";
                    vendorId: number;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    restaurantId: number;
                    status: "CANCELLED" | "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED";
                    vendorId: number;
                }>;
                400: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        getOrders: {
            query: zod.ZodObject<{
                skip: zod.ZodOptional<zod.ZodNumber>;
                take: zod.ZodOptional<zod.ZodNumber>;
                orderBy: zod.ZodOptional<zod.ZodString>;
                restaurantId: zod.ZodOptional<zod.ZodNumber>;
                vendorId: zod.ZodOptional<zod.ZodNumber>;
                status: zod.ZodOptional<zod.ZodEnum<["PENDING", "APPROVED", "ORDERED", "RECEIVED", "CANCELLED"]>>;
            }, "strip", zod.ZodTypeAny, {
                status?: "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED" | "CANCELLED" | undefined;
                skip?: number | undefined;
                take?: number | undefined;
                orderBy?: string | undefined;
                restaurantId?: number | undefined;
                vendorId?: number | undefined;
            }, {
                status?: "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED" | "CANCELLED" | undefined;
                skip?: number | undefined;
                take?: number | undefined;
                orderBy?: string | undefined;
                restaurantId?: number | undefined;
                vendorId?: number | undefined;
            }>;
            summary: "Get all orders";
            method: "GET";
            path: "/api/v1/orders";
            responses: {
                200: zod.ZodArray<zod.ZodObject<{
                    status: zod.ZodEnum<["PENDING", "APPROVED", "ORDERED", "RECEIVED", "CANCELLED"]>;
                    id: zod.ZodNumber;
                    restaurantId: zod.ZodNumber;
                    vendorId: zod.ZodNumber;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    restaurantId: number;
                    status: "CANCELLED" | "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED";
                    vendorId: number;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    restaurantId: number;
                    status: "CANCELLED" | "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED";
                    vendorId: number;
                }>, "many">;
            };
        };
        getOrder: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Get an order by ID";
            method: "GET";
            path: "/api/v1/orders/:id";
            responses: {
                200: zod.ZodObject<{
                    status: zod.ZodEnum<["PENDING", "APPROVED", "ORDERED", "RECEIVED", "CANCELLED"]>;
                    id: zod.ZodNumber;
                    restaurantId: zod.ZodNumber;
                    vendorId: zod.ZodNumber;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    restaurantId: number;
                    status: "CANCELLED" | "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED";
                    vendorId: number;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    restaurantId: number;
                    status: "CANCELLED" | "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED";
                    vendorId: number;
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        updateOrder: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Update an order";
            method: "PUT";
            body: zod.ZodType<_ckm_db.Prisma.OrderUncheckedUpdateInput, zod.ZodTypeDef, _ckm_db.Prisma.OrderUncheckedUpdateInput>;
            path: "/api/v1/orders/:id";
            responses: {
                200: zod.ZodObject<{
                    status: zod.ZodEnum<["PENDING", "APPROVED", "ORDERED", "RECEIVED", "CANCELLED"]>;
                    id: zod.ZodNumber;
                    restaurantId: zod.ZodNumber;
                    vendorId: zod.ZodNumber;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    restaurantId: number;
                    status: "CANCELLED" | "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED";
                    vendorId: number;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    restaurantId: number;
                    status: "CANCELLED" | "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED";
                    vendorId: number;
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        deleteOrder: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Delete an order";
            method: "DELETE";
            path: "/api/v1/orders/:id";
            responses: {
                200: zod.ZodObject<{
                    status: zod.ZodEnum<["PENDING", "APPROVED", "ORDERED", "RECEIVED", "CANCELLED"]>;
                    id: zod.ZodNumber;
                    restaurantId: zod.ZodNumber;
                    vendorId: zod.ZodNumber;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    restaurantId: number;
                    status: "CANCELLED" | "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED";
                    vendorId: number;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    restaurantId: number;
                    status: "CANCELLED" | "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED";
                    vendorId: number;
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
    };
    orderItem: {
        createOrderItem: {
            summary: "Create a new order item";
            method: "POST";
            body: zod.ZodObject<Omit<{
                id: zod.ZodNumber;
                orderId: zod.ZodNumber;
                ingredientId: zod.ZodNumber;
                quantity: zod.ZodNumber;
                unit: zod.ZodString;
                price: zod.ZodNumber;
            }, "id">, "strip", zod.ZodTypeAny, {
                orderId: number;
                ingredientId: number;
                quantity: number;
                unit: string;
                price: number;
            }, {
                orderId: number;
                ingredientId: number;
                quantity: number;
                unit: string;
                price: number;
            }>;
            path: "/api/v1/order-items";
            responses: {
                201: zod.ZodObject<{
                    id: zod.ZodNumber;
                    orderId: zod.ZodNumber;
                    ingredientId: zod.ZodNumber;
                    quantity: zod.ZodNumber;
                    unit: zod.ZodString;
                    price: zod.ZodNumber;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    orderId: number;
                    ingredientId: number;
                    quantity: number;
                    unit: string;
                    price: number;
                }, {
                    id: number;
                    orderId: number;
                    ingredientId: number;
                    quantity: number;
                    unit: string;
                    price: number;
                }>;
                400: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        getOrderItems: {
            query: zod.ZodObject<{
                orderId: zod.ZodOptional<zod.ZodString>;
                skip: zod.ZodOptional<zod.ZodString>;
                take: zod.ZodOptional<zod.ZodString>;
            }, "strip", zod.ZodTypeAny, {
                skip?: string | undefined;
                take?: string | undefined;
                orderId?: string | undefined;
            }, {
                skip?: string | undefined;
                take?: string | undefined;
                orderId?: string | undefined;
            }>;
            summary: "Get all order items";
            method: "GET";
            path: "/api/v1/order-items";
            responses: {
                200: zod.ZodArray<zod.ZodObject<{
                    id: zod.ZodNumber;
                    orderId: zod.ZodNumber;
                    ingredientId: zod.ZodNumber;
                    quantity: zod.ZodNumber;
                    unit: zod.ZodString;
                    price: zod.ZodNumber;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    orderId: number;
                    ingredientId: number;
                    quantity: number;
                    unit: string;
                    price: number;
                }, {
                    id: number;
                    orderId: number;
                    ingredientId: number;
                    quantity: number;
                    unit: string;
                    price: number;
                }>, "many">;
            };
        };
        getOrderItem: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Get an order item by ID";
            method: "GET";
            path: "/api/v1/order-items/:id";
            responses: {
                200: zod.ZodObject<{
                    id: zod.ZodNumber;
                    orderId: zod.ZodNumber;
                    ingredientId: zod.ZodNumber;
                    quantity: zod.ZodNumber;
                    unit: zod.ZodString;
                    price: zod.ZodNumber;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    orderId: number;
                    ingredientId: number;
                    quantity: number;
                    unit: string;
                    price: number;
                }, {
                    id: number;
                    orderId: number;
                    ingredientId: number;
                    quantity: number;
                    unit: string;
                    price: number;
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        updateOrderItem: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Update an order item";
            method: "PUT";
            body: zod.ZodObject<Omit<{
                id: zod.ZodOptional<zod.ZodNumber>;
                orderId: zod.ZodOptional<zod.ZodNumber>;
                ingredientId: zod.ZodOptional<zod.ZodNumber>;
                quantity: zod.ZodOptional<zod.ZodNumber>;
                unit: zod.ZodOptional<zod.ZodString>;
                price: zod.ZodOptional<zod.ZodNumber>;
            }, "id" | "orderId">, "strip", zod.ZodTypeAny, {
                ingredientId?: number | undefined;
                quantity?: number | undefined;
                unit?: string | undefined;
                price?: number | undefined;
            }, {
                ingredientId?: number | undefined;
                quantity?: number | undefined;
                unit?: string | undefined;
                price?: number | undefined;
            }>;
            path: "/api/v1/order-items/:id";
            responses: {
                200: zod.ZodObject<{
                    id: zod.ZodNumber;
                    orderId: zod.ZodNumber;
                    ingredientId: zod.ZodNumber;
                    quantity: zod.ZodNumber;
                    unit: zod.ZodString;
                    price: zod.ZodNumber;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    orderId: number;
                    ingredientId: number;
                    quantity: number;
                    unit: string;
                    price: number;
                }, {
                    id: number;
                    orderId: number;
                    ingredientId: number;
                    quantity: number;
                    unit: string;
                    price: number;
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        deleteOrderItem: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Delete an order item";
            method: "DELETE";
            path: "/api/v1/order-items/:id";
            responses: {
                200: zod.ZodObject<{
                    id: zod.ZodNumber;
                    orderId: zod.ZodNumber;
                    ingredientId: zod.ZodNumber;
                    quantity: zod.ZodNumber;
                    unit: zod.ZodString;
                    price: zod.ZodNumber;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    orderId: number;
                    ingredientId: number;
                    quantity: number;
                    unit: string;
                    price: number;
                }, {
                    id: number;
                    orderId: number;
                    ingredientId: number;
                    quantity: number;
                    unit: string;
                    price: number;
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
    };
    restaurant: {
        createRestaurant: {
            summary: "Create a new restaurant";
            method: "POST";
            body: zod.ZodType<_ckm_db.Prisma.RestaurantCreateInput, zod.ZodTypeDef, _ckm_db.Prisma.RestaurantCreateInput>;
            path: "/api/v1/restaurants";
            responses: {
                201: zod.ZodObject<{
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    imageUrl: zod.ZodNullable<zod.ZodString>;
                    address: zod.ZodString;
                    city: zod.ZodString;
                    zipCode: zod.ZodString;
                    state: zod.ZodString;
                    owner: zod.ZodString;
                    organizationId: zod.ZodNullable<zod.ZodNumber>;
                    foodCost: zod.ZodNullable<zod.ZodNumber>;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                    isDeleted: zod.ZodBoolean;
                    deleted: zod.ZodNullable<zod.ZodDate>;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>;
                400: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        getRestaurants: {
            query: zod.ZodObject<{
                skip: zod.ZodOptional<zod.ZodString>;
                take: zod.ZodOptional<zod.ZodString>;
                organizationId: zod.ZodOptional<zod.ZodString>;
            }, "strip", zod.ZodTypeAny, {
                skip?: string | undefined;
                take?: string | undefined;
                organizationId?: string | undefined;
            }, {
                skip?: string | undefined;
                take?: string | undefined;
                organizationId?: string | undefined;
            }>;
            summary: "Get all restaurants";
            method: "GET";
            path: "/api/v1/restaurants";
            responses: {
                200: zod.ZodArray<zod.ZodObject<{
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    imageUrl: zod.ZodNullable<zod.ZodString>;
                    address: zod.ZodString;
                    city: zod.ZodString;
                    zipCode: zod.ZodString;
                    state: zod.ZodString;
                    owner: zod.ZodString;
                    organizationId: zod.ZodNullable<zod.ZodNumber>;
                    foodCost: zod.ZodNullable<zod.ZodNumber>;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                    isDeleted: zod.ZodBoolean;
                    deleted: zod.ZodNullable<zod.ZodDate>;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>, "many">;
            };
        };
        getRestaurant: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Get a restaurant by ID";
            method: "GET";
            path: "/api/v1/restaurants/:id";
            responses: {
                200: zod.ZodObject<{
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    imageUrl: zod.ZodNullable<zod.ZodString>;
                    address: zod.ZodString;
                    city: zod.ZodString;
                    zipCode: zod.ZodString;
                    state: zod.ZodString;
                    owner: zod.ZodString;
                    organizationId: zod.ZodNullable<zod.ZodNumber>;
                    foodCost: zod.ZodNullable<zod.ZodNumber>;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                    isDeleted: zod.ZodBoolean;
                    deleted: zod.ZodNullable<zod.ZodDate>;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        updateRestaurant: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Update a restaurant";
            method: "PUT";
            body: zod.ZodType<_ckm_db.Prisma.RestaurantUpdateInput, zod.ZodTypeDef, _ckm_db.Prisma.RestaurantUpdateInput>;
            path: "/api/v1/restaurants/:id";
            responses: {
                200: zod.ZodObject<{
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    imageUrl: zod.ZodNullable<zod.ZodString>;
                    address: zod.ZodString;
                    city: zod.ZodString;
                    zipCode: zod.ZodString;
                    state: zod.ZodString;
                    owner: zod.ZodString;
                    organizationId: zod.ZodNullable<zod.ZodNumber>;
                    foodCost: zod.ZodNullable<zod.ZodNumber>;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                    isDeleted: zod.ZodBoolean;
                    deleted: zod.ZodNullable<zod.ZodDate>;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        deleteRestaurant: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Delete a restaurant";
            method: "DELETE";
            path: "/api/v1/restaurants/:id";
            responses: {
                200: zod.ZodObject<{
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    imageUrl: zod.ZodNullable<zod.ZodString>;
                    address: zod.ZodString;
                    city: zod.ZodString;
                    zipCode: zod.ZodString;
                    state: zod.ZodString;
                    owner: zod.ZodString;
                    organizationId: zod.ZodNullable<zod.ZodNumber>;
                    foodCost: zod.ZodNullable<zod.ZodNumber>;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                    isDeleted: zod.ZodBoolean;
                    deleted: zod.ZodNullable<zod.ZodDate>;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
    };
    shifts: {
        createShift: {
            summary: "Create a new shift";
            method: "POST";
            body: zod.ZodType<_ckm_db.Prisma.ShiftUncheckedCreateInput, zod.ZodTypeDef, _ckm_db.Prisma.ShiftUncheckedCreateInput>;
            path: "/api/v1/shifts";
            responses: {
                201: zod.ZodObject<{
                    status: zod.ZodEnum<["SCHEDULED", "COMPLETED", "CANCELLED"]>;
                    id: zod.ZodNumber;
                    userId: zod.ZodNumber;
                    startTime: zod.ZodDate;
                    endTime: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    status: "COMPLETED" | "CANCELLED" | "SCHEDULED";
                    startTime: Date;
                    endTime: Date;
                    userId: number;
                }, {
                    id: number;
                    status: "COMPLETED" | "CANCELLED" | "SCHEDULED";
                    startTime: Date;
                    endTime: Date;
                    userId: number;
                }>;
                400: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        getShifts: {
            query: zod.ZodObject<{
                skip: zod.ZodOptional<zod.ZodNumber>;
                take: zod.ZodOptional<zod.ZodNumber>;
                userId: zod.ZodOptional<zod.ZodNumber>;
                startTime: zod.ZodPipeline<zod.ZodOptional<zod.ZodString>, zod.ZodDate>;
                endTime: zod.ZodPipeline<zod.ZodOptional<zod.ZodString>, zod.ZodDate>;
                status: zod.ZodOptional<zod.ZodEnum<["SCHEDULED", "COMPLETED", "CANCELLED"]>>;
            }, "strip", zod.ZodTypeAny, {
                startTime: Date;
                endTime: Date;
                status?: "CANCELLED" | "SCHEDULED" | "COMPLETED" | undefined;
                skip?: number | undefined;
                take?: number | undefined;
                userId?: number | undefined;
            }, {
                status?: "CANCELLED" | "SCHEDULED" | "COMPLETED" | undefined;
                skip?: number | undefined;
                take?: number | undefined;
                userId?: number | undefined;
                startTime?: string | undefined;
                endTime?: string | undefined;
            }>;
            summary: "Get all shifts";
            method: "GET";
            path: "/api/v1/shifts";
            responses: {
                200: zod.ZodArray<zod.ZodObject<{
                    status: zod.ZodEnum<["SCHEDULED", "COMPLETED", "CANCELLED"]>;
                    id: zod.ZodNumber;
                    userId: zod.ZodNumber;
                    startTime: zod.ZodDate;
                    endTime: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    status: "COMPLETED" | "CANCELLED" | "SCHEDULED";
                    startTime: Date;
                    endTime: Date;
                    userId: number;
                }, {
                    id: number;
                    status: "COMPLETED" | "CANCELLED" | "SCHEDULED";
                    startTime: Date;
                    endTime: Date;
                    userId: number;
                }>, "many">;
                400: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
                500: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        getShift: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Get a shift by ID";
            method: "GET";
            path: "/api/v1/shifts/:id";
            responses: {
                200: zod.ZodObject<{
                    status: zod.ZodEnum<["SCHEDULED", "COMPLETED", "CANCELLED"]>;
                    id: zod.ZodNumber;
                    userId: zod.ZodNumber;
                    startTime: zod.ZodDate;
                    endTime: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    status: "COMPLETED" | "CANCELLED" | "SCHEDULED";
                    startTime: Date;
                    endTime: Date;
                    userId: number;
                }, {
                    id: number;
                    status: "COMPLETED" | "CANCELLED" | "SCHEDULED";
                    startTime: Date;
                    endTime: Date;
                    userId: number;
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        updateShift: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Update a shift";
            method: "PUT";
            body: zod.ZodType<_ckm_db.Prisma.ShiftUncheckedUpdateInput, zod.ZodTypeDef, _ckm_db.Prisma.ShiftUncheckedUpdateInput>;
            path: "/api/v1/shifts/:id";
            responses: {
                200: zod.ZodObject<{
                    status: zod.ZodEnum<["SCHEDULED", "COMPLETED", "CANCELLED"]>;
                    id: zod.ZodNumber;
                    userId: zod.ZodNumber;
                    startTime: zod.ZodDate;
                    endTime: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    status: "COMPLETED" | "CANCELLED" | "SCHEDULED";
                    startTime: Date;
                    endTime: Date;
                    userId: number;
                }, {
                    id: number;
                    status: "COMPLETED" | "CANCELLED" | "SCHEDULED";
                    startTime: Date;
                    endTime: Date;
                    userId: number;
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        deleteShift: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Delete a shift";
            method: "DELETE";
            path: "/api/v1/shifts/:id";
            responses: {
                200: zod.ZodObject<{
                    status: zod.ZodEnum<["SCHEDULED", "COMPLETED", "CANCELLED"]>;
                    id: zod.ZodNumber;
                    userId: zod.ZodNumber;
                    startTime: zod.ZodDate;
                    endTime: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    status: "COMPLETED" | "CANCELLED" | "SCHEDULED";
                    startTime: Date;
                    endTime: Date;
                    userId: number;
                }, {
                    id: number;
                    status: "COMPLETED" | "CANCELLED" | "SCHEDULED";
                    startTime: Date;
                    endTime: Date;
                    userId: number;
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
    };
    recipe: {
        createRecipe: {
            summary: "Create a new recipe";
            method: "POST";
            body: zod.ZodType<_ckm_db.Prisma.RecipeCreateInput, zod.ZodTypeDef, _ckm_db.Prisma.RecipeCreateInput>;
            path: "/api/v1/recipes";
            responses: {
                201: zod.ZodObject<{
                    skillLevel: zod.ZodEnum<["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"]>;
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    imageUrls: zod.ZodArray<zod.ZodString, "many">;
                    description: zod.ZodNullable<zod.ZodString>;
                    servings: zod.ZodNumber;
                    cookTime: zod.ZodNumber;
                    prepTime: zod.ZodNumber;
                    frequency: zod.ZodNullable<zod.ZodNumber>;
                    restaurantId: zod.ZodNumber;
                    cookBookId: zod.ZodNumber;
                    foodCost: zod.ZodNullable<zod.ZodNumber>;
                    isDeleted: zod.ZodBoolean;
                    isPublished: zod.ZodBoolean;
                    publishedAt: zod.ZodNullable<zod.ZodDate>;
                    language: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>;
                400: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        uploadFileS3: {
            summary: "uploads recipe images to s3 bucket";
            method: "POST";
            contentType: "multipart/form-data";
            body: zod.ZodString;
            path: "/api/v1/recipes/upload";
            responses: {
                201: zod.ZodObject<{
                    url: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    url: string;
                }, {
                    url: string;
                }>;
                400: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        getRecipes: {
            query: zod.ZodObject<{
                skip: zod.ZodOptional<zod.ZodNumber>;
                take: zod.ZodOptional<zod.ZodNumber>;
                restaurantId: zod.ZodOptional<zod.ZodNumber>;
                searchTerm: zod.ZodOptional<zod.ZodString>;
            }, "strip", zod.ZodTypeAny, {
                skip?: number | undefined;
                take?: number | undefined;
                restaurantId?: number | undefined;
                searchTerm?: string | undefined;
            }, {
                skip?: number | undefined;
                take?: number | undefined;
                restaurantId?: number | undefined;
                searchTerm?: string | undefined;
            }>;
            summary: "Get all recipes";
            method: "GET";
            path: "/api/v1/recipes";
            responses: {
                200: zod.ZodObject<{
                    recipes: zod.ZodArray<zod.ZodObject<{
                        skillLevel: zod.ZodEnum<["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"]>;
                        id: zod.ZodNumber;
                        name: zod.ZodString;
                        imageUrls: zod.ZodArray<zod.ZodString, "many">;
                        description: zod.ZodNullable<zod.ZodString>;
                        servings: zod.ZodNumber;
                        cookTime: zod.ZodNumber;
                        prepTime: zod.ZodNumber;
                        frequency: zod.ZodNullable<zod.ZodNumber>;
                        restaurantId: zod.ZodNumber;
                        cookBookId: zod.ZodNumber;
                        foodCost: zod.ZodNullable<zod.ZodNumber>;
                        isDeleted: zod.ZodBoolean;
                        isPublished: zod.ZodBoolean;
                        publishedAt: zod.ZodNullable<zod.ZodDate>;
                        language: zod.ZodString;
                    }, "strip", zod.ZodTypeAny, {
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
                    }, {
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
                    }>, "many">;
                    totalCount: zod.ZodNumber;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>;
            };
        };
        getRecipe: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Get a recipe by ID";
            method: "GET";
            path: "/api/v1/recipes/:id";
            responses: {
                200: zod.ZodObject<{
                    skillLevel: zod.ZodEnum<["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"]>;
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    imageUrls: zod.ZodArray<zod.ZodString, "many">;
                    description: zod.ZodNullable<zod.ZodString>;
                    servings: zod.ZodNumber;
                    cookTime: zod.ZodNumber;
                    prepTime: zod.ZodNumber;
                    frequency: zod.ZodNullable<zod.ZodNumber>;
                    restaurantId: zod.ZodNumber;
                    cookBookId: zod.ZodNumber;
                    foodCost: zod.ZodNullable<zod.ZodNumber>;
                    isDeleted: zod.ZodBoolean;
                    isPublished: zod.ZodBoolean;
                    publishedAt: zod.ZodNullable<zod.ZodDate>;
                    language: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        updateRecipe: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Update a recipe";
            method: "PUT";
            body: zod.ZodType<{
                data: zod.TypeOf<zod.ZodType<_ckm_db.Prisma.RecipeUpdateInput, zod.ZodTypeDef, _ckm_db.Prisma.RecipeUpdateInput>>;
                deleteIds?: zod.TypeOf<zod.ZodObject<{
                    ingredientIds: zod.ZodArray<zod.ZodNumber, "many">;
                    instructionIds: zod.ZodArray<zod.ZodNumber, "many">;
                }, "strip", zod.ZodTypeAny, {
                    ingredientIds: number[];
                    instructionIds: number[];
                }, {
                    ingredientIds: number[];
                    instructionIds: number[];
                }>>;
            }, zod.ZodTypeDef, {
                data: zod.TypeOf<zod.ZodType<_ckm_db.Prisma.RecipeUpdateInput, zod.ZodTypeDef, _ckm_db.Prisma.RecipeUpdateInput>>;
                deleteIds?: zod.TypeOf<zod.ZodObject<{
                    ingredientIds: zod.ZodArray<zod.ZodNumber, "many">;
                    instructionIds: zod.ZodArray<zod.ZodNumber, "many">;
                }, "strip", zod.ZodTypeAny, {
                    ingredientIds: number[];
                    instructionIds: number[];
                }, {
                    ingredientIds: number[];
                    instructionIds: number[];
                }>>;
            }>;
            path: "/api/v1/recipes/:id";
            responses: {
                200: zod.ZodObject<{
                    skillLevel: zod.ZodEnum<["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"]>;
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    imageUrls: zod.ZodArray<zod.ZodString, "many">;
                    description: zod.ZodNullable<zod.ZodString>;
                    servings: zod.ZodNumber;
                    cookTime: zod.ZodNumber;
                    prepTime: zod.ZodNumber;
                    frequency: zod.ZodNullable<zod.ZodNumber>;
                    restaurantId: zod.ZodNumber;
                    cookBookId: zod.ZodNumber;
                    foodCost: zod.ZodNullable<zod.ZodNumber>;
                    isDeleted: zod.ZodBoolean;
                    isPublished: zod.ZodBoolean;
                    publishedAt: zod.ZodNullable<zod.ZodDate>;
                    language: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>;
                400: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        deleteRecipe: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Delete a recipe";
            method: "DELETE";
            path: "/api/v1/recipes/:id";
            responses: {
                200: zod.ZodObject<{
                    skillLevel: zod.ZodEnum<["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"]>;
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    imageUrls: zod.ZodArray<zod.ZodString, "many">;
                    description: zod.ZodNullable<zod.ZodString>;
                    servings: zod.ZodNumber;
                    cookTime: zod.ZodNumber;
                    prepTime: zod.ZodNumber;
                    frequency: zod.ZodNullable<zod.ZodNumber>;
                    restaurantId: zod.ZodNumber;
                    cookBookId: zod.ZodNumber;
                    foodCost: zod.ZodNullable<zod.ZodNumber>;
                    isDeleted: zod.ZodBoolean;
                    isPublished: zod.ZodBoolean;
                    publishedAt: zod.ZodNullable<zod.ZodDate>;
                    language: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        addIngredientToRecipe: {
            pathParams: zod.ZodObject<{
                recipeId: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                recipeId: number;
            }, {
                recipeId: number;
            }>;
            summary: "Add an ingredient to a recipe";
            method: "POST";
            body: zod.ZodType<_ckm_db.Prisma.RecipeIngredientUncheckedCreateInput, zod.ZodTypeDef, _ckm_db.Prisma.RecipeIngredientUncheckedCreateInput>;
            path: "/api/v1/recipes/:recipeId/ingredients";
            responses: {
                200: zod.ZodObject<{
                    id: zod.ZodNumber;
                    recipeId: zod.ZodNumber;
                    ingredientId: zod.ZodNumber;
                    quantity: zod.ZodNumber;
                    unit: zod.ZodString;
                    processingInstructions: zod.ZodNullable<zod.ZodString>;
                    substituteIngredients: zod.ZodArray<zod.ZodNumber, "many">;
                    isOptional: zod.ZodBoolean;
                    notes: zod.ZodNullable<zod.ZodString>;
                    cost: zod.ZodNullable<zod.ZodNumber>;
                    density: zod.ZodNullable<zod.ZodNumber>;
                    yield: zod.ZodNullable<zod.ZodNumber>;
                    joinAt: zod.ZodDate;
                    recipeVersionId: zod.ZodNullable<zod.ZodNumber>;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>;
                400: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        removeIngredientFromRecipe: {
            pathParams: zod.ZodObject<{
                recipeId: zod.ZodNumber;
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
                recipeId: number;
            }, {
                id: number;
                recipeId: number;
            }>;
            summary: "Remove an ingredient from a recipe";
            method: "DELETE";
            path: "/api/v1/recipes/:recipeId/ingredients/:id";
            responses: {
                200: zod.ZodObject<{
                    id: zod.ZodNumber;
                    recipeId: zod.ZodNumber;
                    ingredientId: zod.ZodNumber;
                    quantity: zod.ZodNumber;
                    unit: zod.ZodString;
                    processingInstructions: zod.ZodNullable<zod.ZodString>;
                    substituteIngredients: zod.ZodArray<zod.ZodNumber, "many">;
                    isOptional: zod.ZodBoolean;
                    notes: zod.ZodNullable<zod.ZodString>;
                    cost: zod.ZodNullable<zod.ZodNumber>;
                    density: zod.ZodNullable<zod.ZodNumber>;
                    yield: zod.ZodNullable<zod.ZodNumber>;
                    joinAt: zod.ZodDate;
                    recipeVersionId: zod.ZodNullable<zod.ZodNumber>;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        updateIngredientInRecipe: {
            pathParams: zod.ZodObject<{
                recipeId: zod.ZodNumber;
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
                recipeId: number;
            }, {
                id: number;
                recipeId: number;
            }>;
            summary: "Update an ingredient in a recipe";
            method: "PUT";
            body: zod.ZodType<_ckm_db.Prisma.RecipeIngredientUncheckedUpdateInput, zod.ZodTypeDef, _ckm_db.Prisma.RecipeIngredientUncheckedUpdateInput>;
            path: "/api/v1/recipes/:recipeId/ingredients/:id";
            responses: {
                200: zod.ZodObject<{
                    id: zod.ZodNumber;
                    recipeId: zod.ZodNumber;
                    ingredientId: zod.ZodNumber;
                    quantity: zod.ZodNumber;
                    unit: zod.ZodString;
                    processingInstructions: zod.ZodNullable<zod.ZodString>;
                    substituteIngredients: zod.ZodArray<zod.ZodNumber, "many">;
                    isOptional: zod.ZodBoolean;
                    notes: zod.ZodNullable<zod.ZodString>;
                    cost: zod.ZodNullable<zod.ZodNumber>;
                    density: zod.ZodNullable<zod.ZodNumber>;
                    yield: zod.ZodNullable<zod.ZodNumber>;
                    joinAt: zod.ZodDate;
                    recipeVersionId: zod.ZodNullable<zod.ZodNumber>;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>;
                400: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        getRecipeIngredients: {
            pathParams: zod.ZodObject<{
                recipeId: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                recipeId: number;
            }, {
                recipeId: number;
            }>;
            summary: "Get all ingredients for a recipe";
            method: "GET";
            path: "/api/v1/recipes/:recipeId/ingredients";
            responses: {
                200: zod.ZodArray<zod.ZodObject<{
                    id: zod.ZodNumber;
                    recipeId: zod.ZodNumber;
                    ingredientId: zod.ZodNumber;
                    quantity: zod.ZodNumber;
                    unit: zod.ZodString;
                    processingInstructions: zod.ZodNullable<zod.ZodString>;
                    substituteIngredients: zod.ZodArray<zod.ZodNumber, "many">;
                    isOptional: zod.ZodBoolean;
                    notes: zod.ZodNullable<zod.ZodString>;
                    cost: zod.ZodNullable<zod.ZodNumber>;
                    density: zod.ZodNullable<zod.ZodNumber>;
                    yield: zod.ZodNullable<zod.ZodNumber>;
                    joinAt: zod.ZodDate;
                    recipeVersionId: zod.ZodNullable<zod.ZodNumber>;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>, "many">;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        getRecipeIngredient: {
            pathParams: zod.ZodObject<{
                recipeId: zod.ZodNumber;
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
                recipeId: number;
            }, {
                id: number;
                recipeId: number;
            }>;
            summary: "Get a specific ingredient from a recipe";
            method: "GET";
            path: "/api/v1/recipes/:recipeId/ingredients/:id";
            responses: {
                200: zod.ZodObject<{
                    id: zod.ZodNumber;
                    recipeId: zod.ZodNumber;
                    ingredientId: zod.ZodNumber;
                    quantity: zod.ZodNumber;
                    unit: zod.ZodString;
                    processingInstructions: zod.ZodNullable<zod.ZodString>;
                    substituteIngredients: zod.ZodArray<zod.ZodNumber, "many">;
                    isOptional: zod.ZodBoolean;
                    notes: zod.ZodNullable<zod.ZodString>;
                    cost: zod.ZodNullable<zod.ZodNumber>;
                    density: zod.ZodNullable<zod.ZodNumber>;
                    yield: zod.ZodNullable<zod.ZodNumber>;
                    joinAt: zod.ZodDate;
                    recipeVersionId: zod.ZodNullable<zod.ZodNumber>;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        addInstructionToRecipe: {
            pathParams: zod.ZodObject<{
                recipeId: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                recipeId: number;
            }, {
                recipeId: number;
            }>;
            summary: "Add an instruction to a recipe";
            method: "POST";
            body: zod.ZodType<_ckm_db.Prisma.RecipeInstructionCreateInput, zod.ZodTypeDef, _ckm_db.Prisma.RecipeInstructionCreateInput>;
            path: "/api/v1/recipes/:recipeId/instructions";
            responses: {
                200: zod.ZodObject<{
                    id: zod.ZodNumber;
                    recipeId: zod.ZodNumber;
                    stepNumber: zod.ZodNumber;
                    instruction: zod.ZodString;
                    imageUrl: zod.ZodNullable<zod.ZodString>;
                    recipeVersionId: zod.ZodNullable<zod.ZodNumber>;
                    timeInMinutes: zod.ZodNullable<zod.ZodNumber>;
                    temperature: zod.ZodNullable<zod.ZodNumber>;
                    temperatureUnit: zod.ZodNullable<zod.ZodString>;
                    isCritical: zod.ZodBoolean;
                    techniqueTips: zod.ZodNullable<zod.ZodString>;
                    warningNotes: zod.ZodNullable<zod.ZodString>;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>;
                400: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        removeInstructionFromRecipe: {
            pathParams: zod.ZodObject<{
                recipeId: zod.ZodNumber;
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
                recipeId: number;
            }, {
                id: number;
                recipeId: number;
            }>;
            summary: "Remove an instruction from a recipe";
            method: "DELETE";
            path: "/api/v1/recipes/:recipeId/instructions/:id";
            responses: {
                200: zod.ZodObject<{
                    id: zod.ZodNumber;
                    recipeId: zod.ZodNumber;
                    stepNumber: zod.ZodNumber;
                    instruction: zod.ZodString;
                    imageUrl: zod.ZodNullable<zod.ZodString>;
                    recipeVersionId: zod.ZodNullable<zod.ZodNumber>;
                    timeInMinutes: zod.ZodNullable<zod.ZodNumber>;
                    temperature: zod.ZodNullable<zod.ZodNumber>;
                    temperatureUnit: zod.ZodNullable<zod.ZodString>;
                    isCritical: zod.ZodBoolean;
                    techniqueTips: zod.ZodNullable<zod.ZodString>;
                    warningNotes: zod.ZodNullable<zod.ZodString>;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        updateInstructionInRecipe: {
            pathParams: zod.ZodObject<{
                recipeId: zod.ZodNumber;
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
                recipeId: number;
            }, {
                id: number;
                recipeId: number;
            }>;
            summary: "Update an instruction in a recipe";
            method: "PUT";
            body: zod.ZodType<_ckm_db.Prisma.RecipeInstructionUpdateInput, zod.ZodTypeDef, _ckm_db.Prisma.RecipeInstructionUpdateInput>;
            path: "/api/v1/recipes/:recipeId/instructions/:id";
            responses: {
                200: zod.ZodObject<{
                    id: zod.ZodNumber;
                    recipeId: zod.ZodNumber;
                    stepNumber: zod.ZodNumber;
                    instruction: zod.ZodString;
                    imageUrl: zod.ZodNullable<zod.ZodString>;
                    recipeVersionId: zod.ZodNullable<zod.ZodNumber>;
                    timeInMinutes: zod.ZodNullable<zod.ZodNumber>;
                    temperature: zod.ZodNullable<zod.ZodNumber>;
                    temperatureUnit: zod.ZodNullable<zod.ZodString>;
                    isCritical: zod.ZodBoolean;
                    techniqueTips: zod.ZodNullable<zod.ZodString>;
                    warningNotes: zod.ZodNullable<zod.ZodString>;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>;
                400: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        getRecipeInstruction: {
            pathParams: zod.ZodObject<{
                recipeId: zod.ZodNumber;
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
                recipeId: number;
            }, {
                id: number;
                recipeId: number;
            }>;
            summary: "Get a specific instruction from a recipe";
            method: "GET";
            path: "/api/v1/recipes/:recipeId/instructions/:id";
            responses: {
                200: zod.ZodObject<{
                    id: zod.ZodNumber;
                    recipeId: zod.ZodNumber;
                    stepNumber: zod.ZodNumber;
                    instruction: zod.ZodString;
                    imageUrl: zod.ZodNullable<zod.ZodString>;
                    recipeVersionId: zod.ZodNullable<zod.ZodNumber>;
                    timeInMinutes: zod.ZodNullable<zod.ZodNumber>;
                    temperature: zod.ZodNullable<zod.ZodNumber>;
                    temperatureUnit: zod.ZodNullable<zod.ZodString>;
                    isCritical: zod.ZodBoolean;
                    techniqueTips: zod.ZodNullable<zod.ZodString>;
                    warningNotes: zod.ZodNullable<zod.ZodString>;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        getRecipeInstructions: {
            pathParams: zod.ZodObject<{
                recipeId: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                recipeId: number;
            }, {
                recipeId: number;
            }>;
            summary: "Get all instructions for a recipe";
            method: "GET";
            path: "/api/v1/recipes/:recipeId/instructions";
            responses: {
                200: zod.ZodArray<zod.ZodObject<{
                    id: zod.ZodNumber;
                    recipeId: zod.ZodNumber;
                    stepNumber: zod.ZodNumber;
                    instruction: zod.ZodString;
                    imageUrl: zod.ZodNullable<zod.ZodString>;
                    recipeVersionId: zod.ZodNullable<zod.ZodNumber>;
                    timeInMinutes: zod.ZodNullable<zod.ZodNumber>;
                    temperature: zod.ZodNullable<zod.ZodNumber>;
                    temperatureUnit: zod.ZodNullable<zod.ZodString>;
                    isCritical: zod.ZodBoolean;
                    techniqueTips: zod.ZodNullable<zod.ZodString>;
                    warningNotes: zod.ZodNullable<zod.ZodString>;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>, "many">;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        calculateFoodCost: {
            pathParams: zod.ZodObject<{
                recipeId: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                recipeId: number;
            }, {
                recipeId: number;
            }>;
            summary: "Calculate the total food cost for a recipe";
            method: "POST";
            body: zod.ZodObject<{
                ingredientPrices: zod.ZodArray<zod.ZodObject<{
                    ingredientId: zod.ZodNumber;
                    price: zod.ZodNumber;
                }, "strip", zod.ZodTypeAny, {
                    ingredientId: number;
                    price: number;
                }, {
                    ingredientId: number;
                    price: number;
                }>, "many">;
            }, "strip", zod.ZodTypeAny, {
                ingredientPrices: {
                    ingredientId: number;
                    price: number;
                }[];
            }, {
                ingredientPrices: {
                    ingredientId: number;
                    price: number;
                }[];
            }>;
            path: "/api/v1/recipes/:recipeId/calculate-food-cost";
            responses: {
                200: zod.ZodObject<{
                    totalCost: zod.ZodNumber;
                }, "strip", zod.ZodTypeAny, {
                    totalCost: number;
                }, {
                    totalCost: number;
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        getFoodCostHistory: {
            pathParams: zod.ZodObject<{
                recipeId: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                recipeId: number;
            }, {
                recipeId: number;
            }>;
            summary: "Get the food cost history for a recipe";
            method: "GET";
            path: "/api/v1/recipes/:recipeId/food-cost-history";
            responses: {
                200: zod.ZodArray<zod.ZodObject<{
                    id: zod.ZodNumber;
                    recipeId: zod.ZodNumber;
                    cost: zod.ZodNumber;
                    date: zod.ZodDate;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    recipeId: number;
                    createdAt: Date;
                    updatedAt: Date;
                    date: Date;
                    cost: number;
                }, {
                    id: number;
                    recipeId: number;
                    createdAt: Date;
                    updatedAt: Date;
                    date: Date;
                    cost: number;
                }>, "many">;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        calculateRecipePrice: {
            pathParams: zod.ZodObject<{
                recipeId: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                recipeId: number;
            }, {
                recipeId: number;
            }>;
            summary: "Calculate the selling price for a recipe";
            method: "POST";
            body: zod.ZodObject<{
                profitMargin: zod.ZodOptional<zod.ZodNumber>;
            }, "strip", zod.ZodTypeAny, {
                profitMargin?: number | undefined;
            }, {
                profitMargin?: number | undefined;
            }>;
            path: "/api/v1/recipes/:recipeId/calculate-price";
            responses: {
                200: zod.ZodObject<{
                    price: zod.ZodNumber;
                }, "strip", zod.ZodTypeAny, {
                    price: number;
                }, {
                    price: number;
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        getRecipePrice: {
            pathParams: zod.ZodObject<{
                recipeId: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                recipeId: number;
            }, {
                recipeId: number;
            }>;
            query: zod.ZodObject<{
                profitMargin: zod.ZodOptional<zod.ZodNumber>;
            }, "strip", zod.ZodTypeAny, {
                profitMargin?: number | undefined;
            }, {
                profitMargin?: number | undefined;
            }>;
            summary: "Get the selling price for a recipe";
            method: "GET";
            path: "/api/v1/recipes/:recipeId/price";
            responses: {
                200: zod.ZodObject<{
                    price: zod.ZodNumber;
                }, "strip", zod.ZodTypeAny, {
                    price: number;
                }, {
                    price: number;
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
    };
    vendor: {
        createVendor: {
            summary: "Create a new vendor";
            method: "POST";
            body: zod.ZodObject<Omit<{
                id: zod.ZodNumber;
                name: zod.ZodString;
                contact: zod.ZodString;
                email: zod.ZodString;
                phone: zod.ZodString;
                orders: zod.ZodArray<zod.ZodObject<{
                    status: zod.ZodOptional<zod.ZodEnum<["PENDING", "APPROVED", "ORDERED", "RECEIVED", "CANCELLED"]>>;
                    restaurantId: zod.ZodOptional<zod.ZodNumber>;
                    vendorId: zod.ZodOptional<zod.ZodNumber>;
                    vendor: zod.ZodOptional<zod.ZodObject<{
                        id: zod.ZodNumber;
                        name: zod.ZodString;
                    }, "strip", zod.ZodTypeAny, {
                        id: number;
                        name: string;
                    }, {
                        id: number;
                        name: string;
                    }>>;
                    items: zod.ZodOptional<zod.ZodArray<zod.ZodObject<{
                        id: zod.ZodNumber;
                        orderId: zod.ZodNumber;
                        ingredientId: zod.ZodNumber;
                        quantity: zod.ZodNumber;
                        unit: zod.ZodString;
                        price: zod.ZodNumber;
                    }, "strip", zod.ZodTypeAny, {
                        id: number;
                        orderId: number;
                        ingredientId: number;
                        quantity: number;
                        unit: string;
                        price: number;
                    }, {
                        id: number;
                        orderId: number;
                        ingredientId: number;
                        quantity: number;
                        unit: string;
                        price: number;
                    }>, "many">>;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>, "many">;
                createdAt: zod.ZodDate;
                updatedAt: zod.ZodDate;
            }, "id" | "createdAt" | "updatedAt" | "orders">, "strip", zod.ZodTypeAny, {
                name: string;
                contact: string;
                email: string;
                phone: string;
            }, {
                name: string;
                contact: string;
                email: string;
                phone: string;
            }>;
            path: "/api/v1/vendors";
            responses: {
                201: zod.ZodObject<{
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    contact: zod.ZodString;
                    email: zod.ZodString;
                    phone: zod.ZodString;
                    orders: zod.ZodArray<zod.ZodObject<{
                        status: zod.ZodOptional<zod.ZodEnum<["PENDING", "APPROVED", "ORDERED", "RECEIVED", "CANCELLED"]>>;
                        restaurantId: zod.ZodOptional<zod.ZodNumber>;
                        vendorId: zod.ZodOptional<zod.ZodNumber>;
                        vendor: zod.ZodOptional<zod.ZodObject<{
                            id: zod.ZodNumber;
                            name: zod.ZodString;
                        }, "strip", zod.ZodTypeAny, {
                            id: number;
                            name: string;
                        }, {
                            id: number;
                            name: string;
                        }>>;
                        items: zod.ZodOptional<zod.ZodArray<zod.ZodObject<{
                            id: zod.ZodNumber;
                            orderId: zod.ZodNumber;
                            ingredientId: zod.ZodNumber;
                            quantity: zod.ZodNumber;
                            unit: zod.ZodString;
                            price: zod.ZodNumber;
                        }, "strip", zod.ZodTypeAny, {
                            id: number;
                            orderId: number;
                            ingredientId: number;
                            quantity: number;
                            unit: string;
                            price: number;
                        }, {
                            id: number;
                            orderId: number;
                            ingredientId: number;
                            quantity: number;
                            unit: string;
                            price: number;
                        }>, "many">>;
                    }, "strip", zod.ZodTypeAny, {
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
                    }, {
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
                    }>, "many">;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>;
                400: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        getVendors: {
            query: zod.ZodObject<{
                skip: zod.ZodOptional<zod.ZodString>;
                take: zod.ZodOptional<zod.ZodString>;
                name: zod.ZodOptional<zod.ZodString>;
            }, "strip", zod.ZodTypeAny, {
                name?: string | undefined;
                skip?: string | undefined;
                take?: string | undefined;
            }, {
                name?: string | undefined;
                skip?: string | undefined;
                take?: string | undefined;
            }>;
            summary: "Get all vendors";
            method: "GET";
            path: "/api/v1/vendors";
            responses: {
                200: zod.ZodArray<zod.ZodObject<{
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    contact: zod.ZodString;
                    email: zod.ZodString;
                    phone: zod.ZodString;
                    orders: zod.ZodArray<zod.ZodObject<{
                        status: zod.ZodOptional<zod.ZodEnum<["PENDING", "APPROVED", "ORDERED", "RECEIVED", "CANCELLED"]>>;
                        restaurantId: zod.ZodOptional<zod.ZodNumber>;
                        vendorId: zod.ZodOptional<zod.ZodNumber>;
                        vendor: zod.ZodOptional<zod.ZodObject<{
                            id: zod.ZodNumber;
                            name: zod.ZodString;
                        }, "strip", zod.ZodTypeAny, {
                            id: number;
                            name: string;
                        }, {
                            id: number;
                            name: string;
                        }>>;
                        items: zod.ZodOptional<zod.ZodArray<zod.ZodObject<{
                            id: zod.ZodNumber;
                            orderId: zod.ZodNumber;
                            ingredientId: zod.ZodNumber;
                            quantity: zod.ZodNumber;
                            unit: zod.ZodString;
                            price: zod.ZodNumber;
                        }, "strip", zod.ZodTypeAny, {
                            id: number;
                            orderId: number;
                            ingredientId: number;
                            quantity: number;
                            unit: string;
                            price: number;
                        }, {
                            id: number;
                            orderId: number;
                            ingredientId: number;
                            quantity: number;
                            unit: string;
                            price: number;
                        }>, "many">>;
                    }, "strip", zod.ZodTypeAny, {
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
                    }, {
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
                    }>, "many">;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>, "many">;
            };
        };
        getVendor: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Get a vendor by ID";
            method: "GET";
            path: "/api/v1/vendors/:id";
            responses: {
                200: zod.ZodObject<{
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    contact: zod.ZodString;
                    email: zod.ZodString;
                    phone: zod.ZodString;
                    orders: zod.ZodArray<zod.ZodObject<{
                        status: zod.ZodOptional<zod.ZodEnum<["PENDING", "APPROVED", "ORDERED", "RECEIVED", "CANCELLED"]>>;
                        restaurantId: zod.ZodOptional<zod.ZodNumber>;
                        vendorId: zod.ZodOptional<zod.ZodNumber>;
                        vendor: zod.ZodOptional<zod.ZodObject<{
                            id: zod.ZodNumber;
                            name: zod.ZodString;
                        }, "strip", zod.ZodTypeAny, {
                            id: number;
                            name: string;
                        }, {
                            id: number;
                            name: string;
                        }>>;
                        items: zod.ZodOptional<zod.ZodArray<zod.ZodObject<{
                            id: zod.ZodNumber;
                            orderId: zod.ZodNumber;
                            ingredientId: zod.ZodNumber;
                            quantity: zod.ZodNumber;
                            unit: zod.ZodString;
                            price: zod.ZodNumber;
                        }, "strip", zod.ZodTypeAny, {
                            id: number;
                            orderId: number;
                            ingredientId: number;
                            quantity: number;
                            unit: string;
                            price: number;
                        }, {
                            id: number;
                            orderId: number;
                            ingredientId: number;
                            quantity: number;
                            unit: string;
                            price: number;
                        }>, "many">>;
                    }, "strip", zod.ZodTypeAny, {
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
                    }, {
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
                    }>, "many">;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        updateVendor: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Update a vendor";
            method: "PUT";
            body: zod.ZodObject<{
                name: zod.ZodOptional<zod.ZodString>;
                contact: zod.ZodOptional<zod.ZodString>;
                email: zod.ZodOptional<zod.ZodString>;
                phone: zod.ZodOptional<zod.ZodString>;
            }, "strip", zod.ZodTypeAny, {
                name?: string | undefined;
                contact?: string | undefined;
                email?: string | undefined;
                phone?: string | undefined;
            }, {
                name?: string | undefined;
                contact?: string | undefined;
                email?: string | undefined;
                phone?: string | undefined;
            }>;
            path: "/api/v1/vendors/:id";
            responses: {
                200: zod.ZodObject<{
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    contact: zod.ZodString;
                    email: zod.ZodString;
                    phone: zod.ZodString;
                    orders: zod.ZodArray<zod.ZodObject<{
                        status: zod.ZodOptional<zod.ZodEnum<["PENDING", "APPROVED", "ORDERED", "RECEIVED", "CANCELLED"]>>;
                        restaurantId: zod.ZodOptional<zod.ZodNumber>;
                        vendorId: zod.ZodOptional<zod.ZodNumber>;
                        vendor: zod.ZodOptional<zod.ZodObject<{
                            id: zod.ZodNumber;
                            name: zod.ZodString;
                        }, "strip", zod.ZodTypeAny, {
                            id: number;
                            name: string;
                        }, {
                            id: number;
                            name: string;
                        }>>;
                        items: zod.ZodOptional<zod.ZodArray<zod.ZodObject<{
                            id: zod.ZodNumber;
                            orderId: zod.ZodNumber;
                            ingredientId: zod.ZodNumber;
                            quantity: zod.ZodNumber;
                            unit: zod.ZodString;
                            price: zod.ZodNumber;
                        }, "strip", zod.ZodTypeAny, {
                            id: number;
                            orderId: number;
                            ingredientId: number;
                            quantity: number;
                            unit: string;
                            price: number;
                        }, {
                            id: number;
                            orderId: number;
                            ingredientId: number;
                            quantity: number;
                            unit: string;
                            price: number;
                        }>, "many">>;
                    }, "strip", zod.ZodTypeAny, {
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
                    }, {
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
                    }>, "many">;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        deleteVendor: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Delete a vendor";
            method: "DELETE";
            path: "/api/v1/vendors/:id";
            responses: {
                200: zod.ZodObject<{
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    contact: zod.ZodString;
                    email: zod.ZodString;
                    phone: zod.ZodString;
                    orders: zod.ZodArray<zod.ZodObject<{
                        status: zod.ZodOptional<zod.ZodEnum<["PENDING", "APPROVED", "ORDERED", "RECEIVED", "CANCELLED"]>>;
                        restaurantId: zod.ZodOptional<zod.ZodNumber>;
                        vendorId: zod.ZodOptional<zod.ZodNumber>;
                        vendor: zod.ZodOptional<zod.ZodObject<{
                            id: zod.ZodNumber;
                            name: zod.ZodString;
                        }, "strip", zod.ZodTypeAny, {
                            id: number;
                            name: string;
                        }, {
                            id: number;
                            name: string;
                        }>>;
                        items: zod.ZodOptional<zod.ZodArray<zod.ZodObject<{
                            id: zod.ZodNumber;
                            orderId: zod.ZodNumber;
                            ingredientId: zod.ZodNumber;
                            quantity: zod.ZodNumber;
                            unit: zod.ZodString;
                            price: zod.ZodNumber;
                        }, "strip", zod.ZodTypeAny, {
                            id: number;
                            orderId: number;
                            ingredientId: number;
                            quantity: number;
                            unit: string;
                            price: number;
                        }, {
                            id: number;
                            orderId: number;
                            ingredientId: number;
                            quantity: number;
                            unit: string;
                            price: number;
                        }>, "many">>;
                    }, "strip", zod.ZodTypeAny, {
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
                    }, {
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
                    }>, "many">;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
    };
    prepBoard: {
        createPrepBoard: {
            summary: "Create a new prep board";
            method: "POST";
            body: zod.ZodType<_ckm_db.Prisma.PrepBoardCreateInput, zod.ZodTypeDef, _ckm_db.Prisma.PrepBoardCreateInput>;
            path: "/api/v1/prepBoards";
            responses: {
                201: zod.ZodObject<{
                    status: zod.ZodEnum<["COMPLETED", "CANCELLED", "MISSING_ITEM", "PENDING", "ON_PROGRESS", "POSTPONE"]>;
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    status: "COMPLETED" | "CANCELLED" | "PENDING" | "MISSING_ITEM" | "ON_PROGRESS" | "POSTPONE";
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    status: "COMPLETED" | "CANCELLED" | "PENDING" | "MISSING_ITEM" | "ON_PROGRESS" | "POSTPONE";
                }>;
                400: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        getPrepBoards: {
            query: zod.ZodObject<{
                skip: zod.ZodOptional<zod.ZodNumber>;
                take: zod.ZodOptional<zod.ZodNumber>;
                where: zod.ZodOptional<zod.ZodRecord<zod.ZodString, zod.ZodAny>>;
                orderBy: zod.ZodOptional<zod.ZodRecord<zod.ZodString, zod.ZodEnum<["asc", "desc"]>>>;
            }, "strip", zod.ZodTypeAny, {
                skip?: number | undefined;
                take?: number | undefined;
                orderBy?: Record<string, "asc" | "desc"> | undefined;
                where?: Record<string, any> | undefined;
            }, {
                skip?: number | undefined;
                take?: number | undefined;
                orderBy?: Record<string, "asc" | "desc"> | undefined;
                where?: Record<string, any> | undefined;
            }>;
            summary: "Get all prep boards";
            method: "GET";
            path: "/api/v1/prepBoards";
            responses: {
                200: zod.ZodArray<zod.ZodObject<{
                    status: zod.ZodEnum<["COMPLETED", "CANCELLED", "MISSING_ITEM", "PENDING", "ON_PROGRESS", "POSTPONE"]>;
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    status: "COMPLETED" | "CANCELLED" | "PENDING" | "MISSING_ITEM" | "ON_PROGRESS" | "POSTPONE";
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    status: "COMPLETED" | "CANCELLED" | "PENDING" | "MISSING_ITEM" | "ON_PROGRESS" | "POSTPONE";
                }>, "many">;
            };
        };
        getPrepBoard: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Get a prep board by ID";
            method: "GET";
            path: "/api/v1/prepBoards/:id";
            responses: {
                200: zod.ZodObject<{
                    status: zod.ZodEnum<["COMPLETED", "CANCELLED", "MISSING_ITEM", "PENDING", "ON_PROGRESS", "POSTPONE"]>;
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    status: "COMPLETED" | "CANCELLED" | "PENDING" | "MISSING_ITEM" | "ON_PROGRESS" | "POSTPONE";
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    status: "COMPLETED" | "CANCELLED" | "PENDING" | "MISSING_ITEM" | "ON_PROGRESS" | "POSTPONE";
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        updatePrepBoard: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Update a prep board";
            method: "PUT";
            body: zod.ZodType<_ckm_db.Prisma.PrepBoardUpdateInput, zod.ZodTypeDef, _ckm_db.Prisma.PrepBoardUpdateInput>;
            path: "/api/v1/prepBoards/:id";
            responses: {
                200: zod.ZodObject<{
                    status: zod.ZodEnum<["COMPLETED", "CANCELLED", "MISSING_ITEM", "PENDING", "ON_PROGRESS", "POSTPONE"]>;
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    status: "COMPLETED" | "CANCELLED" | "PENDING" | "MISSING_ITEM" | "ON_PROGRESS" | "POSTPONE";
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    status: "COMPLETED" | "CANCELLED" | "PENDING" | "MISSING_ITEM" | "ON_PROGRESS" | "POSTPONE";
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        deletePrepBoard: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Delete a prep board";
            method: "DELETE";
            path: "/api/v1/prepBoards/:id";
            responses: {
                200: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
    };
    auth: {
        resendCode: {
            summary: "Resend the verifyLoginCode";
            method: "POST";
            body: zod.ZodObject<{
                email: zod.ZodString;
            }, "strip", zod.ZodTypeAny, {
                email: string;
            }, {
                email: string;
            }>;
            path: "/api/v1/auth/resend-code";
            responses: {
                200: zod.ZodObject<{
                    code: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    code: string;
                }, {
                    code: string;
                }>;
                401: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        login: {
            summary: "User login";
            method: "POST";
            body: zod.ZodObject<{
                email: zod.ZodString;
                password: zod.ZodString;
            }, "strip", zod.ZodTypeAny, {
                email: string;
                password: string;
            }, {
                email: string;
                password: string;
            }>;
            path: "/api/v1/auth/login";
            responses: {
                200: zod.ZodObject<{
                    code: zod.ZodString;
                    csrfToken: zod.ZodOptional<zod.ZodString>;
                }, "strip", zod.ZodTypeAny, {
                    code: string;
                    csrfToken?: string | undefined;
                }, {
                    code: string;
                    csrfToken?: string | undefined;
                }>;
                401: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        verifyLoginCode: {
            summary: "Verify login code";
            method: "POST";
            body: zod.ZodObject<{
                code: zod.ZodString;
            }, "strip", zod.ZodTypeAny, {
                code: string;
            }, {
                code: string;
            }>;
            path: "/api/v1/auth/verify-login";
            responses: {
                200: zod.ZodObject<{
                    accessToken: zod.ZodString;
                    user: zod.ZodObject<Omit<{
                        role: zod.ZodEnum<["ADMIN", "MANAGER", "CHEF", "STAFF", "VENDOR"]>;
                        id: zod.ZodNumber;
                        email: zod.ZodString;
                        sub: zod.ZodNullable<zod.ZodNumber>;
                        passwordHash: zod.ZodString;
                        firstName: zod.ZodString;
                        lastName: zod.ZodString;
                        profileImage: zod.ZodNullable<zod.ZodString>;
                        verified: zod.ZodBoolean;
                        organizationId: zod.ZodNullable<zod.ZodNumber>;
                        restaurantId: zod.ZodNullable<zod.ZodNumber>;
                        createdAt: zod.ZodDate;
                        updatedAt: zod.ZodDate;
                    }, "passwordHash">, "strip", zod.ZodTypeAny, {
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
                    }, {
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
                    }>;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>;
                401: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        register: {
            summary: "User registration";
            method: "POST";
            body: zod.ZodType<_ckm_db.Prisma.UserUncheckedCreateInput, zod.ZodTypeDef, _ckm_db.Prisma.UserUncheckedCreateInput>;
            path: "/api/v1/auth/register";
            responses: {
                201: zod.ZodObject<Omit<{
                    role: zod.ZodEnum<["ADMIN", "MANAGER", "CHEF", "STAFF", "VENDOR"]>;
                    id: zod.ZodNumber;
                    email: zod.ZodString;
                    sub: zod.ZodNullable<zod.ZodNumber>;
                    passwordHash: zod.ZodString;
                    firstName: zod.ZodString;
                    lastName: zod.ZodString;
                    profileImage: zod.ZodNullable<zod.ZodString>;
                    verified: zod.ZodBoolean;
                    organizationId: zod.ZodNullable<zod.ZodNumber>;
                    restaurantId: zod.ZodNullable<zod.ZodNumber>;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                }, "passwordHash">, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>;
                400: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        changePassword: {
            pathParams: zod.ZodObject<{
                userId: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                userId: number;
            }, {
                userId: number;
            }>;
            summary: "Change user password";
            method: "POST";
            body: zod.ZodObject<{
                oldPassword: zod.ZodString;
                newPassword: zod.ZodString;
            }, "strip", zod.ZodTypeAny, {
                oldPassword: string;
                newPassword: string;
            }, {
                oldPassword: string;
                newPassword: string;
            }>;
            path: "/api/v1/auth/change-password/:userId";
            responses: {
                200: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
                400: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        logout: {
            summary: "User logout";
            method: "POST";
            body: zod.ZodObject<{
                userId: zod.ZodNumber;
                accessToken: zod.ZodString;
            }, "strip", zod.ZodTypeAny, {
                userId: number;
                accessToken: string;
            }, {
                userId: number;
                accessToken: string;
            }>;
            path: "/api/v1/auth/logout";
            responses: {
                200: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
                400: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        forgotPassword: {
            summary: "Request password reset";
            method: "POST";
            body: zod.ZodObject<{
                email: zod.ZodString;
            }, "strip", zod.ZodTypeAny, {
                email: string;
            }, {
                email: string;
            }>;
            path: "/api/v1/auth/forgot-password";
            responses: {
                200: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
                400: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        resetPassword: {
            summary: "Reset password";
            method: "POST";
            body: zod.ZodObject<{
                resetToken: zod.ZodString;
                newPassword: zod.ZodString;
            }, "strip", zod.ZodTypeAny, {
                newPassword: string;
                resetToken: string;
            }, {
                newPassword: string;
                resetToken: string;
            }>;
            path: "/api/v1/auth/reset-password";
            responses: {
                200: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
                400: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
    };
    earlyAccess: {
        storeEmail: {
            summary: "Add potential customer to the database";
            method: "POST";
            body: zod.ZodObject<{
                email: zod.ZodString;
            }, "strip", zod.ZodTypeAny, {
                email: string;
            }, {
                email: string;
            }>;
            path: "/api/v1/early-access";
            responses: {
                200: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
                401: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        deleteEmail: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Delete a potential customer from the database";
            method: "DELETE";
            path: "/api/v1/early-access/:id";
            responses: {
                200: zod.ZodObject<{
                    email: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    email: string;
                }, {
                    email: string;
                }>;
                401: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        getEmails: {
            query: zod.ZodObject<{
                skip: zod.ZodOptional<zod.ZodString>;
                take: zod.ZodOptional<zod.ZodString>;
                orderBy: zod.ZodOptional<zod.ZodString>;
                isEmailSent: zod.ZodOptional<zod.ZodBoolean>;
            }, "strip", zod.ZodTypeAny, {
                skip?: string | undefined;
                take?: string | undefined;
                orderBy?: string | undefined;
                isEmailSent?: boolean | undefined;
            }, {
                skip?: string | undefined;
                take?: string | undefined;
                orderBy?: string | undefined;
                isEmailSent?: boolean | undefined;
            }>;
            summary: "get all potential customers from the database";
            method: "GET";
            path: "/api/v1/early-access";
            responses: {
                201: zod.ZodArray<zod.ZodObject<{
                    id: zod.ZodNumber;
                    email: zod.ZodString;
                    isEmailSent: zod.ZodBoolean;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    isEmailSent: boolean;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    isEmailSent: boolean;
                }>, "many">;
                400: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        getEmail: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Get an order by ID";
            method: "GET";
            path: "/api/v1/early-access/:id";
            responses: {
                200: zod.ZodObject<{
                    id: zod.ZodNumber;
                    email: zod.ZodString;
                    isEmailSent: zod.ZodBoolean;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    isEmailSent: boolean;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    isEmailSent: boolean;
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
    };
    menu: {
        createMenu: {
            summary: "Create a new menu";
            method: "POST";
            body: zod.ZodObject<{
                name: zod.ZodString;
                restaurantId: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                name: string;
                restaurantId: number;
            }, {
                name: string;
                restaurantId: number;
            }>;
            path: "/api/v1/menus";
            responses: {
                201: zod.ZodObject<{
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    restaurantId: zod.ZodNumber;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    restaurantId: number;
                    name: string;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    restaurantId: number;
                    name: string;
                }>;
                400: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        getMenus: {
            query: zod.ZodObject<{
                restaurantId: zod.ZodOptional<zod.ZodNumber>;
                skip: zod.ZodOptional<zod.ZodNumber>;
                take: zod.ZodOptional<zod.ZodNumber>;
            }, "strip", zod.ZodTypeAny, {
                skip?: number | undefined;
                take?: number | undefined;
                restaurantId?: number | undefined;
            }, {
                skip?: number | undefined;
                take?: number | undefined;
                restaurantId?: number | undefined;
            }>;
            summary: "Get all menus";
            method: "GET";
            path: "/api/v1/menus";
            responses: {
                200: zod.ZodArray<zod.ZodObject<{
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    restaurantId: zod.ZodNumber;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    restaurantId: number;
                    name: string;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    restaurantId: number;
                    name: string;
                }>, "many">;
            };
        };
        getMenu: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Get a menu by ID";
            method: "GET";
            path: "/api/v1/menus/:id";
            responses: {
                200: zod.ZodObject<{
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    restaurantId: zod.ZodNumber;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    restaurantId: number;
                    name: string;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    restaurantId: number;
                    name: string;
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        updateMenu: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Update a menu";
            method: "PUT";
            body: zod.ZodObject<{
                name: zod.ZodOptional<zod.ZodString>;
            }, "strip", zod.ZodTypeAny, {
                name?: string | undefined;
            }, {
                name?: string | undefined;
            }>;
            path: "/api/v1/menus/:id";
            responses: {
                200: zod.ZodObject<{
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    restaurantId: zod.ZodNumber;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    restaurantId: number;
                    name: string;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    restaurantId: number;
                    name: string;
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        deleteMenu: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Delete a menu";
            method: "DELETE";
            path: "/api/v1/menus/:id";
            responses: {
                200: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
    };
    menuItem: {
        createMenuItem: {
            summary: "Create a new menu item";
            method: "POST";
            body: zod.ZodType<_ckm_db.Prisma.MenuItemCreateInput, zod.ZodTypeDef, _ckm_db.Prisma.MenuItemCreateInput>;
            path: "/api/v1/menu-items";
            responses: {
                201: zod.ZodObject<{
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    description: zod.ZodNullable<zod.ZodString>;
                    price: zod.ZodNumber;
                    foodCost: zod.ZodNumber;
                    isActive: zod.ZodBoolean;
                    recipeIds: zod.ZodArray<zod.ZodNumber, "many">;
                    recipeServingsAmount: zod.ZodArray<zod.ZodNumber, "many">;
                    recipeServingsCost: zod.ZodArray<zod.ZodNumber, "many">;
                    allergens: zod.ZodArray<zod.ZodString, "many">;
                    menuId: zod.ZodNumber;
                    categoryId: zod.ZodNullable<zod.ZodNumber>;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>;
                400: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        getMenuItems: {
            query: zod.ZodObject<{
                menuId: zod.ZodOptional<zod.ZodNumber>;
                skip: zod.ZodOptional<zod.ZodNumber>;
                take: zod.ZodOptional<zod.ZodNumber>;
            }, "strip", zod.ZodTypeAny, {
                skip?: number | undefined;
                take?: number | undefined;
                menuId?: number | undefined;
            }, {
                skip?: number | undefined;
                take?: number | undefined;
                menuId?: number | undefined;
            }>;
            summary: "Get all menu items";
            method: "GET";
            path: "/api/v1/menu-items";
            responses: {
                200: zod.ZodArray<zod.ZodObject<{
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    description: zod.ZodNullable<zod.ZodString>;
                    price: zod.ZodNumber;
                    foodCost: zod.ZodNumber;
                    isActive: zod.ZodBoolean;
                    recipeIds: zod.ZodArray<zod.ZodNumber, "many">;
                    recipeServingsAmount: zod.ZodArray<zod.ZodNumber, "many">;
                    recipeServingsCost: zod.ZodArray<zod.ZodNumber, "many">;
                    allergens: zod.ZodArray<zod.ZodString, "many">;
                    menuId: zod.ZodNumber;
                    categoryId: zod.ZodNullable<zod.ZodNumber>;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>, "many">;
            };
        };
        getMenuItem: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Get a menu item by ID";
            method: "GET";
            path: "/api/v1/menu-items/:id";
            responses: {
                200: zod.ZodObject<{
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    description: zod.ZodNullable<zod.ZodString>;
                    price: zod.ZodNumber;
                    foodCost: zod.ZodNumber;
                    isActive: zod.ZodBoolean;
                    recipeIds: zod.ZodArray<zod.ZodNumber, "many">;
                    recipeServingsAmount: zod.ZodArray<zod.ZodNumber, "many">;
                    recipeServingsCost: zod.ZodArray<zod.ZodNumber, "many">;
                    allergens: zod.ZodArray<zod.ZodString, "many">;
                    menuId: zod.ZodNumber;
                    categoryId: zod.ZodNullable<zod.ZodNumber>;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        updateMenuItem: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Update a menu item";
            method: "PUT";
            body: zod.ZodType<_ckm_db.Prisma.MenuItemUpdateInput, zod.ZodTypeDef, _ckm_db.Prisma.MenuItemUpdateInput>;
            path: "/api/v1/menu-items/:id";
            responses: {
                200: zod.ZodObject<{
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    description: zod.ZodNullable<zod.ZodString>;
                    price: zod.ZodNumber;
                    foodCost: zod.ZodNumber;
                    isActive: zod.ZodBoolean;
                    recipeIds: zod.ZodArray<zod.ZodNumber, "many">;
                    recipeServingsAmount: zod.ZodArray<zod.ZodNumber, "many">;
                    recipeServingsCost: zod.ZodArray<zod.ZodNumber, "many">;
                    allergens: zod.ZodArray<zod.ZodString, "many">;
                    menuId: zod.ZodNumber;
                    categoryId: zod.ZodNullable<zod.ZodNumber>;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        deleteMenuItem: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Delete a menu item";
            method: "DELETE";
            path: "/api/v1/menu-items/:id";
            responses: {
                200: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        addRecipeToMenuItem: {
            summary: "Add a recipe to a menu item";
            method: "POST";
            body: zod.ZodObject<{
                menuItemId: zod.ZodNumber;
                recipeId: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                recipeId: number;
                menuItemId: number;
            }, {
                recipeId: number;
                menuItemId: number;
            }>;
            path: "/api/v1/menu-items/recipes";
            responses: {
                200: zod.ZodObject<{
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    description: zod.ZodNullable<zod.ZodString>;
                    price: zod.ZodNumber;
                    foodCost: zod.ZodNumber;
                    isActive: zod.ZodBoolean;
                    recipeIds: zod.ZodArray<zod.ZodNumber, "many">;
                    recipeServingsAmount: zod.ZodArray<zod.ZodNumber, "many">;
                    recipeServingsCost: zod.ZodArray<zod.ZodNumber, "many">;
                    allergens: zod.ZodArray<zod.ZodString, "many">;
                    menuId: zod.ZodNumber;
                    categoryId: zod.ZodNullable<zod.ZodNumber>;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        getMenuItemByRecipeId: {
            pathParams: zod.ZodObject<{
                recipeId: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                recipeId: number;
            }, {
                recipeId: number;
            }>;
            summary: "Get a menu item by recipe ID";
            method: "GET";
            path: "/api/v1/menu-items/recipes/:recipeId";
            responses: {
                200: zod.ZodObject<{
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    description: zod.ZodNullable<zod.ZodString>;
                    price: zod.ZodNumber;
                    foodCost: zod.ZodNumber;
                    isActive: zod.ZodBoolean;
                    recipeIds: zod.ZodArray<zod.ZodNumber, "many">;
                    recipeServingsAmount: zod.ZodArray<zod.ZodNumber, "many">;
                    recipeServingsCost: zod.ZodArray<zod.ZodNumber, "many">;
                    allergens: zod.ZodArray<zod.ZodString, "many">;
                    menuId: zod.ZodNumber;
                    categoryId: zod.ZodNullable<zod.ZodNumber>;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        calculateMenuItemPrice: {
            pathParams: zod.ZodObject<{
                menuItemId: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                menuItemId: number;
            }, {
                menuItemId: number;
            }>;
            summary: "Calculate a menu item price";
            method: "GET";
            path: "/api/v1/menu-items/:menuItemId/price";
            responses: {
                200: zod.ZodNumber;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        calculateMenuItemFoodCostPercentage: {
            pathParams: zod.ZodObject<{
                menuItemId: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                menuItemId: number;
            }, {
                menuItemId: number;
            }>;
            summary: "Calculate a menu item food cost percentage";
            method: "GET";
            path: "/api/v1/menu-items/:menuItemId/food-cost-percentage";
            responses: {
                200: zod.ZodNumber;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        calculateItemsFoodCostPercentage: {
            query: zod.ZodObject<{
                menuItemIds: zod.ZodArray<zod.ZodNumber, "many">;
            }, "strip", zod.ZodTypeAny, {
                menuItemIds: number[];
            }, {
                menuItemIds: number[];
            }>;
            summary: "Calculate items food cost percentage";
            method: "GET";
            path: "/api/v1/menu-items/food-cost-percentage";
            responses: {
                200: zod.ZodNumber;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
    };
    analytics: {
        getFoodCostHistory: {
            query: zod.ZodObject<{
                recipeId: zod.ZodString;
                startDate: zod.ZodString;
                endDate: zod.ZodString;
            }, "strip", zod.ZodTypeAny, {
                recipeId: string;
                startDate: string;
                endDate: string;
            }, {
                recipeId: string;
                startDate: string;
                endDate: string;
            }>;
            summary: "Get food cost history for a recipe";
            method: "GET";
            path: "/api/v1/analytics/food-cost-history";
            responses: {
                200: zod.ZodArray<zod.ZodObject<{
                    id: zod.ZodNumber;
                    recipeId: zod.ZodNumber;
                    cost: zod.ZodNumber;
                    date: zod.ZodDate;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    recipeId: number;
                    createdAt: Date;
                    updatedAt: Date;
                    date: Date;
                    cost: number;
                }, {
                    id: number;
                    recipeId: number;
                    createdAt: Date;
                    updatedAt: Date;
                    date: Date;
                    cost: number;
                }>, "many">;
            };
        };
        getPrepHistory: {
            query: zod.ZodObject<{
                recipeId: zod.ZodString;
                startDate: zod.ZodString;
                endDate: zod.ZodString;
            }, "strip", zod.ZodTypeAny, {
                recipeId: string;
                startDate: string;
                endDate: string;
            }, {
                recipeId: string;
                startDate: string;
                endDate: string;
            }>;
            summary: "Get prep history for a recipe";
            method: "GET";
            path: "/api/v1/analytics/prep-history";
            responses: {
                200: zod.ZodArray<zod.ZodObject<{
                    id: zod.ZodNumber;
                    recipeId: zod.ZodNumber;
                    quantity: zod.ZodNumber;
                    date: zod.ZodDate;
                    createdAt: zod.ZodDate;
                    updatedAt: zod.ZodDate;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    recipeId: number;
                    createdAt: Date;
                    updatedAt: Date;
                    date: Date;
                    quantity: number;
                }, {
                    id: number;
                    recipeId: number;
                    createdAt: Date;
                    updatedAt: Date;
                    date: Date;
                    quantity: number;
                }>, "many">;
            };
        };
        getMenuAnalytics: {
            query: zod.ZodObject<{
                menuId: zod.ZodString;
            }, "strip", zod.ZodTypeAny, {
                menuId: string;
            }, {
                menuId: string;
            }>;
            summary: "Get menu analytics";
            method: "GET";
            path: "/api/v1/analytics/menu";
            responses: {
                200: zod.ZodObject<{
                    lowestCostItem: zod.ZodObject<{
                        id: zod.ZodNumber;
                        name: zod.ZodString;
                        description: zod.ZodNullable<zod.ZodString>;
                        price: zod.ZodNumber;
                        foodCost: zod.ZodNumber;
                        isActive: zod.ZodBoolean;
                        recipeIds: zod.ZodArray<zod.ZodNumber, "many">;
                        recipeServingsAmount: zod.ZodArray<zod.ZodNumber, "many">;
                        recipeServingsCost: zod.ZodArray<zod.ZodNumber, "many">;
                        allergens: zod.ZodArray<zod.ZodString, "many">;
                        menuId: zod.ZodNumber;
                        categoryId: zod.ZodNullable<zod.ZodNumber>;
                    }, "strip", zod.ZodTypeAny, {
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
                    }, {
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
                    }>;
                    highestCostItem: zod.ZodObject<{
                        id: zod.ZodNumber;
                        name: zod.ZodString;
                        description: zod.ZodNullable<zod.ZodString>;
                        price: zod.ZodNumber;
                        foodCost: zod.ZodNumber;
                        isActive: zod.ZodBoolean;
                        recipeIds: zod.ZodArray<zod.ZodNumber, "many">;
                        recipeServingsAmount: zod.ZodArray<zod.ZodNumber, "many">;
                        recipeServingsCost: zod.ZodArray<zod.ZodNumber, "many">;
                        allergens: zod.ZodArray<zod.ZodString, "many">;
                        menuId: zod.ZodNumber;
                        categoryId: zod.ZodNullable<zod.ZodNumber>;
                    }, "strip", zod.ZodTypeAny, {
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
                    }, {
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
                    }>;
                    averageFoodCost: zod.ZodNumber;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>;
            };
        };
        getRecipeAnalytics: {
            query: zod.ZodObject<{
                recipeId: zod.ZodString;
                startDate: zod.ZodString;
                endDate: zod.ZodString;
            }, "strip", zod.ZodTypeAny, {
                recipeId: string;
                startDate: string;
                endDate: string;
            }, {
                recipeId: string;
                startDate: string;
                endDate: string;
            }>;
            summary: "Get recipe analytics";
            method: "GET";
            path: "/api/v1/analytics/recipe";
            responses: {
                200: zod.ZodObject<{
                    averagePrepsPerWeek: zod.ZodNumber;
                    totalPrepCount: zod.ZodNumber;
                    averageFoodCost: zod.ZodNumber;
                    foodCostTrend: zod.ZodArray<zod.ZodObject<{
                        date: zod.ZodString;
                        cost: zod.ZodNumber;
                    }, "strip", zod.ZodTypeAny, {
                        date: string;
                        cost: number;
                    }, {
                        date: string;
                        cost: number;
                    }>, "many">;
                }, "strip", zod.ZodTypeAny, {
                    averageFoodCost: number;
                    averagePrepsPerWeek: number;
                    totalPrepCount: number;
                    foodCostTrend: {
                        date: string;
                        cost: number;
                    }[];
                }, {
                    averageFoodCost: number;
                    averagePrepsPerWeek: number;
                    totalPrepCount: number;
                    foodCostTrend: {
                        date: string;
                        cost: number;
                    }[];
                }>;
            };
        };
        getRestaurantAnalytics: {
            query: zod.ZodObject<{
                restaurantId: zod.ZodString;
                startDate: zod.ZodString;
                endDate: zod.ZodString;
            }, "strip", zod.ZodTypeAny, {
                restaurantId: string;
                startDate: string;
                endDate: string;
            }, {
                restaurantId: string;
                startDate: string;
                endDate: string;
            }>;
            summary: "Get restaurant analytics";
            method: "GET";
            path: "/api/v1/analytics/restaurant";
            responses: {
                200: zod.ZodObject<{
                    totalRecipes: zod.ZodNumber;
                    totalMenuItems: zod.ZodNumber;
                    averageFoodCost: zod.ZodNumber;
                    mostPreparedRecipes: zod.ZodArray<zod.ZodObject<{
                        recipe: zod.ZodObject<{
                            skillLevel: zod.ZodEnum<["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"]>;
                            id: zod.ZodNumber;
                            name: zod.ZodString;
                            imageUrls: zod.ZodArray<zod.ZodString, "many">;
                            description: zod.ZodNullable<zod.ZodString>;
                            servings: zod.ZodNumber;
                            cookTime: zod.ZodNumber;
                            prepTime: zod.ZodNumber;
                            frequency: zod.ZodNullable<zod.ZodNumber>;
                            restaurantId: zod.ZodNumber;
                            cookBookId: zod.ZodNumber;
                            foodCost: zod.ZodNullable<zod.ZodNumber>;
                            isDeleted: zod.ZodBoolean;
                            isPublished: zod.ZodBoolean;
                            publishedAt: zod.ZodNullable<zod.ZodDate>;
                            language: zod.ZodString;
                        }, "strip", zod.ZodTypeAny, {
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
                        }, {
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
                        }>;
                        prepCount: zod.ZodNumber;
                    }, "strip", zod.ZodTypeAny, {
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
                    }, {
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
                    }>, "many">;
                    foodCostTrend: zod.ZodArray<zod.ZodObject<{
                        date: zod.ZodString;
                        cost: zod.ZodNumber;
                    }, "strip", zod.ZodTypeAny, {
                        date: string;
                        cost: number;
                    }, {
                        date: string;
                        cost: number;
                    }>, "many">;
                }, "strip", zod.ZodTypeAny, {
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
                }, {
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
                }>;
            };
        };
    };
    cookbook: {
        createCookBook: {
            summary: "Create a new cookbook";
            method: "POST";
            body: zod.ZodObject<{
                name: zod.ZodString;
                imageUrl: zod.ZodOptional<zod.ZodString>;
                category: zod.ZodString;
                restaurantId: zod.ZodOptional<zod.ZodNumber>;
            }, "strip", zod.ZodTypeAny, {
                name: string;
                category: string;
                imageUrl?: string | undefined;
                restaurantId?: number | undefined;
            }, {
                name: string;
                category: string;
                imageUrl?: string | undefined;
                restaurantId?: number | undefined;
            }>;
            path: "/api/v1/cookbooks";
            responses: {
                201: zod.ZodObject<{
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    imageUrl: zod.ZodNullable<zod.ZodString>;
                    category: zod.ZodString;
                    restaurantId: zod.ZodNullable<zod.ZodNumber>;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    restaurantId: number | null;
                    name: string;
                    imageUrl: string | null;
                    category: string;
                }, {
                    id: number;
                    restaurantId: number | null;
                    name: string;
                    imageUrl: string | null;
                    category: string;
                }>;
                400: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        getCookBooks: {
            query: zod.ZodObject<{
                restaurantId: zod.ZodOptional<zod.ZodNumber>;
                skip: zod.ZodOptional<zod.ZodNumber>;
                take: zod.ZodOptional<zod.ZodNumber>;
            }, "strip", zod.ZodTypeAny, {
                skip?: number | undefined;
                take?: number | undefined;
                restaurantId?: number | undefined;
            }, {
                skip?: number | undefined;
                take?: number | undefined;
                restaurantId?: number | undefined;
            }>;
            summary: "Get all cookbooks";
            method: "GET";
            path: "/api/v1/cookbooks";
            responses: {
                200: zod.ZodArray<zod.ZodObject<{
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    imageUrl: zod.ZodNullable<zod.ZodString>;
                    category: zod.ZodString;
                    restaurantId: zod.ZodNullable<zod.ZodNumber>;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    restaurantId: number | null;
                    name: string;
                    imageUrl: string | null;
                    category: string;
                }, {
                    id: number;
                    restaurantId: number | null;
                    name: string;
                    imageUrl: string | null;
                    category: string;
                }>, "many">;
            };
        };
        getCookBook: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Get a cookbook by ID";
            method: "GET";
            path: "/api/v1/cookbooks/:id";
            responses: {
                200: zod.ZodObject<{
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    imageUrl: zod.ZodNullable<zod.ZodString>;
                    category: zod.ZodString;
                    restaurantId: zod.ZodNullable<zod.ZodNumber>;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    restaurantId: number | null;
                    name: string;
                    imageUrl: string | null;
                    category: string;
                }, {
                    id: number;
                    restaurantId: number | null;
                    name: string;
                    imageUrl: string | null;
                    category: string;
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        updateCookBook: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Update a cookbook";
            method: "PUT";
            body: zod.ZodObject<{
                name: zod.ZodOptional<zod.ZodString>;
                imageUrl: zod.ZodOptional<zod.ZodString>;
                category: zod.ZodOptional<zod.ZodString>;
                restaurantId: zod.ZodOptional<zod.ZodNumber>;
            }, "strip", zod.ZodTypeAny, {
                name?: string | undefined;
                imageUrl?: string | undefined;
                restaurantId?: number | undefined;
                category?: string | undefined;
            }, {
                name?: string | undefined;
                imageUrl?: string | undefined;
                restaurantId?: number | undefined;
                category?: string | undefined;
            }>;
            path: "/api/v1/cookbooks/:id";
            responses: {
                200: zod.ZodObject<{
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    imageUrl: zod.ZodNullable<zod.ZodString>;
                    category: zod.ZodString;
                    restaurantId: zod.ZodNullable<zod.ZodNumber>;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    restaurantId: number | null;
                    name: string;
                    imageUrl: string | null;
                    category: string;
                }, {
                    id: number;
                    restaurantId: number | null;
                    name: string;
                    imageUrl: string | null;
                    category: string;
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        deleteCookBook: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Delete a cookbook";
            method: "DELETE";
            path: "/api/v1/cookbooks/:id";
            responses: {
                200: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
    };
    ingredient: {
        createIngredient: {
            summary: "Create a new ingredient";
            method: "POST";
            body: zod.ZodObject<{
                name: zod.ZodString;
                category: zod.ZodString;
                price: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                name: string;
                price: number;
                category: string;
            }, {
                name: string;
                price: number;
                category: string;
            }>;
            path: "/api/v1/ingredients";
            responses: {
                201: zod.ZodObject<{
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    category: zod.ZodString;
                    price: zod.ZodNumber;
                    dietaryRestrictionId: zod.ZodNullable<zod.ZodNumber>;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    price: number;
                    name: string;
                    category: string;
                    dietaryRestrictionId: number | null;
                }, {
                    id: number;
                    price: number;
                    name: string;
                    category: string;
                    dietaryRestrictionId: number | null;
                }>;
                400: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        getIngredients: {
            query: zod.ZodObject<{
                skip: zod.ZodOptional<zod.ZodNumber>;
                take: zod.ZodOptional<zod.ZodNumber>;
                where: zod.ZodOptional<zod.ZodRecord<zod.ZodString, zod.ZodAny>>;
                orderBy: zod.ZodOptional<zod.ZodRecord<zod.ZodString, zod.ZodEnum<["asc", "desc"]>>>;
            }, "strip", zod.ZodTypeAny, {
                skip?: number | undefined;
                take?: number | undefined;
                orderBy?: Record<string, "asc" | "desc"> | undefined;
                where?: Record<string, any> | undefined;
            }, {
                skip?: number | undefined;
                take?: number | undefined;
                orderBy?: Record<string, "asc" | "desc"> | undefined;
                where?: Record<string, any> | undefined;
            }>;
            summary: "Get all ingredients";
            method: "GET";
            path: "/api/v1/ingredients";
            responses: {
                200: zod.ZodArray<zod.ZodObject<{
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    category: zod.ZodString;
                    price: zod.ZodNumber;
                    dietaryRestrictionId: zod.ZodNullable<zod.ZodNumber>;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    price: number;
                    name: string;
                    category: string;
                    dietaryRestrictionId: number | null;
                }, {
                    id: number;
                    price: number;
                    name: string;
                    category: string;
                    dietaryRestrictionId: number | null;
                }>, "many">;
            };
        };
        getIngredient: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Get an ingredient by ID";
            method: "GET";
            path: "/api/v1/ingredients/:id";
            responses: {
                200: zod.ZodObject<{
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    category: zod.ZodString;
                    price: zod.ZodNumber;
                    dietaryRestrictionId: zod.ZodNullable<zod.ZodNumber>;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    price: number;
                    name: string;
                    category: string;
                    dietaryRestrictionId: number | null;
                }, {
                    id: number;
                    price: number;
                    name: string;
                    category: string;
                    dietaryRestrictionId: number | null;
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        updateIngredient: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Update an ingredient";
            method: "PUT";
            body: zod.ZodObject<{
                name: zod.ZodOptional<zod.ZodString>;
                category: zod.ZodOptional<zod.ZodString>;
                price: zod.ZodOptional<zod.ZodNumber>;
            }, "strip", zod.ZodTypeAny, {
                name?: string | undefined;
                price?: number | undefined;
                category?: string | undefined;
            }, {
                name?: string | undefined;
                price?: number | undefined;
                category?: string | undefined;
            }>;
            path: "/api/v1/ingredients/:id";
            responses: {
                200: zod.ZodObject<{
                    id: zod.ZodNumber;
                    name: zod.ZodString;
                    category: zod.ZodString;
                    price: zod.ZodNumber;
                    dietaryRestrictionId: zod.ZodNullable<zod.ZodNumber>;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    price: number;
                    name: string;
                    category: string;
                    dietaryRestrictionId: number | null;
                }, {
                    id: number;
                    price: number;
                    name: string;
                    category: string;
                    dietaryRestrictionId: number | null;
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        deleteIngredient: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Delete an ingredient";
            method: "DELETE";
            path: "/api/v1/ingredients/:id";
            responses: {
                200: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
    };
    prepItem: {
        createPrepItem: {
            summary: "Create a new prep item";
            method: "POST";
            body: zod.ZodType<_ckm_db.Prisma.PrepItemCreateInput, zod.ZodTypeDef, _ckm_db.Prisma.PrepItemCreateInput>;
            path: "/api/v1/prepItems";
            responses: {
                201: zod.ZodObject<{
                    status: zod.ZodEnum<["COMPLETED", "CANCELLED", "MISSING_ITEM", "PENDING", "ON_PROGRESS", "POSTPONE"]>;
                    id: zod.ZodNumber;
                    prepBoardId: zod.ZodNumber;
                    recipeId: zod.ZodNumber;
                    quantity: zod.ZodNumber;
                    assignedToId: zod.ZodNumber;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    recipeId: number;
                    status: "COMPLETED" | "CANCELLED" | "PENDING" | "MISSING_ITEM" | "ON_PROGRESS" | "POSTPONE";
                    quantity: number;
                    assignedToId: number;
                    prepBoardId: number;
                }, {
                    id: number;
                    recipeId: number;
                    status: "COMPLETED" | "CANCELLED" | "PENDING" | "MISSING_ITEM" | "ON_PROGRESS" | "POSTPONE";
                    quantity: number;
                    assignedToId: number;
                    prepBoardId: number;
                }>;
                400: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        getPrepItems: {
            query: zod.ZodObject<{
                skip: zod.ZodOptional<zod.ZodNumber>;
                take: zod.ZodOptional<zod.ZodNumber>;
                where: zod.ZodOptional<zod.ZodRecord<zod.ZodString, zod.ZodAny>>;
                orderBy: zod.ZodOptional<zod.ZodRecord<zod.ZodString, zod.ZodEnum<["asc", "desc"]>>>;
            }, "strip", zod.ZodTypeAny, {
                skip?: number | undefined;
                take?: number | undefined;
                orderBy?: Record<string, "asc" | "desc"> | undefined;
                where?: Record<string, any> | undefined;
            }, {
                skip?: number | undefined;
                take?: number | undefined;
                orderBy?: Record<string, "asc" | "desc"> | undefined;
                where?: Record<string, any> | undefined;
            }>;
            summary: "Get all prep items";
            method: "GET";
            path: "/api/v1/prepItems";
            responses: {
                200: zod.ZodArray<zod.ZodObject<{
                    status: zod.ZodEnum<["COMPLETED", "CANCELLED", "MISSING_ITEM", "PENDING", "ON_PROGRESS", "POSTPONE"]>;
                    id: zod.ZodNumber;
                    prepBoardId: zod.ZodNumber;
                    recipeId: zod.ZodNumber;
                    quantity: zod.ZodNumber;
                    assignedToId: zod.ZodNumber;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    recipeId: number;
                    status: "COMPLETED" | "CANCELLED" | "PENDING" | "MISSING_ITEM" | "ON_PROGRESS" | "POSTPONE";
                    quantity: number;
                    assignedToId: number;
                    prepBoardId: number;
                }, {
                    id: number;
                    recipeId: number;
                    status: "COMPLETED" | "CANCELLED" | "PENDING" | "MISSING_ITEM" | "ON_PROGRESS" | "POSTPONE";
                    quantity: number;
                    assignedToId: number;
                    prepBoardId: number;
                }>, "many">;
            };
        };
        getPrepItem: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Get a prep item by ID";
            method: "GET";
            path: "/api/v1/prepItems/:id";
            responses: {
                200: zod.ZodObject<{
                    status: zod.ZodEnum<["COMPLETED", "CANCELLED", "MISSING_ITEM", "PENDING", "ON_PROGRESS", "POSTPONE"]>;
                    id: zod.ZodNumber;
                    prepBoardId: zod.ZodNumber;
                    recipeId: zod.ZodNumber;
                    quantity: zod.ZodNumber;
                    assignedToId: zod.ZodNumber;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    recipeId: number;
                    status: "COMPLETED" | "CANCELLED" | "PENDING" | "MISSING_ITEM" | "ON_PROGRESS" | "POSTPONE";
                    quantity: number;
                    assignedToId: number;
                    prepBoardId: number;
                }, {
                    id: number;
                    recipeId: number;
                    status: "COMPLETED" | "CANCELLED" | "PENDING" | "MISSING_ITEM" | "ON_PROGRESS" | "POSTPONE";
                    quantity: number;
                    assignedToId: number;
                    prepBoardId: number;
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        updatePrepItem: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Update a prep item";
            method: "PUT";
            body: zod.ZodType<_ckm_db.Prisma.PrepItemUpdateInput, zod.ZodTypeDef, _ckm_db.Prisma.PrepItemUpdateInput>;
            path: "/api/v1/prepItems/:id";
            responses: {
                200: zod.ZodObject<{
                    status: zod.ZodEnum<["COMPLETED", "CANCELLED", "MISSING_ITEM", "PENDING", "ON_PROGRESS", "POSTPONE"]>;
                    id: zod.ZodNumber;
                    prepBoardId: zod.ZodNumber;
                    recipeId: zod.ZodNumber;
                    quantity: zod.ZodNumber;
                    assignedToId: zod.ZodNumber;
                }, "strip", zod.ZodTypeAny, {
                    id: number;
                    recipeId: number;
                    status: "COMPLETED" | "CANCELLED" | "PENDING" | "MISSING_ITEM" | "ON_PROGRESS" | "POSTPONE";
                    quantity: number;
                    assignedToId: number;
                    prepBoardId: number;
                }, {
                    id: number;
                    recipeId: number;
                    status: "COMPLETED" | "CANCELLED" | "PENDING" | "MISSING_ITEM" | "ON_PROGRESS" | "POSTPONE";
                    quantity: number;
                    assignedToId: number;
                    prepBoardId: number;
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        deletePrepItem: {
            pathParams: zod.ZodObject<{
                id: zod.ZodNumber;
            }, "strip", zod.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            summary: "Delete a prep item";
            method: "DELETE";
            path: "/api/v1/prepItems/:id";
            responses: {
                200: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
                404: zod.ZodObject<{
                    message: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
    };
};

export { contract };
