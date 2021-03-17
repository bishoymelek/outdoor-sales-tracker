import { AppApi } from 'agent-client-sdk';
import { dataActions } from 'react-state';
import { httpSuccess } from '..';

const appApi = new AppApi({
  basePath: process.env.REACT_APP_BASE_API
});

const handlers = {
  async [dataActions.getOne](action: any) {
    try {
      const { id } = action.payload;
      const res: any = await appApi.appGetOne(id, []);
      const { payload } = res;
      return httpSuccess({ data: payload });
    } catch (err) {
      console.error(err);
      return err;
    }
  },
  async [dataActions.getMultiple]() {
    try {
      const res: any = await appApi.getAppLayoutList();
      const { payload } = res;
      return httpSuccess({ payload });
    } catch (err) {
      console.error(err);
      return err;
    }
  },
  async [dataActions.update](action: any) {
    try {
      const res: any = await appApi.updateAppLayout(
        '5e26f603eeb3f839fdae46a9',
        action.payload
      );
      const { payload } = res;
      return httpSuccess({ payload });
    } catch (err) {
      console.error(err);
      return err;
    }
  }
};

export { handlers };
export default handlers;
