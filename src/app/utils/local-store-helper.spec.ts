import {LocalStoreHelper} from './local-store-helper';
import { StorageKey } from '../global/enums';

fdescribe('LocalStoreHelper', () => {
  it('should create an instance', () => {
    expect(new LocalStoreHelper()).toBeTruthy();
  });

  it('should do the CRUD set', () => {
    LocalStoreHelper.clear();
    expect(LocalStoreHelper.count()).toEqual(0);

    const stringVal = 'this is test';
    LocalStoreHelper.set(StorageKey.SECURITY_TOKEN, stringVal);

    let returnVal = LocalStoreHelper.get(StorageKey.SECURITY_TOKEN);
    expect(stringVal).toEqual(returnVal);

    LocalStoreHelper.remove(StorageKey.SECURITY_TOKEN);
    returnVal = LocalStoreHelper.get(StorageKey.SECURITY_TOKEN);

    expect(returnVal).toBeNull();

  });
});
