import { Modal } from 'antd';

export const ErrorModal = ({title,content,setShowModal}) => {
    Modal.error({
      title: title,
      content: content,
      onOk() {
        setShowModal(false)
    },
    onCancel() {
        setShowModal(false)
    }
    });
  };