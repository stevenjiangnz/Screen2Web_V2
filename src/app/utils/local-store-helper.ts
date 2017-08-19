import { StorageKey } from '../global/enums';

export class LocalStoreHelper {
    public static set(key: StorageKey, val: any) {
        let valString = '';

        if (typeof val === 'object') {
            valString = JSON.stringify(val);
        } else {
            valString = val.toString();
        }

        localStorage.setItem(key.toString(), valString);
    }

    public static get(key: StorageKey): string {
        return localStorage.getItem(key.toString());
    }

    public static clear() {
        localStorage.clear();
    }

    public static remove(key: StorageKey) {
        localStorage.removeItem(key.toString());
    }

    public static count(): number {
        return localStorage.length;
    }
}
