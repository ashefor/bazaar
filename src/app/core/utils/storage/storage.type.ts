import { User } from "@core/interfaces/user.interface";

type StorageObjectMap = {
    appSession: {
        user?: User;
        token?: string;
        basePath?: 'lender' | 'employer'
    };
};

export type StorageObjectType = 'appSession';

export type StorageObjectData<T extends StorageObjectType> = {
    type: T;
    data: StorageObjectMap[T];
};
