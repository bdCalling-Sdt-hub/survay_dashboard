import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';

const { Dragger } = Upload;

const FileUpload = ({ action, onUpload }) => {
  const props = {
    name: 'file',
    multiple: true,
    action,
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        toast.success(`${info.file.name} file uploaded successfully.`);
        if (onUpload) onUpload(info.file);
      } else if (status === 'error') {
        toast.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
    </Dragger>
  );
};

export default FileUpload;
