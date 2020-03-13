import Detail from './Detail';
import Editor from './Editor';
import {ItemDetail} from 'entity/member';
import {Modal} from 'antd';
import React from 'react';
import Search from './Search';
import Table from './Table';
import {connect} from 'react-redux';

interface StoreProps {
  currentOperation?: 'detail' | 'edit' | 'create';
  currentItem?: ItemDetail;
}

class Component extends React.PureComponent<StoreProps & DispatchProp> {
  onHideCurrent = () => {
    this.props.dispatch(actions.adminMember.execCurrentItem());
  };
  public render() {
    const {currentOperation, currentItem} = this.props;

    return (
      <div className="g-adminPage">
        <h1>用户列表</h1>
        <Search />
        <Table />
        {currentOperation === 'detail' && currentItem && (
          <Modal wrapClassName="g-noBorderHeader" visible={true} onCancel={this.onHideCurrent} footer={null} title="用户详情" width={900}>
            <Detail />
          </Modal>
        )}
        {(currentOperation === 'edit' || currentOperation === 'create') && currentItem && (
          <Modal visible={true} onCancel={this.onHideCurrent} footer={null} title={currentOperation === 'edit' ? '修改用户信息' : '新建用户信息'} width={600}>
            <Editor />
          </Modal>
        )}
      </div>
    );
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  const thisModule = state.adminMember!;
  return {
    currentItem: thisModule.currentItem,
    currentOperation: thisModule.routeParams!.currentOperation,
  };
};

export default connect(mapStateToProps)(Component);