import resourcesList from 'store-config/resourcesList.json';
import { userGroupListMapper } from './dataMappers';
import { getMultiple } from 'react-state';
import { categorySchema } from './schemas/category-schema';
import history from '../utils/history';
import { branchSchema } from './schemas/branch-schema';
import { userGroupSchema } from './schemas/user-group-schema';
import { userSchema } from './schemas/user-schema';

export const visualCapsConfig = {
  userGroupDropDown: {
    // onClickNewBtnTitle: 'userGroup.create.title',
    storeName: resourcesList.UserGroup,
    // pushOnClickCreateNewBtn: 'user-group/create',
    // schema: userGroupSchema.list,
    title: 'userGroup.list.title',
    // deleteConfirmMsg: 'delete.confirm.userGroup.desc',
    dataRef: [
      {
        storeName: resourcesList.UserGroup
      }
    ],
    dataMapper: (state: any): any => ({
      list: userGroupListMapper(
        state[`${resourcesList.UserGroup}_0`] &&
          state[`${resourcesList.UserGroup}_0`].data
      )
    })
  }
};

export const mapGetMultipleResponse = (resp: any): any => {
  try {
    const { data = {} } = resp;
    return {
      listingErrMsg: resp.error,
      listingSuccessMsg: resp.success,
      totalPageCount: data && data.paging && data.paging.totalCount,
      data: data && data.list,
      isLoading: resp.status === 'loading'
    };
  } catch (error) {
    console.error('map-get-multiple-data-res', error);
  }
};

export const mapApiResponse = (resp: any): any => {
  try {
    if (typeof resp === 'object') {
      return {
        listingErrMsg: resp.error,
        listingSuccessMsg: resp.success,
        isLoading: resp.status === 'loading'
      };
    }
  } catch (error) {
    console.log(error);
  }
};

export const branchListConfig = {
  tableWidget: {
    striped: true,
    createNewBtn: {
      label: 'create.new.title',
      onClickHandler: (): any => history.push('/branch/create')
    },
    storeName: resourcesList.UserGroup,
    schema: branchSchema.list,
    title: 'branch.list.title',
    dataRef: [
      {
        storeName: resourcesList.Branch,
        default: []
      }
    ],
    dataMapper: (state: any): any => ({
      data:
        (state[`${resourcesList.Branch}_0`].data &&
          state[`${resourcesList.Branch}_0`].data.list) ||
        [],
      ...mapApiResponse(state[`${resourcesList.Branch}_0`])
    })
  }
};

export const userGroupListConfig = {
  tableWidget: {
    striped: true,
    createNewBtn: {
      label: 'create.new.title',
      onClickHandler: (): any => history.push('/user-group/create')
    },
    storeName: resourcesList.UserGroup,
    schema: userGroupSchema.list,
    title: 'userGroup.list.title',
    dataRef: [
      {
        storeName: resourcesList.UserGroup,
        default: []
      }
    ],
    dataMapper: (state: any): any => ({
      data:
        (state[`${resourcesList.UserGroup}_0`].data &&
          state[`${resourcesList.UserGroup}_0`].data.list) ||
        [],
      ...mapApiResponse(state[`${resourcesList.UserGroup}_0`])
    })
  }
};

export const userListConfig = {
  tableWidget: {
    striped: true,
    createNewBtn: {
      label: 'create.new.title',
      onClickHandler: (): any => history.push('/user/create')
    },
    storeName: resourcesList.User,
    schema: userSchema.list,
    title: 'user.list.title',
    resources: [
      {
        storeName: resourcesList.Branch,
        initAction: { handler: getMultiple }
      },
      {
        storeName: resourcesList.UserGroup,
        initAction: { handler: getMultiple }
      }
    ],
    dataRef: [
      {
        storeName: resourcesList.User,
        default: []
      }
    ],
    dataMapper: (state: any): any => ({
      ...mapGetMultipleResponse(state[`${resourcesList.User}_0`])
    })
  }
};

export const categoryListConfig = {
  tableWidget: {
    striped: true,
    customFieldProps: {
      update: {
        label: 'update.btn.title',
        onClickHandler: (cell: any): void => {
          history.push('/category/update', {
            item: cell,
            isUpdating: true
          });
        },
        variant: 'warning'
      }
    },
    createNewBtn: {
      label: 'create.new.title',
      onClickHandler: (): void => history.push('/category/create')
    },
    storeName: resourcesList.Category,
    schema: categorySchema.list,
    title: 'Category.list.title',
    dataRef: [
      {
        storeName: resourcesList.Category,
        default: []
      }
    ],
    dataMapper: (state: any): any => {
      return {
        ...mapGetMultipleResponse(state[`${resourcesList.Category}_0`])
      };
    }
  }
};
