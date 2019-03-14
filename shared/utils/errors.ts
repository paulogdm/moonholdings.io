import * as R from 'ramda'

import { IAsset } from '../../shared/types'

export const isError = (e: any) => (e instanceof Error);

export const noArrayResponseErrors = (responses: IAsset[]) => {
  const failed = (res: any) => isError(res) || R.isNil(res) || R.isEmpty(res);
  return R.not(R.any(failed)(responses));
};
